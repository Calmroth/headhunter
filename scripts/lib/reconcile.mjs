/**
 * Merges freshly fetched postings into the existing JOBS array, and renders
 * src/data/jobs.ts.
 *
 * The rule that matters most is the one about absent evidence: a listing is
 * only ever removed for a firm we SUCCESSFULLY READ this run. A firm whose
 * source failed, and a firm that has no source recorded at all, both mean the
 * same thing — we learned nothing about them — and neither is a firm with no
 * openings. Conflating silence with emptiness would delete a studio's roles
 * every time its site had a bad minute, or the moment it was added to the
 * roster before discovery had run.
 */

/** Identity of a listing: the same role at the same firm, however it is spelled. */
export function jobKey(firmId, title) {
  const t = String(title ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
  return `${firmId}::${t}`;
}

/** postedAt is only overwritten when the live date is meaningfully newer. */
const MATERIAL_DRIFT_MS = 24 * 60 * 60 * 1000;

/**
 * @param {object} args
 * @param {Array} args.existing            current JOBS entries
 * @param {Map<string, Array>} args.fetched firmId -> classified postings
 * @param {Set<string>} args.unreachable   firmIds whose source could not be read
 * @param {Set<string>} args.knownFirmIds  firmIds that still exist in the roster
 * @param {string} args.now                ISO timestamp for this run
 */
export function reconcile({ existing, fetched, unreachable, knownFirmIds, now }) {
  const stats = {
    added: [],
    removed: [],
    refreshed: [],
    keptUnreachable: 0,
    keptNoSource: 0,
    orphaned: [],
  };

  const liveKeys = new Set();
  for (const [firmId, postings] of fetched) {
    for (const p of postings) liveKeys.add(jobKey(firmId, p.title));
  }

  let maxId = 0;
  for (const job of existing) {
    const n = Number(/^j-(\d+)$/.exec(job.id)?.[1] ?? 0);
    if (n > maxId) maxId = n;
  }

  const kept = [];
  for (const job of existing) {
    // A firm dropped from the roster takes its listings with it; check:data
    // would fail the build otherwise.
    if (!knownFirmIds.has(job.firmId)) {
      stats.orphaned.push(job.id);
      continue;
    }
    // Absent evidence is not evidence of absence. Only a firm that was read
    // successfully can have listings retired; anything else is carried over.
    if (!fetched.has(job.firmId)) {
      if (unreachable.has(job.firmId)) stats.keptUnreachable += 1;
      else stats.keptNoSource += 1;
      kept.push(job);
      continue;
    }
    const key = jobKey(job.firmId, job.title);
    if (!liveKeys.has(key)) {
      stats.removed.push(`${job.id} ${job.firmId}: ${job.title}`);
      continue;
    }
    const live = (fetched.get(job.firmId) ?? []).find(
      (p) => jobKey(job.firmId, p.title) === key
    );
    let postedAt = job.postedAt;
    if (live?.postedAt) {
      const a = Date.parse(live.postedAt);
      const b = Date.parse(job.postedAt);
      if (Number.isFinite(a) && (!Number.isFinite(b) || a - b > MATERIAL_DRIFT_MS)) {
        postedAt = live.postedAt;
        stats.refreshed.push(job.id);
      }
    }
    // A role that survives a refresh is no longer new.
    kept.push({ ...job, postedAt, agentFound: undefined });
  }

  const keptKeys = new Set(kept.map((j) => jobKey(j.firmId, j.title)));
  const added = [];
  for (const [firmId, postings] of fetched) {
    if (!knownFirmIds.has(firmId)) continue;
    for (const p of postings) {
      const key = jobKey(firmId, p.title);
      if (keptKeys.has(key)) continue;
      keptKeys.add(key);
      maxId += 1;
      const job = {
        id: `j-${maxId}`,
        firmId,
        title: p.title,
        discipline: p.discipline,
        seniority: p.seniority,
        postedAt: p.postedAt ?? now,
        // Drives the "new" marker in JobsList — first seen in this refresh.
        agentFound: true,
      };
      added.push(job);
      stats.added.push(`${job.id} ${firmId}: ${job.title}`);
    }
  }

  const jobs = [...kept, ...added].sort((a, b) => {
    const an = Number(/^j-(\d+)$/.exec(a.id)?.[1] ?? 0);
    const bn = Number(/^j-(\d+)$/.exec(b.id)?.[1] ?? 0);
    return an - bn;
  });
  return { jobs, stats };
}

const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

/** Renders the whole of src/data/jobs.ts. */
export function renderJobsFile(jobs, lastUpdated) {
  const rows = jobs
    .map((j) => {
      const parts = [
        `id: '${esc(j.id)}'`,
        `firmId: '${esc(j.firmId)}'`,
        `title: '${esc(j.title)}'`,
        `discipline: '${esc(j.discipline)}'`,
        `seniority: '${esc(j.seniority)}'`,
        `postedAt: '${esc(j.postedAt)}'`,
      ];
      if (j.agentFound) parts.push('agentFound: true');
      return `  { ${parts.join(', ')} },`;
    })
    .join('\n');

  return `import type { Discipline, Seniority } from './taxonomy';

/**
 * GENERATED FILE — do not edit by hand.
 *
 * Written by \`npm run refresh:jobs\`, which reads each firm's job source
 * (see src/data/jobSources.ts) and reconciles the result against this array.
 * Hand edits are lost on the next run; change the source or the classifier
 * instead.
 *
 * Dates are the real posting dates reported by each source, stored as static
 * ISO strings. They are deliberately not computed relative to "now": a listing
 * does not get younger because the page was rebuilt.
 */

/** ISO date of the last successful refresh. Surfaced in the app footer. */
export const JOBS_LAST_UPDATED = '${esc(lastUpdated)}';

export type Job = {
  id: string;
  firmId: string;
  title: string;
  discipline: Discipline;
  seniority: Seniority;
  postedAt: string; // ISO date
  /** First seen in the most recent refresh — drives the "new" marker. */
  agentFound?: boolean;
};

export const JOBS: Job[] = [
${rows}
];
`;
}
