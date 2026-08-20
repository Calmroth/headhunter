/**
 * Daily jobs refresh. No API key, no model, no cost.
 *
 * Reads each firm's recorded source (src/data/jobSources.ts), fetches the
 * postings, maps titles onto the taxonomy with a table, reconciles against the
 * existing JOBS array, and rewrites src/data/jobs.ts.
 *
 * Usage:
 *   node --experimental-strip-types scripts/refresh-jobs.mjs [--dry-run]
 *
 * Fail-safes, in the order they matter:
 *   1. A firm whose source cannot be read keeps its existing listings. An
 *      unreachable site is not a site with no jobs.
 *   2. If NOT ONE firm could be read, the run writes nothing and exits 1.
 *      Otherwise a total network failure would restamp JOBS_LAST_UPDATED and
 *      advertise stale data as fresh.
 *   3. Titles that do not map to the taxonomy are skipped and reported, never
 *      guessed into the nearest bucket.
 */
import { writeFileSync } from 'node:fs';
import { FIRMS } from '../src/data/firms.ts';
import { JOBS } from '../src/data/jobs.ts';
import { JOB_SOURCES } from '../src/data/jobSources.ts';
import { ATS, extractJsonLdPostings, fetchJson, fetchText } from './lib/sources.mjs';
import { classify } from './lib/classify.mjs';
import { reconcile, renderJobsFile } from './lib/reconcile.mjs';

const OUT = new URL('../src/data/jobs.ts', import.meta.url);
const CONCURRENCY = 8;
const dryRun = process.argv.includes('--dry-run');

const now = new Date().toISOString();
const today = now.slice(0, 10);

/** @returns {{postings: Array}|null} null means "could not read" — not "empty". */
async function readSource(source) {
  if (!source || source.kind === 'none') return null;

  if (source.kind === 'jsonld') {
    const html = await fetchText(source.url);
    if (html == null) return null;
    return { postings: extractJsonLdPostings(html) };
  }

  const adapter = ATS[source.kind];
  if (!adapter || !source.url) return null;
  const json = await fetchJson(source.url);
  if (json == null) return null;
  try {
    return { postings: adapter.parse(json) };
  } catch {
    return null;
  }
}

async function mapLimited(items, limit, fn) {
  const out = [];
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      out[i] = await fn(items[i]);
    }
  });
  await Promise.all(workers);
  return out;
}

const withSource = FIRMS.filter((f) => JOB_SOURCES[f.id] && JOB_SOURCES[f.id].kind !== 'none');
const noSource = FIRMS.length - withSource.length;

if (withSource.length === 0) {
  console.error(
    'refresh: no firm has a recorded job source. Run `npm run discover:jobs` first.'
  );
  process.exit(1);
}

console.log(`refresh: reading ${withSource.length} source(s) (${noSource} firm(s) have none)…`);

const fetched = new Map();
const unreachable = new Set();
const unmapped = [];
let readOk = 0;

await mapLimited(withSource, CONCURRENCY, async (firm) => {
  const result = await readSource(JOB_SOURCES[firm.id]);
  if (result == null) {
    unreachable.add(firm.id);
    return;
  }
  readOk += 1;
  const classified = [];
  for (const p of result.postings) {
    if (!p?.title) continue;
    const taxonomy = classify(p.title);
    if (!taxonomy) {
      unmapped.push(`${firm.id}: ${p.title}`);
      continue;
    }
    classified.push({ ...p, ...taxonomy });
  }
  fetched.set(firm.id, classified);
});

// Fail-safe 2: a run that read nothing must not claim to be a refresh.
if (readOk === 0) {
  console.error(
    `refresh: every one of ${withSource.length} sources was unreachable — writing nothing. ` +
      'This looks like a network or egress problem, not an empty market.'
  );
  process.exit(1);
}

const knownFirmIds = new Set(FIRMS.map((f) => f.id));
const { jobs, stats } = reconcile({
  existing: JOBS,
  fetched,
  unreachable,
  knownFirmIds,
  now,
});

console.log(
  `refresh: ${readOk} read, ${unreachable.size} unreachable, ` +
    `+${stats.added.length} added, -${stats.removed.length} removed, ` +
    `${stats.refreshed.length} redated, ${stats.keptUnreachable} kept behind an unreachable source, ` +
    `${stats.keptNoSource} kept for firms with no source`
);
for (const line of stats.added) console.log(`  + ${line}`);
for (const line of stats.removed) console.log(`  - ${line}`);
if (stats.orphaned.length) console.log(`  dropped (firm no longer in roster): ${stats.orphaned.join(', ')}`);
if (unmapped.length) {
  console.log(`refresh: ${unmapped.length} title(s) outside the taxonomy, skipped:`);
  for (const line of unmapped.slice(0, 40)) console.log(`  ? ${line}`);
  if (unmapped.length > 40) console.log(`  … and ${unmapped.length - 40} more`);
}
if (unreachable.size) {
  console.log(`refresh: unreachable sources — ${[...unreachable].join(', ')}`);
}

if (dryRun) {
  console.log('refresh: --dry-run, not writing');
  process.exit(0);
}

writeFileSync(OUT, renderJobsFile(jobs, today));
console.log(`refresh: wrote ${jobs.length} listing(s), JOBS_LAST_UPDATED=${today}`);
