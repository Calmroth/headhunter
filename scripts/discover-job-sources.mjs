/**
 * Finds each firm's machine-readable job source and records it.
 *
 * Run occasionally — when firms are added, or when the refresh reports a
 * source that has stopped working. The daily job does not call this.
 *
 * No language model is involved. Applicant tracking systems expose public
 * board APIs at predictable URLs keyed by a tenant slug, and that slug is
 * almost always the firm's domain or name. So discovery is: derive candidate
 * slugs, probe the known ATS endpoints, and record whichever actually returns
 * postings. Firms with no ATS fall back to their careers page, which is
 * checked for schema.org JobPosting markup.
 *
 * Usage:
 *   node --experimental-strip-types scripts/discover-job-sources.mjs [--all] [--only=id,id]
 *
 * By default only firms with no recorded source are probed; --all re-probes
 * everything.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { FIRMS } from '../src/data/firms.ts';
import { WEBSITES } from '../src/data/websites.ts';
import { JOB_SOURCES } from '../src/data/jobSources.ts';
import {
  ATS,
  ATS_KINDS,
  careerPageCandidates,
  extractJsonLdPostings,
  fetchJson,
  fetchText,
  slugCandidates,
} from './lib/sources.mjs';

const OUT = new URL('../src/data/jobSources.ts', import.meta.url);
const CONCURRENCY = 6;

const args = process.argv.slice(2);
const probeAll = args.includes('--all');
const only = args
  .find((a) => a.startsWith('--only='))
  ?.slice('--only='.length)
  .split(',')
  .filter(Boolean);

const today = new Date().toISOString().slice(0, 10);

/** Probe every ATS with every candidate slug. First one with postings wins. */
async function probeAts(firmId, website) {
  for (const slug of slugCandidates(firmId, website)) {
    for (const kind of ATS_KINDS) {
      for (const url of ATS[kind].candidates(slug)) {
        const json = await fetchJson(url);
        if (!json) continue;
        let postings;
        try {
          postings = ATS[kind].parse(json).filter((p) => p?.title);
        } catch {
          continue;
        }
        // Zero postings proves nothing — an empty board and a wrong endpoint
        // look identical — so only a non-empty parse counts as verification.
        if (postings.length > 0) {
          return { kind, slug, url, verifiedAt: today };
        }
      }
    }
  }
  return null;
}

async function probeJsonLd(website) {
  for (const url of careerPageCandidates(website)) {
    const html = await fetchText(url);
    if (!html) continue;
    const postings = extractJsonLdPostings(html).filter((p) => p?.title);
    if (postings.length > 0) return { kind: 'jsonld', url, verifiedAt: today };
  }
  return null;
}

async function discover(firm) {
  const website = WEBSITES[firm.id];
  if (!website) {
    return [firm.id, { kind: 'none', note: 'no website on record' }];
  }
  const ats = await probeAts(firm.id, website);
  if (ats) return [firm.id, ats];
  const jsonld = await probeJsonLd(website);
  if (jsonld) return [firm.id, jsonld];
  return [firm.id, { kind: 'none', note: `no machine-readable source found at ${website}` }];
}

/** Bounded-concurrency map, so we are not hammering a dozen hosts at once. */
async function mapLimited(items, limit, fn) {
  const results = [];
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await fn(items[i], i);
    }
  });
  await Promise.all(workers);
  return results;
}

const targets = FIRMS.filter((f) => {
  if (only) return only.includes(f.id);
  if (probeAll) return true;
  // Firms with no entry, and firms previously recorded as having no source:
  // a `none` is often just the day the site was down, and re-probing is free.
  // Only a verified source is skipped.
  const existing = JOB_SOURCES[f.id];
  return !existing || existing.kind === 'none';
});

if (targets.length === 0) {
  console.log('discover: nothing to probe (every firm already has a source; use --all to re-probe)');
  process.exit(0);
}

console.log(`discover: probing ${targets.length} firm(s)…`);
const found = await mapLimited(targets, CONCURRENCY, async (firm) => {
  const entry = await discover(firm);
  console.log(`  ${firm.id.padEnd(28)} ${entry[1].kind}${entry[1].slug ? ` (${entry[1].slug})` : ''}`);
  return entry;
});

const verified = found.filter(([, s]) => s.kind !== 'none').length;
// A blocked network makes every probe look like "no source exists". Recording
// that would permanently sideline the whole roster, so a run that verified
// nothing at all writes nothing at all.
if (verified === 0 && targets.length > 3) {
  console.error(
    `discover: not one of ${targets.length} firms yielded a source — writing nothing. ` +
      'That pattern means the network is blocked, not that the market is empty.'
  );
  process.exit(1);
}

const merged = { ...JOB_SOURCES };
for (const [id, source] of found) {
  // Never downgrade a verified source to `none` on a single bad probe.
  if (source.kind === 'none' && JOB_SOURCES[id]?.kind && JOB_SOURCES[id].kind !== 'none') {
    continue;
  }
  merged[id] = source;
}

const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const body = Object.keys(merged)
  .sort()
  .map((id) => {
    const s = merged[id];
    const parts = [`kind: '${s.kind}'`];
    if (s.slug) parts.push(`slug: '${esc(s.slug)}'`);
    if (s.url) parts.push(`url: '${esc(s.url)}'`);
    if (s.verifiedAt) parts.push(`verifiedAt: '${esc(s.verifiedAt)}'`);
    if (s.note) parts.push(`note: '${esc(s.note)}'`);
    return `  '${esc(id)}': { ${parts.join(', ')} },`;
  })
  .join('\n');

const src = readFileSync(OUT, 'utf8');
const marker = 'export const JOB_SOURCES: Record<string, JobSource> = {';
const head = src.slice(0, src.indexOf(marker) + marker.length);
writeFileSync(OUT, `${head}\n${body}\n};\n`);

const counts = {};
for (const s of Object.values(merged)) counts[s.kind] = (counts[s.kind] ?? 0) + 1;
console.log(
  `discover: wrote ${Object.keys(merged).length} source(s) — ` +
    Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([k, n]) => `${k}:${n}`)
      .join(' ')
);
