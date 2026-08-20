/**
 * Where each firm publishes its openings, in machine-readable form.
 *
 * GENERATED FILE — written by `npm run discover:jobs`.
 *
 * This registry is the whole reason the daily refresh costs nothing. The old
 * pipeline paid a language model to answer "where does this firm list jobs?"
 * for every firm on every run; the answer changes maybe once a year. Recorded
 * here, the daily job becomes plain HTTP against a known endpoint.
 *
 * Discovery is itself deterministic: it probes the applicant-tracking systems
 * this market actually uses, derives candidate tenant slugs from each firm's
 * domain, and records only what returned real postings. Nothing in here is a
 * guess — `verifiedAt` is the date a live response was successfully parsed.
 *
 * `kind: 'none'` means discovery found no machine-readable source. Those firms
 * keep whatever listings they already have; they are not silently emptied.
 */

export type JobSourceKind =
  | 'greenhouse'
  | 'lever'
  | 'ashby'
  | 'recruitee'
  | 'smartrecruiters'
  | 'workable'
  | 'teamtailor'
  /** Careers page carrying schema.org JobPosting markup. */
  | 'jsonld'
  /** Nothing machine-readable found. */
  | 'none';

export type JobSource = {
  kind: JobSourceKind;
  /** The exact endpoint or page that verified. Absent for `none`. */
  url?: string;
  /** ATS tenant slug, when the kind is an ATS. */
  slug?: string;
  /** ISO date a live response was last parsed successfully. */
  verifiedAt?: string;
  /** Why nothing was recorded, when kind is `none`. */
  note?: string;
};

/** Keyed by firm id. Empty until `npm run discover:jobs` has run. */
export const JOB_SOURCES: Record<string, JobSource> = {};
