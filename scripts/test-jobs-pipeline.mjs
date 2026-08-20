/**
 * Offline tests for the jobs pipeline.
 *
 * Everything here runs without a network: the classifier, the JSON-LD reader,
 * the ATS response parsers (against recorded fixture shapes), the
 * reconciliation rules, and the generated jobs.ts round-tripping back through
 * the TypeScript loader.
 *
 * That is deliberate — the network parts are three small fetch wrappers, while
 * the logic that decides what a title means and whether a listing survives is
 * where a bug would silently corrupt the roster.
 *
 * Run: npm run test:jobs
 */
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { classify } from './lib/classify.mjs';
import { ATS, extractJsonLdPostings } from './lib/sources.mjs';
import { jobKey, reconcile, renderJobsFile } from './lib/reconcile.mjs';

let passed = 0;
const failures = [];

function check(name, actual, expected) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) passed += 1;
  else failures.push(`${name}\n    expected ${e}\n    actual   ${a}`);
}

function ok(name, condition) {
  if (condition) passed += 1;
  else failures.push(`${name}\n    expected truthy`);
}

// ---------------------------------------------------------------- classify --
const CLASSIFY_CASES = [
  ['Senior 3D Artist', '3D Artist', 'Senior'],
  ['3D Generalist', '3D Artist', 'Mid'],
  ['CG Generalist, Film', 'CG Generalist', 'Mid'],
  ['Concept Artist (Games)', 'Concept Artist', 'Mid'],
  ['Motion Graphics Designer', 'Motion Designer', 'Mid'],
  ['Junior Animator', 'Motion Designer', 'Junior'],
  // "Director" inside a discipline must never read as a head-of seniority.
  ['Art Director', 'Art Director', 'Mid'],
  ['Creative Director', 'Creative Director', 'Mid'],
  ['Executive Creative Director', 'Creative Director', 'Head of'],
  ['Head of Design', 'Creative Director', 'Head of'],
  ['Design Lead', 'Creative Director', 'Lead'],
  ['Lead UX Designer', 'UX Designer', 'Lead'],
  ['UX/UI Designer', 'UX Designer', 'Mid'],
  ['Senior Service Designer', 'UX Designer', 'Senior'],
  // Product Designer means interface work in this industry.
  ['Senior Product Designer', 'UI Designer', 'Senior'],
  ['Principal Industrial Designer', 'Industrial Designer', 'Principal'],
  ['Junior Graphic Designer', 'Visual Designer', 'Junior'],
  ['Senior Brand Designer', 'Brand Designer', 'Senior'],
  ['Type Designer', 'Type Designer', 'Mid'],
];
for (const [title, discipline, seniority] of CLASSIFY_CASES) {
  check(`classify "${title}"`, classify(title), { discipline, seniority });
}

const CLASSIFY_NULLS = [
  'Frontend Engineer',
  'Senior Backend Developer',
  'Account Manager',
  'Spontaneous application',
  'Open application',
  'Talent Acquisition Partner',
  // Real title, but nothing in the taxonomy covers it — skipped, not guessed.
  'Copywriter',
  '',
];
for (const title of CLASSIFY_NULLS) {
  check(`classify rejects "${title}"`, classify(title), null);
}

// ------------------------------------------------------------- JSON-LD ------
const LD_BARE = `<html><script type="application/ld+json">
{"@type":"JobPosting","title":"Senior UX Designer","url":"https://x.test/1",
 "datePosted":"2026-08-01","jobLocation":{"address":{"addressLocality":"Stockholm"}}}
</script></html>`;
check('json-ld: bare posting', extractJsonLdPostings(LD_BARE), [
  {
    title: 'Senior UX Designer',
    url: 'https://x.test/1',
    location: 'Stockholm',
    postedAt: new Date('2026-08-01').toISOString(),
  },
]);

