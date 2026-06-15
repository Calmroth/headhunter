// Stamps JOBS_LAST_UPDATED in src/data/jobs.ts with today's UTC date.
// Pure Node, no deps, no API key. Idempotent: exits 0 with no write when the
// date is already current, so the hourly cron only produces a commit once per
// UTC day (when the date actually rolls over). Run: node scripts/refresh-timestamp.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'src/data/jobs.ts';
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)

const src = readFileSync(FILE, 'utf8');
const re = /(export const JOBS_LAST_UPDATED = ')(\d{4}-\d{2}-\d{2})(';)/;
const m = src.match(re);

if (!m) {
  console.error(`JOBS_LAST_UPDATED constant not found in ${FILE}`);
  process.exit(1);
}

if (m[2] === today) {
  console.log(`Already stamped ${today} — no change.`);
  process.exit(0);
}

writeFileSync(FILE, src.replace(re, `$1${today}$3`));
console.log(`Stamped JOBS_LAST_UPDATED ${m[2]} -> ${today}`);
