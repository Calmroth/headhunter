---
name: jobs-refresher
description: >-
  Refreshes the JOBS list and FIRMS roster against live source data. For every
  firm in src/data/firms.ts, scrapes the firm's careers page (using websiteFor)
  and reconciles src/data/jobs.ts: adds newly-posted roles, removes filled or
  withdrawn ones, and updates postedAt where the listing carries a fresher
  date. Also stamps JOBS_LAST_UPDATED with today's ISO date. Run this on a
  recurring schedule (recommended: daily). Idempotent: if no changes are
  found, only the timestamp is updated.
tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebFetch
  - WebSearch
  - Bash
  - Agent
---

> **SUPERSEDED — the daily refresh no longer uses this agent.**
>
> `npm run refresh:jobs` does the same job deterministically: it reads each
> firm's recorded source from `src/data/jobSources.ts`, fetches the postings
> over plain HTTP, maps titles with the table in `scripts/lib/classify.mjs`,
> and reconciles with `scripts/lib/reconcile.mjs`. No API key, no model, no
> cost, and it cannot invent a listing. `npm run discover:jobs` refills the
> source registry and is deterministic too.
>
> Use this agent only for judgement work the pipeline deliberately refuses:
> deciding whether an unusual title deserves a new taxonomy entry, or working
> out where a firm publishes openings when probing finds nothing. Do not use
> it to write `src/data/jobs.ts` — that file is generated.


# Jobs Refresher

You refresh `src/data/jobs.ts` and `src/data/firms.ts` against live careers
pages so the map always shows real current openings.

## Inputs

1. `src/data/firms.ts` — authoritative firm list.
2. `src/data/websites.ts` — firm-id → careers-page-bearing URL.
3. `src/data/jobs.ts` — current Job list to reconcile against.
4. `src/data/taxonomy.ts` — valid Discipline and Seniority strings.

## Per-firm task

For each firm in FIRMS:

1. Resolve `websiteFor(firm.id)`. Fetch `${url}/careers` or `${url}/jobs` or
   `${url}/about/careers`. If 404, fall back to a site-search:
   `careers OR jobs site:<host>`. Cache the discovered careers URL inline as
   a comment in `websites.ts` if it differs from the homepage.
2. Extract role postings. For each:
   - title (string)
   - discipline (must map to Discipline enum; if unmappable, skip)
   - seniority (must map to Seniority enum; default `mid` if absent)
   - postedAt (ISO date; if absent, use today)
3. Build the canonical `Job` shape:
   ```ts
   { id: `${firmId}-${slug(title)}`, firmId, title, discipline, seniority,
     postedAt }
   ```
4. Compare against existing `JOBS.filter(j => j.firmId === firmId)`:
   - **Add**: roles in live list, not in JOBS.
   - **Keep**: roles in both. Refresh `postedAt` only if the new date is
     materially newer (>7 days).
   - **Remove**: roles in JOBS, not in live list. Delete unless the firm's
     careers page failed to load (status != 200) — in that case, keep the
     existing entries and log a warning.

## Reconciliation

Run all firm refreshes in parallel using sub-agents (1 per firm) to keep wall
time under 5 minutes. Each sub-agent returns a partial diff. Merge diffs into
a single rewrite of `JOBS`.

## Output

Rewrite `src/data/jobs.ts`:
- Preserve the file's existing header, helpers, type definitions, and
  `JOBS_LAST_UPDATED` constant.
- Update `JOBS_LAST_UPDATED` to today's ISO date.
- Replace the `JOBS` array with the reconciled list, preserving array shape
  and key ordering.

Run `npx tsc --noEmit` after writing. If type errors appear, repair them
(usually a discipline or seniority mismatch) before completing.

## Reporting

Print a single-screen summary:

```
JOBS REFRESH @ <ISO date>
  + N added (firm-id: title)
  ~ N updated (firm-id: title)
  - N removed (firm-id: title)
  ! N firms unreachable (firm-id, reason)
Total live: N
```

## Scheduling

This agent is designed to be invoked by `/schedule` (see the schedule skill)
on a daily cron, e.g. `0 6 * * *`. Once scheduled, no human intervention is
needed unless a firm's careers page changes structure enough to break parsing.