const LD_GRAPH = `<script type='application/ld+json'>
{"@context":"https://schema.org","@graph":[
  {"@type":"Organization","name":"Not a job"},
  {"@type":"JobPosting","title":"Motion Designer"},
  {"@type":["JobPosting"],"name":"Art Director"}]}
</script>`;
check(
  'json-ld: @graph, mixed types, name fallback',
  extractJsonLdPostings(LD_GRAPH).map((p) => p.title),
  ['Motion Designer', 'Art Director']
);

const LD_BROKEN = `<script type="application/ld+json">{ not json </script>
<script type="application/ld+json">[{"@type":"JobPosting","title":"Brand Designer"}]</script>`;
check(
  'json-ld: a malformed block does not lose the good one',
  extractJsonLdPostings(LD_BROKEN).map((p) => p.title),
  ['Brand Designer']
);
check('json-ld: no markup', extractJsonLdPostings('<html></html>'), []);
check('json-ld: null input', extractJsonLdPostings(null), []);

// ------------------------------------------------------------- adapters -----
check(
  'greenhouse parse',
  ATS.greenhouse.parse({
    jobs: [
      {
        title: 'Senior 3D Artist',
        absolute_url: 'https://gh.test/1',
        location: { name: 'Stockholm' },
        updated_at: '2026-08-10T00:00:00Z',
      },
    ],
  }),
  [
    {
      title: 'Senior 3D Artist',
      url: 'https://gh.test/1',
      location: 'Stockholm',
      postedAt: '2026-08-10T00:00:00.000Z',
    },
  ]
);

check(
  'lever parse (top-level array)',
  ATS.lever.parse([
    { text: 'Lead UX Designer', hostedUrl: 'https://lv.test/1', categories: { location: 'Oslo' }, createdAt: 1754784000000 },
  ]).map((p) => [p.title, p.url, p.location]),
  [['Lead UX Designer', 'https://lv.test/1', 'Oslo']]
);

check(
  'ashby parse',
  ATS.ashby.parse({ jobs: [{ title: 'Brand Designer', jobUrl: 'https://ab.test/1', location: 'London' }] }),
  [{ title: 'Brand Designer', url: 'https://ab.test/1', location: 'London', postedAt: undefined }]
);

check(
  'recruitee parse joins city and country',
  ATS.recruitee.parse({
    offers: [{ title: 'Art Director', careers_url: 'https://rc.test/1', city: 'Helsinki', country: 'Finland' }],
  }).map((p) => p.location),
  ['Helsinki, Finland']
);

// Adapters must not throw on shapes they did not expect — discovery relies on
// a wrong guess failing quietly rather than crashing the probe loop.
for (const kind of Object.keys(ATS)) {
  for (const junk of [{}, { jobs: null }, [], null, { content: 'nope' }]) {
    try {
      const out = ATS[kind].parse(junk);
      ok(`${kind} parse tolerates ${JSON.stringify(junk)}`, Array.isArray(out));
    } catch (err) {
      failures.push(`${kind} parse threw on ${JSON.stringify(junk)}: ${err.message}`);
    }
  }
}

