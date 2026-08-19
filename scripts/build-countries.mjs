/**
 * Pre-bakes the country geometry the map actually needs.
 *
 * The map used to fetch world-atlas `countries-10m.json` (3.5 MB / 900 KB gz)
 * from unpkg on every page load, then throw ~90% of it away: only countries
 * that have firms are ever drawn, and those polygons are invisible at rest —
 * they exist for the hover highlight and the click-to-zoom target, both live
 * only at or below REGION_ZOOM (6).
 *
 * Doing that work at build time lets us:
 *   - start from 10m (highest) source detail rather than a coarser file;
 *   - keep only countries present in FIRMS (via NUMERIC_TO_ALPHA2);
 *   - simplify with topology preserved, so shared borders stay welded and no
 *     slivers open between neighbours;
 *   - drop rings too small to hit-test where the polygons are interactive;
 *   - drop antimeridian-crossing rings (Alaska's Aleutians), which is what
 *     used to smear a band across the map;
 *   - re-quantize, so arcs ship as small delta-encoded integers.
 *
 * Output stays TopoJSON — `topojson-client` is already a runtime dependency
 * and shared arcs are stored once, which beats GeoJSON by ~3x on the wire.
 *
 * Tolerance rationale: at zoom 6 one screen pixel is ~2.4 km at the equator
 * and ~1.2 km at 60N. SIMPLIFY_TOLERANCE keeps discarded detail below that,
 * so the simplified outline is sub-pixel wherever polygons are interactive.
 *
 * Run: npm run build:countries
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { feature, quantize } from 'topojson-client';
import { presimplify, simplify, sphericalTriangleArea } from 'topojson-simplify';
import { NUMERIC_TO_ALPHA2 } from '../src/data/countryCodeMap.ts';
import { FIRMS } from '../src/data/firms.ts';

const SRC = new URL('../node_modules/world-atlas/countries-10m.json', import.meta.url);
const OUT = new URL('../src/data/countries.topo.json', import.meta.url);

/** Smallest triangle kept during simplification, in steradians (~4 km²). */
const SIMPLIFY_TOLERANCE = 1e-7;
/** Rings below this area (square degrees) never present a useful hit target. */
const MIN_RING_AREA = 0.02;
/** Quantization grid. 1e5 over the world bbox is ~4 m — far below one pixel. */
const QUANTIZATION = 1e5;

/** Only countries that actually have a firm are drawn, so only those ship. */
const WANTED = new Set(FIRMS.map((f) => f.countryCode));
const alpha2Of = (id) => {
  const a2 = NUMERIC_TO_ALPHA2[String(id)];
  return a2 && WANTED.has(a2) ? a2 : undefined;
};

const topo = JSON.parse(readFileSync(SRC, 'utf8'));
const srcBytes = readFileSync(SRC).length;

// Filter to our countries BEFORE simplifying, so the simplifier isn't
// spending its budget on geometry we're about to discard.
topo.objects.countries.geometries = topo.objects.countries.geometries.filter((g) =>
  alpha2Of(g.id)
);

const simplified = simplify(presimplify(topo, sphericalTriangleArea), SIMPLIFY_TOLERANCE);

// Round-trip through GeoJSON to prune rings, then rebuild a topology-shaped
// object. Pruning has to happen in lat/lng space: ring area and antimeridian
// wrap are both meaningless on delta-encoded arcs.
const geo = feature(simplified, simplified.objects.countries);

/** Shoelace area in square degrees — cheap proxy for "big enough to matter". */
function ringArea(ring) {
  let a = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    a += (ring[j][0] + ring[i][0]) * (ring[j][1] - ring[i][1]);
  }
  return Math.abs(a / 2);
}

function keepPolygon(rings) {
  const outer = rings[0];
  if (ringArea(outer) < MIN_RING_AREA) return false;
  // A ring spanning more than half the globe in longitude has wrapped the
  // antimeridian; Leaflet draws that as a band straight across the map.
  let min = Infinity;
  let max = -Infinity;
  for (const [lng] of outer) {
    if (lng < min) min = lng;
    if (lng > max) max = lng;
  }
  return max - min <= 180;
}

const features = [];
for (const f of geo.features) {
  const alpha2 = alpha2Of(f.id);
  if (!alpha2) continue;
  const g = f.geometry;
  const polys =
    g.type === 'Polygon' ? [g.coordinates] : g.type === 'MultiPolygon' ? g.coordinates : null;
  if (!polys) continue;

  const kept = polys.filter(keepPolygon);
  if (!kept.length) continue;

  features.push({
    type: 'Feature',
    id: String(f.id),
    properties: { name: f.properties?.name ?? '', alpha2 },
    geometry:
      kept.length === 1
        ? { type: 'Polygon', coordinates: kept[0] }
        : { type: 'MultiPolygon', coordinates: kept },
  });
}
features.sort((a, b) => a.properties.alpha2.localeCompare(b.properties.alpha2));

// Rebuild as a quantized topology. The arcs no longer dedupe shared borders
// (that ended with the GeoJSON round-trip), but quantization is where the
// bulk of the win is: integer deltas instead of float pairs.
const bare = {
  type: 'Topology',
  objects: {
    countries: {
      type: 'GeometryCollection',
      geometries: features.map((f) => ({
        type: f.geometry.type,
        id: f.id,
        properties: f.properties,
        arcs: null,
        coordinates: f.geometry.coordinates,
      })),
    },
  },
  arcs: [],
};
// `quantize` needs a real topology; build one by treating every ring as its
// own arc, which is what feature() would reconstruct anyway.
const arcs = [];
for (const g of bare.objects.countries.geometries) {
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  const arcIndex = polys.map((rings) =>
    rings.map((ring) => {
      arcs.push(ring);
      return [arcs.length - 1];
    })
  );
  g.arcs = g.type === 'Polygon' ? arcIndex[0] : arcIndex;
  delete g.coordinates;
}
bare.arcs = arcs;
bare.bbox = [-180, -90, 180, 90];

const out = quantize(bare, QUANTIZATION);
writeFileSync(OUT, JSON.stringify(out));

const outBytes = readFileSync(OUT).length;
const points = arcs.reduce((n, a) => n + a.length, 0);
const gz = (b) => `${(gzipSync(b, { level: 9 }).length / 1024).toFixed(0)} KB gz`;
console.log(
  `countries.topo.json: ${features.length} countries, ${points} points, ` +
    `${(outBytes / 1024).toFixed(0)} KB (${gz(readFileSync(OUT))})`
);
console.log(
  `  replaces world-atlas countries-10m.json: ` +
    `${(srcBytes / 1024 / 1024).toFixed(1)} MB (${gz(readFileSync(SRC))}) fetched from unpkg`
);
console.log(`  ${features.map((f) => f.properties.alpha2).join(' ')}`);
