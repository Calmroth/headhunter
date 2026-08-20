/**
 * Referential integrity across the data files. Runs before every build.
 *
 * These files are edited by hand and by the refresher agents, and the failure
 * mode is silent: a job pointing at a firm that was retired simply stops
 * rendering, and a firm whose city has no coordinate lands at (0, 0) off the
 * coast of Africa. Both are cheap to catch here.
 */
import { CITY_COORDS, FIRMS, FIRMS_BY_ID, RETIRED_FIRMS } from '../src/data/firms.ts';
import { JOBS } from '../src/data/jobs.ts';
import { WEBSITES } from '../src/data/websites.ts';
import { CONTACTS } from '../src/data/contacts.ts';
import COUNTRIES from '../src/data/countries.topo.json' with { type: 'json' };

const errors = [];
const warnings = [];

const seen = new Set();
for (const f of FIRMS) {
  if (seen.has(f.id)) errors.push(`duplicate firm id: ${f.id}`);
  seen.add(f.id);

  if (RETIRED_FIRMS[f.id]) {
    errors.push(`firm ${f.id} is listed in RETIRED_FIRMS but is still in FIRMS`);
  }

  const key = `${f.countryCode}|${f.city}`;
  const coord = CITY_COORDS[key];
  if (!coord) {
    errors.push(`firm ${f.id}: no CITY_COORDS entry for ${key}`);
  } else if (f.precision === 'city' && (f.lat !== coord[0] || f.lng !== coord[1])) {
    errors.push(
      `firm ${f.id}: city-precision coordinate drifted from CITY_COORDS[${key}] ` +
        `(${f.lat}, ${f.lng}) vs (${coord[0]}, ${coord[1]})`
    );
  }
  if (f.precision !== 'city' && f.precision !== 'address') {
    errors.push(`firm ${f.id}: precision must be 'city' or 'address'`);
  }
  if (!Number.isFinite(f.lat) || !Number.isFinite(f.lng)) {
    errors.push(`firm ${f.id}: non-finite coordinate`);
  }
}

for (const j of JOBS) {
  if (!FIRMS_BY_ID[j.firmId]) {
    errors.push(
      `job ${j.id} points at unknown firm '${j.firmId}'` +
        (RETIRED_FIRMS[j.firmId] ? ' (retired — reassign or drop the role)' : '')
    );
  }
  if (Number.isNaN(Date.parse(j.postedAt))) {
    errors.push(`job ${j.id}: unparseable postedAt '${j.postedAt}'`);
  }
}

for (const id of Object.keys(WEBSITES)) {
  if (!FIRMS_BY_ID[id]) warnings.push(`website entry for unknown firm '${id}'`);
}
for (const c of CONTACTS) {
  if (!FIRMS_BY_ID[c.firmId]) warnings.push(`contact entry for unknown firm '${c.firmId}'`);
}

// The baked country geometry is committed, not rebuilt on every `npm run
// build`. If the roster gains a country, the polygon for it is simply missing
// and the country never highlights — catch that here rather than in the UI.
const bakedCountries = new Set(
  (COUNTRIES.objects?.countries?.geometries ?? []).map((g) => g.properties?.alpha2)
);
for (const code of new Set(FIRMS.map((f) => f.countryCode))) {
  if (!bakedCountries.has(code)) {
    errors.push(
      `country ${code} has firms but no polygon in countries.topo.json — ` +
        `run \`npm run build:countries\``
    );
  }
}
for (const code of bakedCountries) {
  if (!FIRMS.some((f) => f.countryCode === code)) {
    warnings.push(`countries.topo.json ships ${code}, which has no firms — rebuild to shrink it`);
  }
}

const usedCities = new Set(FIRMS.map((f) => `${f.countryCode}|${f.city}`));
for (const key of Object.keys(CITY_COORDS)) {
  if (!usedCities.has(key)) warnings.push(`CITY_COORDS['${key}'] is unused`);
}

for (const w of warnings) console.warn(`warn: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`error: ${e}`);
  console.error(`\ndata check failed: ${errors.length} error(s)`);
  process.exit(1);
}
console.log(
  `data check ok — ${FIRMS.length} firms, ${JOBS.length} jobs, ` +
    `${Object.keys(CITY_COORDS).length} cities, ${bakedCountries.size} baked countries, ` +
    `${Object.keys(RETIRED_FIRMS).length} retired` +
    (warnings.length ? `, ${warnings.length} warning(s)` : '')
);