// ------------------------------------------------------------ reconcile -----
const NOW = '2026-08-20T00:00:00.000Z';
const knownFirmIds = new Set(['alpha', 'beta', 'gamma']);
const existing = [
  { id: 'j-1', firmId: 'alpha', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-08-01T00:00:00.000Z' },
  { id: 'j-2', firmId: 'alpha', title: 'Art Director', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-08-01T00:00:00.000Z' },
  { id: 'j-3', firmId: 'beta', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-08-01T00:00:00.000Z' },
  { id: 'j-4', firmId: 'ghost', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-08-01T00:00:00.000Z' },
];
const fetched = new Map([
  // alpha: j-1 survives (redated), j-2 is gone, one new role appears.
  ['alpha', [
    { title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-08-15T00:00:00.000Z' },
    { title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-08-14T00:00:00.000Z' },
  ]],
]);
const unreachable = new Set(['beta']);
const { jobs, stats } = reconcile({ existing, fetched, unreachable, knownFirmIds, now: NOW });

check('reconcile: removes a listing that is gone', stats.removed.length, 1);
ok('reconcile: the removed one is j-2', stats.removed[0].startsWith('j-2'));
check('reconcile: adds the new listing', stats.added.length, 1);
ok('reconcile: new id continues past the max', jobs.some((j) => j.id === 'j-5'));
check('reconcile: redates when materially newer', stats.refreshed, ['j-1']);
// The rule that matters: an unreachable firm is not an empty firm.
ok('reconcile: keeps listings behind an unreachable source', jobs.some((j) => j.id === 'j-3'));
check('reconcile: counts what it kept', stats.keptUnreachable, 1);
// The bug this caught in testing: gamma has no source at all — never fetched,
// never marked unreachable — and its listing must survive regardless.
const noSource = reconcile({
  existing: [...existing, { id: 'j-8', firmId: 'gamma', title: 'Type Designer', discipline: 'Type Designer', seniority: 'Mid', postedAt: '2026-08-01T00:00:00.000Z' }],
  fetched,
  unreachable,
  knownFirmIds,
  now: NOW,
});
ok('reconcile: keeps listings for a firm with no source at all', noSource.jobs.some((j) => j.id === 'j-8'));
check('reconcile: counts the no-source carry-over', noSource.stats.keptNoSource, 1);
// A firm dropped from the roster cannot leave orphan listings behind, or
// check:data fails the build.
ok('reconcile: drops listings for a firm no longer in the roster', !jobs.some((j) => j.id === 'j-4'));
check('reconcile: reports the orphan', stats.orphaned, ['j-4']);
ok('reconcile: new listing is flagged new', jobs.find((j) => j.id === 'j-5')?.agentFound === true);
ok('reconcile: surviving listing is no longer flagged new', !jobs.find((j) => j.id === 'j-1')?.agentFound);

// A trivially newer date must not churn the file.
const { stats: s2 } = reconcile({
  existing: [existing[0]],
  fetched: new Map([['alpha', [{ title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-08-01T01:00:00.000Z' }]]]),
  unreachable: new Set(),
  knownFirmIds,
  now: NOW,
});
check('reconcile: ignores sub-threshold date drift', s2.refreshed, []);

check('jobKey normalises punctuation and case', jobKey('a', 'CG Generalist, Film'), jobKey('a', 'cg generalist  film'));

// --------------------------------------------------------------- render -----
const rendered = renderJobsFile(jobs, '2026-08-20');
ok('render: marks the file generated', rendered.includes('GENERATED FILE'));
ok('render: stamps the date', rendered.includes("JOBS_LAST_UPDATED = '2026-08-20'"));
ok('render: no relative date helpers survive', !/daysAgo|hoursAgo/.test(rendered));

// The real proof: the generated file must load as TypeScript and expose the
// same listings we handed it.
const dir = mkdtempSync(join(tmpdir(), 'jobs-render-'));
writeFileSync(join(dir, 'taxonomy.ts'), 'export type Discipline = string;\nexport type Seniority = string;\n');
const file = join(dir, 'jobs.ts');
writeFileSync(file, rendered);
const loaded = await import(`file://${file}`);
check('render: round-trips through the TS loader', loaded.JOBS.length, jobs.length);
check('render: ids survive', loaded.JOBS.map((j) => j.id), jobs.map((j) => j.id));
check('render: escaping holds for quotes', (() => {
  const tricky = [{ id: 'j-9', firmId: 'a', title: "Designer, O'Neill's", discipline: 'Visual Designer', seniority: 'Mid', postedAt: NOW }];
  return renderJobsFile(tricky, '2026-08-20').includes("O\\'Neill\\'s");
})(), true);

// ------------------------------------------------------------------ done ----
if (failures.length) {
  console.error(`\njobs pipeline: ${failures.length} FAILED, ${passed} passed\n`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`jobs pipeline: ${passed} checks passed`);
