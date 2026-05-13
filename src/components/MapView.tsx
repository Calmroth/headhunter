import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  GeoJSON,
  Pane,
  Popup,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import { feature } from 'topojson-client';
import type { Topology, GeometryObject } from 'topojson-specification';
import type { Feature, FeatureCollection } from 'geojson';
import { FIRMS, type Firm } from '../data/firms';

/** Countries we have firms in. Polygon clicks outside this set are inert. */
const COUNTRIES_WITH_FIRMS = new Set(FIRMS.map((f) => f.countryCode));
import { JOBS } from '../data/jobs';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { NUMERIC_TO_ALPHA2 } from '../data/countryCodeMap';
import { monogram } from '../utils/monogram';
import { FirmPopup } from './FirmPopup';
import { animatePopupIn, pulseClick, pulseHover } from '../utils/animations';
import './MapView.css';

const COUNTRIES_URL = 'https://unpkg.com/world-atlas@2/countries-10m.json';

// Esri World Light Gray Canvas — free, English-only labels, minimal style.
const TILE_BASE_URL =
  'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
const TILE_LABELS_URL =
  'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}';
const TILE_ATTR =
  'Tiles &copy; <a href="https://www.esri.com">Esri</a> &mdash; Esri, DeLorme, NAVTEQ';

const OXBLOOD = '#b8482e';
const PAPER = '#f8f4ec';
const FIT_GREEN = '#3a8c54';
const DIM_INK = '#9a948d';
// Warm-paper-adjacent tones used for country highlighting. Hover "lifts" a
// country onto card paper instead of washing it with ink (see DESIGN.md §4).
const CARD_TONE = '#f3eee5'; // oklch(95% 0.008 60), one step above warm-paper
const BORDERLINE = '#c8c0b9'; // oklch(80% 0.01 30), thin country edge

// Four-stage stepwise zoom, calibrated for the Europe-focused world view.
// "World" here means "the whole map at rest" — which is Europe, not the planet.
const WORLD_ZOOM = 4;
const REGION_ZOOM = 6;
const COUNTRY_ZOOM = 9;
const CITY_ZOOM = 12;
const ZOOM_STEPS = [WORLD_ZOOM, REGION_ZOOM, COUNTRY_ZOOM, CITY_ZOOM] as const;

// Europe bounding box, used as the initial view and the soft pan boundary.
// SW = south of Spain / Crete; NE = top of Norway / east of Moscow.
const EUROPE_BOUNDS: L.LatLngBoundsLiteral = [
  [34, -25],
  [72, 45],
];
const EUROPE_MAX_BOUNDS: L.LatLngBoundsLiteral = [
  [20, -45],
  [80, 65],
];

export type MapTarget =
  | { kind: 'world'; key: number }
  | { kind: 'world-at'; lat: number; lng: number; key: number }
  | {
      kind: 'country';
      clickLat: number;
      clickLng: number;
      bboxSW: [number, number];
      bboxNE: [number, number];
      key: number;
    }
  | { kind: 'region'; lat: number; lng: number; key: number }
  | {
      kind: 'firm';
      lat: number;
      lng: number;
      firmId: string;
      /** When true, zoom past country level to kommun so clustered dots separate. */
      isCluster?: boolean;
      key: number;
    }
  /** Soft pan to a firm's coords without changing zoom. Used for rail-hover
      preview so the user can find the dot without disrupting the current view. */
  | { kind: 'preview'; lat: number; lng: number; key: number };

type Props = {
  focusedFirmId: string | null;
  focusedCountryCode: string | null; // alpha-2
  matchingCountryIds?: Set<string>; // alpha-2
  matchingFirmIds?: ReadonlySet<string>;
  hasProfile?: boolean;
  target: MapTarget | null;
  hoveredFirmId: string | null;
  onFirmHover: (id: string | null) => void;
  onFirmClick: (id: string) => void;
  onCountryClick: (
    alpha2: string,
    name: string,
    lat: number,
    lng: number,
    bboxSW: [number, number],
    bboxNE: [number, number]
  ) => void;
  /** Called when user reaches the outermost step (globe) via double-click out. */
  onReturnToGlobe?: () => void;
};

type CountryFeature = Feature & { id: string; properties: { name: string } };

const initialCenter: [number, number] = [54, 10]; // central Europe
const initialZoom = WORLD_ZOOM;

export function MapView({
  focusedFirmId,
  focusedCountryCode,
  matchingCountryIds,
  matchingFirmIds,
  hasProfile,
  target,
  hoveredFirmId,
  onFirmHover,
  onFirmClick,
  onCountryClick,
  onReturnToGlobe,
}: Props) {
  const [countries, setCountries] = useState<CountryFeature[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch(COUNTRIES_URL)
      .then((r) => r.json() as Promise<Topology>)
      .then((topo) => {
        if (cancelled) return;
        const obj = topo.objects.countries as GeometryObject;
        const geo = feature(topo, obj) as FeatureCollection;
        // Render only countries with firms. Skipping the rest fixes the
        // antimeridian-wrap problem at the data layer: Russia, Antarctica,
        // Fiji, etc. simply don't get drawn, so no polygon ring can stretch
        // a band across the map.
        const features = (geo.features as CountryFeature[]).filter((f) => {
          const alpha2 = NUMERIC_TO_ALPHA2[f.id];
          return alpha2 && COUNTRIES_WITH_FIRMS.has(alpha2);
        });
        setCountries(features);
      })
      .catch(() => {
        if (!cancelled) setCountries([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const roleCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const j of JOBS) m.set(j.firmId, (m.get(j.firmId) ?? 0) + 1);
    return m;
  }, []);

  const jobsByFirm = useMemo(() => {
    const m = new Map<
      string,
      Array<{ id: string; title: string; discipline: string; seniority: string }>
    >();
    const sorted = [...JOBS].sort(
      (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
    );
    for (const j of sorted) {
      let bucket = m.get(j.firmId);
      if (!bucket) {
        bucket = [];
        m.set(j.firmId, bucket);
      }
      bucket.push({ id: j.id, title: j.title, discipline: j.discipline, seniority: j.seniority });
    }
    return m;
  }, []);

  const visibleFirms = useMemo<Firm[]>(() => {
    if (!focusedCountryCode) return FIRMS;
    return FIRMS.filter((f) => f.countryCode === focusedCountryCode);
  }, [focusedCountryCode]);

  const countryStyle = (f: CountryFeature): L.PathOptions => {
    const alpha2 = NUMERIC_TO_ALPHA2[f.id];
    const isFocused = alpha2 && alpha2 === focusedCountryCode;
    const isMatch = alpha2 && matchingCountryIds?.has(alpha2);
    const someFocused = !!focusedCountryCode;
    const dimOthers = someFocused && !isFocused;

    // No stroke at rest: the tile's own country borders already provide the
    // edge. We only draw a border in active states, and we use BORDERLINE
    // (soft paper tone), never Deep Ink, so the line blends with the map
    // instead of cutting across it.
    let strokeColor = BORDERLINE;
    let strokeWeight = 0;
    let strokeOpacity = 0;
    if (isFocused) {
      strokeColor = BORDERLINE;
      strokeWeight = 1.25;
      strokeOpacity = 0.85;
    } else if (isMatch) {
      strokeColor = OXBLOOD;
      strokeWeight = 0.75;
      strokeOpacity = 0.45;
    }
    // dimOthers gets no stroke and no fill — recedes via absence, not via ink.

    // Fills are intentionally a hint, not a wash. Several countries
    // (Russia, Antarctica, Fiji) carry antimeridian-crossing polygons in
    // world-atlas; any meaningful fill on them paints a band across the
    // entire map. So fills stay <= 0.18, and the stroke carries the
    // affordance.
    let fillColor = CARD_TONE;
    let fillOpacity = 0;
    if (isMatch) {
      fillColor = OXBLOOD;
      fillOpacity = 0.05;
    } else if (isFocused) {
      fillColor = CARD_TONE;
      fillOpacity = 0.18;
    } else if (dimOthers) {
      // Don't tint dim countries; just let their stroke fade in the
      // strokeOpacity branch above.
      fillOpacity = 0;
    }

    return {
      stroke: strokeWeight > 0,
      color: strokeColor,
      weight: strokeWeight,
      opacity: strokeOpacity,
      fillColor,
      fillOpacity,
    };
  };

  return (
    <div className="map-wrap">
      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        minZoom={WORLD_ZOOM}
        maxZoom={CITY_ZOOM}
        maxBounds={EUROPE_MAX_BOUNDS}
        maxBoundsViscosity={0.85}
        worldCopyJump={false}
        zoomControl={false}
        attributionControl={true}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        className="leaflet-root"
      >
        <TileLayer url={TILE_BASE_URL} attribution={TILE_ATTR} maxZoom={16} />
        <TileLayer url={TILE_LABELS_URL} maxZoom={16} pane="tilePane" />

        {countries.length > 0 && (
          <Pane name="countriesPane" style={{ zIndex: 350 }}>
          <GeoJSON
            key={`${focusedCountryCode ?? 'none'}-${(matchingCountryIds && [...matchingCountryIds].sort().join(',')) ?? ''}`}
            pane="countriesPane"
            data={{ type: 'FeatureCollection', features: countries } as FeatureCollection}
            style={(f) => countryStyle(f as CountryFeature)}
            onEachFeature={(f, layer) => {
              const cf = f as CountryFeature;
              const alpha2 = NUMERIC_TO_ALPHA2[cf.id];
              if (!alpha2 || !COUNTRIES_WITH_FIRMS.has(alpha2)) return;
              const name = cf.properties?.name ?? '';
              layer.bindTooltip(
                `<span class="country-tooltip-name serif">${escapeHtml(name)}</span>` +
                  `<span class="country-tooltip-meta mono">${alpha2}</span>`,
                {
                  className: 'country-tooltip',
                  sticky: true,
                  direction: 'top',
                  offset: L.point(0, -8),
                  opacity: 1,
                }
              );
              layer.on({
                mouseover: (e) => {
                  const path = e.target as L.Path;
                  // Past country zoom, country interactions are off — bail
                  // before applying any hover ink. Leaflet's .leaflet-interactive
                  // class re-enables pointer-events on individual paths even
                  // when the pane has pointer-events:none, so we gate in JS.
                  const m = (path as unknown as { _map?: L.Map })._map;
                  if (m && m.getZoom() >= COUNTRY_ZOOM) return;
                  const isFocused = alpha2 === focusedCountryCode;
                  // Touch-feedback flash — at continent / world zoom the
                  // persistent hover-fill turned into a wash as the cursor
                  // dragged across polygons. Now: brief acknowledgment, then
                  // auto-fade so the hover doesn't accumulate.
                  path.setStyle({
                    fillColor: CARD_TONE,
                    fillOpacity: isFocused ? 0.055 : 0.035,
                    stroke: true,
                    color: BORDERLINE,
                    weight: 1.25,
                    opacity: 0.225,
                  });
                  const carrier = layer as L.Layer & { _hhFade?: number };
                  if (carrier._hhFade) window.clearTimeout(carrier._hhFade);
                  carrier._hhFade = window.setTimeout(() => {
                    path.setStyle(countryStyle(cf));
                    carrier._hhFade = undefined;
                  }, 520);
                },
                mouseout: (e) => {
                  const path = e.target as L.Path;
                  const carrier = layer as L.Layer & { _hhFade?: number };
                  if (carrier._hhFade) {
                    window.clearTimeout(carrier._hhFade);
                    carrier._hhFade = undefined;
                  }
                  path.setStyle(countryStyle(cf));
                },
                click: (e) => {
                  const ll = (e as L.LeafletMouseEvent).latlng;
                  const b = (layer as L.Polygon).getBounds();
                  const sw = b.getSouthWest();
                  const ne = b.getNorthEast();
                  onCountryClick(
                    alpha2,
                    name,
                    ll.lat,
                    ll.lng,
                    [sw.lat, sw.lng],
                    [ne.lat, ne.lng]
                  );
                },
              });
            }}
          />
          </Pane>
        )}

        <FirmMarkersLayer
          firms={visibleFirms}
          focusedFirmId={focusedFirmId}
          hoveredFirmId={hoveredFirmId}
          onFirmClick={onFirmClick}
          onFirmHover={onFirmHover}
          roleCounts={roleCounts}
          jobsByFirm={jobsByFirm}
          matchingFirmIds={matchingFirmIds}
          hasProfile={hasProfile}
        />

        <FlyToTarget target={target} />
        <DoubleClickZoomOut onReturnToGlobe={onReturnToGlobe} />
        <SteppedWheelZoom />
        <CountryInteractionGate />
        <PopupMountAnimator />
        <PaperBackdrop />
      </MapContainer>
    </div>
  );
}

/**
 * Renders firm markers. Dots respond to native mouse hover and reveal a
 * monogram + company-name tooltip; no permanent label.
 */
function FirmMarkersLayer({
  firms,
  focusedFirmId,
  hoveredFirmId,
  onFirmClick,
  onFirmHover,
  roleCounts,
  jobsByFirm,
  matchingFirmIds,
  hasProfile,
}: {
  firms: Firm[];
  focusedFirmId: string | null;
  hoveredFirmId: string | null;
  onFirmClick: (id: string) => void;
  onFirmHover: (id: string | null) => void;
  roleCounts: Map<string, number>;
  jobsByFirm: Map<string, Array<{ id: string; title: string; discipline: string; seniority: string }>>;
  matchingFirmIds?: ReadonlySet<string>;
  hasProfile?: boolean;
}) {
  const map = useMap();
  const [zoom, setZoom] = useState<number>(() => map.getZoom());
  useMapEvents({
    zoomend: () => setZoom(map.getZoom()),
  });

  // Refs for programmatic popup open.
  const markerRefs = useRef<Record<string, L.CircleMarker | null>>({});

  // The popup opens after the flyTo finishes; markers for clustered cities
  // only mount once zoom reaches CITY_ZOOM, so we retry across the animation.
  useEffect(() => {
    if (!focusedFirmId) return;
    const tryOpen = () => {
      const m = markerRefs.current[focusedFirmId];
      if (m) {
        m.openPopup();
        return true;
      }
      return false;
    };
    if (tryOpen()) return;
    const timers = [120, 320, 620, 980, 1300].map((d) =>
      window.setTimeout(tryOpen, d)
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [focusedFirmId]);

  const showClusters = zoom < CITY_ZOOM;

  // Group firms by city. Multi-firm cities render as a single cluster marker
  // below CITY_ZOOM, and as a sunflower-jittered set at street level.
  const clusters = useMemo(() => {
    const byCity = new Map<string, Firm[]>();
    for (const f of firms) {
      const key = `${f.countryCode}|${f.city}`;
      const bucket = byCity.get(key);
      if (bucket) bucket.push(f);
      else byCity.set(key, [f]);
    }
    return Array.from(byCity.values()).map((fs) => {
      const jittered = fs.map((f, i) => jitterFirm(f, i, fs.length));
      const bounds = jittered.reduce<L.LatLngBounds | null>((b, j) => {
        const ll = L.latLng(j.lat, j.lng);
        return b ? b.extend(ll) : L.latLngBounds(ll, ll);
      }, null);
      return {
        key: `${fs[0].countryCode}-${fs[0].city}`,
        city: fs[0].city,
        country: fs[0].country,
        centerLat: fs[0].lat,
        centerLng: fs[0].lng,
        firms: fs,
        jittered, // firm coords for street-level layout
        bounds,
      };
    });
  }, [firms]);

  const jitteredById = useMemo(() => {
    const m = new Map<string, { lat: number; lng: number }>();
    for (const c of clusters) {
      for (const j of c.jittered) m.set(j.id, { lat: j.lat, lng: j.lng });
    }
    return m;
  }, [clusters]);

  // Cap each cluster's disc radius so it never reaches another city's center.
  // The cap is half the screen-pixel distance to the nearest other city
  // (cluster or solo), minus a small margin so discs don't touch.
  // Recomputed when zoom changes (pan does not change relative pixel distance).
  const clusterRadii = useMemo(() => {
    const result = new Map<string, number>();
    if (!showClusters) return result;
    const pts = clusters.map((c) => ({
      key: c.key,
      isCluster: c.firms.length > 1,
      pt: map.latLngToContainerPoint([c.centerLat, c.centerLng]),
      desired: Math.max(20, Math.min(36, 14 + c.firms.length * 1.6)),
    }));
    const MARGIN = 4;
    const MIN_RADIUS = 8;
    for (let i = 0; i < pts.length; i++) {
      if (!pts[i].isCluster) continue;
      let minDist = Infinity;
      for (let j = 0; j < pts.length; j++) {
        if (i === j) continue;
        const d = pts[i].pt.distanceTo(pts[j].pt);
        if (d < minDist) minDist = d;
      }
      const cap = minDist === Infinity ? pts[i].desired : minDist / 2 - MARGIN;
      result.set(pts[i].key, Math.max(MIN_RADIUS, Math.min(pts[i].desired, cap)));
    }
    return result;
    // zoom is the controlling input; other deps are stable per layer instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clusters, zoom, showClusters]);

  // Stagger the entrance animation across markers via a CSS custom property.
  // We set --marker-delay on each rendered SVG path after leaflet appends it.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      const nodes = document.querySelectorAll<SVGPathElement>('.firm-marker');
      nodes.forEach((n, i) => n.style.setProperty('--marker-delay', `${i * 28}ms`));
    });
    return () => window.cancelAnimationFrame(id);
  }, [firms]);

  return (
    <>
      {showClusters &&
        clusters
          .filter((c) => c.firms.length > 1)
          .map((c) => {
            const totalRoles = c.firms.reduce(
              (n, f) => n + (roleCounts.get(f.id) ?? 0),
              0
            );
            const anyMatch =
              !!hasProfile &&
              c.firms.some((f) => matchingFirmIds?.has(f.id));
            const allDim = !!hasProfile && !anyMatch;
            const focusedInCluster =
              !!focusedFirmId && c.firms.some((f) => f.id === focusedFirmId);
            const dotColor = allDim ? DIM_INK : anyMatch ? FIT_GREEN : OXBLOOD;
            // City-area marker: a generous soft disc that IS the click target
            // for the whole cluster. Underlying firm dots are not rendered at
            // this zoom, so the cluster owns all hit-testing for the city.
            // Radius is capped so the disc never reaches another city's center.
            const desired = Math.max(20, Math.min(36, 14 + c.firms.length * 1.6));
            const radius = clusterRadii.get(c.key) ?? desired;
            const coreRadius = Math.max(
              3,
              Math.min(7, Math.min(3 + c.firms.length * 0.3, radius * 0.55))
            );
            const stateClass = [
              'firm-marker',
              'cluster-marker',
              focusedInCluster ? 'firm-marker--active' : '',
              anyMatch ? 'firm-marker--match' : '',
              allDim ? 'firm-marker--dim' : '',
            ]
              .filter(Boolean)
              .join(' ');
            const onAreaClick = () => {
              if (!c.bounds) return;
              onFirmHover(null);
              map.flyToBounds(c.bounds, {
                padding: [80, 80],
                duration: 0.9,
                maxZoom: CITY_ZOOM,
              });
            };
            return (
              <Fragment key={`cluster-${c.key}`}>
              <CircleMarker
                center={[c.centerLat, c.centerLng]}
                radius={radius}
                bubblingMouseEvents={false}
                interactive={true}
                pathOptions={{
                  className: stateClass,
                  color: dotColor,
                  weight: 1,
                  fillColor: dotColor,
                  fillOpacity: allDim ? 0.05 : 0.1,
                  opacity: allDim ? 0.35 : 0.55,
                }}
                eventHandlers={{ click: onAreaClick }}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -radius - 4]}
                  opacity={1}
                  className="cluster-tooltip"
                  sticky={false}
                >
                  <div className="cluster-tooltip-body">
                    <span className="serif cluster-tooltip-city">{c.city}</span>
                    <span className="mono cluster-tooltip-meta">
                      {c.firms.length} {c.firms.length === 1 ? 'FIRM' : 'FIRMS'}
                      {' · '}
                      {totalRoles} {totalRoles === 1 ? 'ROLE' : 'ROLES'}
                    </span>
                  </div>
                </Tooltip>
              </CircleMarker>
              {/* Core dot — visual anchor inside the area. Non-interactive so
                  hover/click always belongs to the area, never a stray
                  pixel-hit on the inner dot. */}
              <CircleMarker
                center={[c.centerLat, c.centerLng]}
                radius={coreRadius}
                interactive={false}
                pathOptions={{
                  className: 'firm-marker cluster-core',
                  color: dotColor,
                  weight: 1.25,
                  fillColor: dotColor,
                  fillOpacity: allDim ? 0.5 : 0.9,
                  opacity: allDim ? 0.6 : 1,
                }}
              />
              </Fragment>
            );
          })}

      {clusters.flatMap((c) => {
        // Solo firms always render. Multi-firm cities only render individuals
        // at street zoom (when showClusters is false).
        const inCluster = c.firms.length > 1;
        if (inCluster && showClusters) return [];
        return c.firms.map((f) => {
        const count = roleCounts.get(f.id) ?? 0;
        const isActive = f.id === focusedFirmId;
        const isHovered = f.id === hoveredFirmId;
        const isMatch = !!hasProfile && !!matchingFirmIds?.has(f.id);
        const isDim = !!hasProfile && !isMatch;
        const pos = jitteredById.get(f.id) ?? { lat: f.lat, lng: f.lng };

        // Resting radius is constant; visual size change on hover/active comes via CSS scale.
        const baseSize = isMatch
          ? Math.max(6, Math.min(12, 5 + count))
          : Math.max(5, Math.min(10, 4 + count));
        const baseRadius = baseSize;

        const stateClass = [
          'firm-marker',
          isActive ? 'firm-marker--active' : '',
          isHovered ? 'firm-marker--hover' : '',
          isMatch ? 'firm-marker--match' : '',
          isDim ? 'firm-marker--dim' : '',
        ]
          .filter(Boolean)
          .join(' ');

        const dotColor = isDim ? DIM_INK : isMatch ? FIT_GREEN : OXBLOOD;
        const fillOpacity = isDim ? 0.5 : isMatch ? 0.92 : 0.78;

        const jobs = jobsByFirm.get(f.id) ?? [];

        return (
          <CircleMarker
            key={f.id}
            ref={(r) => {
              markerRefs.current[f.id] = (r as unknown as L.CircleMarker) ?? null;
            }}
            center={[pos.lat, pos.lng]}
            radius={baseRadius}
            bubblingMouseEvents={false}
            pathOptions={{
              className: stateClass,
              color: dotColor,
              weight: isMatch ? 1.5 : 1,
              fillColor: dotColor,
              fillOpacity,
            }}
            eventHandlers={{
              click: (e) => {
                const marker = e.target as L.CircleMarker;
                pulseClick(marker, baseRadius);
                onFirmClick(f.id);
              },
              mouseover: (e) => {
                // Map dot hover is purely local — pulse + (optional) popup
                // slide. Crucially, do NOT call onFirmHover, otherwise the
                // firm/job rails sort and pan, and the wiring re-routes
                // every time the cursor passes a dot. Rails sync only when
                // the hover originates from a rail row.
                const marker = e.target as L.CircleMarker;
                pulseHover(marker, baseRadius);
                // When a popup is already open on a different firm, slide
                // it to the hovered firm so the user can scan the map.
                if (focusedFirmId && focusedFirmId !== f.id) {
                  onFirmClick(f.id);
                }
              },
              mouseout: (e) => {
                // Reset radius in case the hover pulse left a stale value.
                const marker = e.target as L.CircleMarker;
                marker.setRadius(baseRadius);
              },
            }}
          >
            {/* Hover-only tooltip: company mark (monogram) + name, nothing else. */}
            <Tooltip
              direction="top"
              offset={[0, -baseRadius - 6]}
              opacity={1}
              className="map-tooltip"
              sticky={false}
            >
              <div className="map-tooltip-body">
                <span className="map-tooltip-mark serif" aria-hidden="true">
                  {monogram(f.name)}
                </span>
                <span className="map-tooltip-text">
                  <span className="serif">{f.name}</span>
                </span>
              </div>
            </Tooltip>
            <Popup
              className="firm-popup-leaflet"
              closeButton={true}
              autoPan={true}
              autoPanPaddingTopLeft={[16, 16]}
              autoPanPaddingBottomRight={[16, 16]}
            >
              <FirmPopup firm={f} roleCount={count} jobs={jobs} />
            </Popup>
          </CircleMarker>
        );
        });
      })}
    </>
  );
}

/**
 * Deterministic sunflower jitter for firms inside the same city. Index 0 stays
 * at the city center; later indices spiral outward by the golden angle. The
 * radius is in degrees and chosen so 6–8 firms separate cleanly at CITY_ZOOM.
 */
function jitterFirm(
  firm: Firm,
  index: number,
  total: number
): { id: string; lat: number; lng: number } {
  if (total <= 1 || index === 0) {
    return { id: firm.id, lat: firm.lat, lng: firm.lng };
  }
  const goldenAngle = 2.39996323; // radians
  const stepDeg = 0.0042; // ~470m at the equator; shrinks with cos(lat)
  const r = stepDeg * Math.sqrt(index);
  const a = index * goldenAngle;
  const dLat = r * Math.sin(a);
  const dLng = (r * Math.cos(a)) / Math.cos((firm.lat * Math.PI) / 180);
  return { id: firm.id, lat: firm.lat + dLat, lng: firm.lng + dLng };
}

/**
 * Replaces Leaflet's continuous wheel zoom with a four-step ladder
 * (world → region → country → city). Each wheel notch animates to the
 * adjacent step and ignores further wheel input until the flight settles.
 */
function SteppedWheelZoom() {
  const map = useMap();
  const reduced = useReducedMotion();
  const animatingRef = useRef(false);

  useEffect(() => {
    const container = map.getContainer();
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (animatingRef.current) return;
      if (Math.abs(e.deltaY) < 1) return;
      const z = Math.round(map.getZoom());
      const dir: 1 | -1 = e.deltaY < 0 ? 1 : -1;
      const next = nextZoomStep(z, dir);
      if (next === z) return;
      // Anchor the zoom on the cursor latlng so zoom-in points where you're aiming.
      const anchor = map.mouseEventToLatLng(e);
      const targetCenter =
        dir > 0
          ? L.latLng(
              (map.getCenter().lat + anchor.lat) / 2,
              (map.getCenter().lng + anchor.lng) / 2
            )
          : map.getCenter();
      animatingRef.current = true;
      const settle = () => {
        animatingRef.current = false;
      };
      if (reduced) {
        map.setView(targetCenter, next, { animate: false });
        settle();
      } else {
        map.flyTo(targetCenter, next, { duration: 0.85 });
        window.setTimeout(settle, 900);
      }
    };
    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [map, reduced]);

  return null;
}

function nextZoomStep(current: number, dir: 1 | -1): number {
  const steps = ZOOM_STEPS;
  if (dir > 0) {
    for (const s of steps) if (s > current) return s;
    return steps[steps.length - 1];
  }
  for (let i = steps.length - 1; i >= 0; i--) if (steps[i] < current) return steps[i];
  return steps[0];
}

function FlyToTarget({ target }: { target: MapTarget | null }) {
  const map = useMap();
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!target) return;
    const current = map.getZoom();

    if (target.kind === 'world') {
      // "World" = the Europe-fit view: frame to EUROPE_BOUNDS.
      const bounds = L.latLngBounds(EUROPE_BOUNDS);
      if (reduced) map.fitBounds(bounds, { padding: [24, 24], animate: false });
      else map.flyToBounds(bounds, { padding: [24, 24], duration: 1.1 });
      return;
    }

    if (target.kind === 'world-at') {
      // Centered Europe view biased toward a coord (e.g. user's location).
      if (reduced) map.setView([target.lat, target.lng], initialZoom, { animate: false });
      else map.flyTo([target.lat, target.lng], initialZoom, { duration: 1.1 });
      return;
    }

    if (target.kind === 'country') {
      // Fit to the firms-in-country bbox (App passes the firm cluster, not
      // the polygon). Cap at COUNTRY_ZOOM so the country-highlight border
      // is still visible at the landing zoom: deeper zooms hide the
      // countriesPane entirely. Cluster / dot clicks take the user past
      // country into city view from here.
      const bounds = L.latLngBounds(target.bboxSW, target.bboxNE);
      if (reduced) {
        map.fitBounds(bounds, { padding: [48, 48], animate: false, maxZoom: COUNTRY_ZOOM });
      } else {
        map.flyToBounds(bounds, { padding: [48, 48], duration: 1.2, maxZoom: COUNTRY_ZOOM });
      }
      return;
    }

    if (target.kind === 'preview') {
      // Soft pan only — keep zoom. Skips when the point is already on screen
      // so casual rail-hover doesn't drag the map around when not needed.
      const ll = L.latLng(target.lat, target.lng);
      if (map.getBounds().pad(-0.18).contains(ll)) return;
      if (reduced) {
        map.panTo(ll, { animate: false });
      } else {
        map.panTo(ll, { animate: true, duration: 0.55, easeLinearity: 0.25 });
      }
      return;
    }

    // 'region' / 'firm': normally cap zoom at COUNTRY_ZOOM. Clustered firms
    // (same city) push to street level so dots separate and labels appear.
    const isCluster = target.kind === 'firm' && !!target.isCluster;
    const targetZoom = isCluster ? CITY_ZOOM : COUNTRY_ZOOM;
    if (reduced) {
      map.setView([target.lat, target.lng], targetZoom, { animate: false });
    } else if (current === targetZoom) {
      map.panTo([target.lat, target.lng], { duration: 0.7, easeLinearity: 0.25 });
    } else {
      map.flyTo([target.lat, target.lng], targetZoom, { duration: 1.1 });
    }
  }, [target, map, reduced]);
  return null;
}

/**
 * Double-click steps OUT one rung on the four-stage zoom ladder.
 * At world view, falls through to the globe (3D) return handler.
 */
function DoubleClickZoomOut({ onReturnToGlobe }: { onReturnToGlobe?: () => void }) {
  const reduced = useReducedMotion();
  const map = useMapEvents({
    dblclick() {
      const z = Math.round(map.getZoom());
      const next = nextZoomStep(z, -1);
      if (next < z) {
        const center = map.getCenter();
        if (reduced) map.setView(center, next, { animate: false });
        else map.flyTo(center, next, { duration: 0.9 });
        return;
      }
      if (onReturnToGlobe) onReturnToGlobe();
    },
  });
  return null;
}

/**
 * Past country zoom the user is acting on dots and clusters — country
 * tooltips and country hover-fills become noise. This component toggles a
 * `.is-zoomed-deep` class on the Leaflet root so CSS can disable country
 * pointer events and hide the country tooltip at high zoom.
 */
/**
 * Listen for popup mounts inside Leaflet's popupPane and animate them in via
 * anime.js. Replaces the prior CSS keyframe so the entry can stagger inner
 * sections rather than just fading the wrapper.
 */
function PopupMountAnimator() {
  const map = useMap();
  useEffect(() => {
    const pane = map.getPanes().popupPane;
    if (!pane) return;
    const onAdd = (mutations: MutationRecord[]) => {
      for (const mut of mutations) {
        mut.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.classList.contains('firm-popup-leaflet')) {
            animatePopupIn(node);
          }
        });
      }
    };
    const obs = new MutationObserver(onAdd);
    obs.observe(pane, { childList: true });
    return () => obs.disconnect();
  }, [map]);
  return null;
}

function CountryInteractionGate() {
  const map = useMap();
  useEffect(() => {
    const root = map.getContainer();
    const apply = () => {
      root.classList.toggle('is-zoomed-deep', map.getZoom() >= COUNTRY_ZOOM);
    };
    apply();
    map.on('zoomend', apply);
    return () => {
      map.off('zoomend', apply);
      root.classList.remove('is-zoomed-deep');
    };
  }, [map]);
  return null;
}

function PaperBackdrop() {
  const map = useMap();
  useEffect(() => {
    map.getContainer().style.background = PAPER;
  }, [map]);
  return null;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
