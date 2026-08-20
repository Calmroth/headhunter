/**
 * Job-source adapters: where listings live, and how to read them.
 *
 * Every firm in this roster publishes openings somewhere machine-readable —
 * an applicant tracking system with a public JSON board, or a careers page
 * carrying schema.org JobPosting markup (which Google Jobs indexing pushes
 * almost everyone into). Neither needs a language model to read.
 *
 * DESIGN NOTE — why guessing an endpoint here is safe:
 * the URL builders below are *candidates*, not assertions. `discover` probes
 * them and records only the ones that actually return parseable postings. An
 * endpoint that has changed, or that never existed, simply fails to match and
 * the firm falls through to the JSON-LD reader. Nothing downstream trusts a
 * template that was not verified against a live response first.
 */

const USER_AGENT =
  'headhunter-jobs-refresher/1.0 (+https://www.dev-bull.com; contact via repository)';

/** A single normalised opening, before taxonomy classification. */
/** @typedef {{title: string, url?: string, location?: string, postedAt?: string}} RawPosting */

const iso = (value) => {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
};

const asArray = (v) => (Array.isArray(v) ? v : v == null ? [] : [v]);

/**
 * ATS adapters. `candidates(slug)` returns URLs to try, `parse` turns a
 * successful JSON response into postings. A parse that yields zero postings is
 * treated as "not this ATS" during discovery, so a wrong guess cannot stick.
 */
export const ATS = {
  greenhouse: {
    candidates: (slug) => [`https://boards-api.greenhouse.io/v1/boards/${slug}/jobs`],
    parse: (json) =>
      asArray(json?.jobs).map((j) => ({
        title: j?.title,
        url: j?.absolute_url,
        location: j?.location?.name,
        postedAt: iso(j?.updated_at ?? j?.first_published),
      })),
  },

  lever: {
    candidates: (slug) => [`https://api.lever.co/v0/postings/${slug}?mode=json`],
    parse: (json) =>
      asArray(json).map((j) => ({
        title: j?.text,
        url: j?.hostedUrl,
        location: j?.categories?.location,
        postedAt: iso(j?.createdAt),
      })),
  },

  ashby: {
    candidates: (slug) => [`https://api.ashbyhq.com/posting-api/job-board/${slug}`],
    parse: (json) =>
      asArray(json?.jobs).map((j) => ({
        title: j?.title,
        url: j?.jobUrl ?? j?.applyUrl,
        location: j?.location,
        postedAt: iso(j?.publishedAt),
      })),
  },

  recruitee: {
    candidates: (slug) => [`https://${slug}.recruitee.com/api/offers/`],
    parse: (json) =>
      asArray(json?.offers).map((j) => ({
        title: j?.title,
        url: j?.careers_url ?? j?.careers_apply_url,
        location: [j?.city, j?.country].filter(Boolean).join(', ') || undefined,
        postedAt: iso(j?.published_at),
      })),
  },

  smartrecruiters: {
    candidates: (slug) => [
      `https://api.smartrecruiters.com/v1/companies/${slug}/postings?limit=100`,
    ],
    parse: (json) =>
      asArray(json?.content).map((j) => ({
        title: j?.name,
        url: j?.ref ?? j?.applyUrl,
        location: [j?.location?.city, j?.location?.country].filter(Boolean).join(', ') || undefined,
        postedAt: iso(j?.releasedDate),
      })),
  },

  workable: {
    candidates: (slug) => [`https://apply.workable.com/api/v1/widget/accounts/${slug}?details=true`],
    parse: (json) =>
      asArray(json?.jobs).map((j) => ({
        title: j?.title,
        url: j?.url ?? j?.application_url,
        location: [j?.city, j?.country].filter(Boolean).join(', ') || undefined,
        postedAt: iso(j?.published_on),
      })),
  },

  teamtailor: {
    // Teamtailor career sites are the default in the Swedish market. Their
    // public JSON surface is not contractually stable, so both a JSON guess
    // and the site root are offered; whichever verifies wins, and if neither
    // does the JSON-LD reader handles the firm instead.
    candidates: (slug) => [
      `https://${slug}.teamtailor.com/jobs.json`,
      `https://career.${slug}/jobs.json`,
    ],
    parse: (json) =>
      asArray(json?.jobs ?? json?.data).map((j) => ({
        title: j?.title ?? j?.attributes?.title,
        url: j?.url ?? j?.links?.['careersite-job-url'],
        location: j?.location ?? j?.attributes?.['pinned-location'],
        postedAt: iso(j?.['created-at'] ?? j?.attributes?.['created-at']),
      })),
  },
};

export const ATS_KINDS = Object.keys(ATS);

/** Fetch JSON with a timeout and an identifying User-Agent. Returns null on any failure. */
export async function fetchJson(url, { timeoutMs = 15_000 } = {}) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ac.signal,
      headers: { accept: 'application/json', 'user-agent': USER_AGENT },
      redirect: 'follow',
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/** Fetch text (HTML) with the same budget. Returns null on any failure. */
export async function fetchText(url, { timeoutMs = 15_000 } = {}) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ac.signal,
      headers: { accept: 'text/html,application/xhtml+xml', 'user-agent': USER_AGENT },
      redirect: 'follow',
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Pulls schema.org JobPosting objects out of a page's JSON-LD blocks.
 *
 * Handles the three shapes that occur in practice: a bare JobPosting, an array
 * of them, and a `@graph` wrapper. A malformed block is skipped rather than
 * failing the page — career sites frequently ship one broken script tag beside
 * several good ones.
 *
 * @returns {RawPosting[]}
 */
export function extractJsonLdPostings(html) {
  if (!html) return [];
  const blocks = [...html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  )];
  const out = [];

  for (const [, raw] of blocks) {
    let parsed;
    try {
      parsed = JSON.parse(raw.trim());
    } catch {
      continue;
    }
    for (const node of flattenLd(parsed)) {
      if (!isJobPosting(node)) continue;
      out.push({
        title: node.title ?? node.name,
        url: typeof node.url === 'string' ? node.url : undefined,
        location: readLocation(node),
        postedAt: iso(node.datePosted),
      });
    }
  }
  return out;
}

function flattenLd(node, depth = 0) {
  if (depth > 6 || node == null) return [];
  if (Array.isArray(node)) return node.flatMap((n) => flattenLd(n, depth + 1));
  if (typeof node !== 'object') return [];
  const nested = Array.isArray(node['@graph']) ? flattenLd(node['@graph'], depth + 1) : [];
  return [node, ...nested];
}

function isJobPosting(node) {
  const type = node?.['@type'];
  const types = asArray(type).map((t) => String(t).toLowerCase());
  return types.includes('jobposting') && Boolean(node.title ?? node.name);
}

function readLocation(node) {
  const loc = asArray(node.jobLocation)[0];
  const addr = loc?.address ?? loc;
  if (!addr || typeof addr !== 'object') return undefined;
  return (
    [addr.addressLocality, addr.addressCountry?.name ?? addr.addressCountry]
      .filter((v) => typeof v === 'string' && v)
      .join(', ') || undefined
  );
}

/**
 * Candidate careers-page URLs derived from a firm's website. Probed in order
 * during discovery; the first that yields JobPosting markup is recorded.
 */
export function careerPageCandidates(website) {
  let origin;
  try {
    origin = new URL(website).origin;
  } catch {
    return [];
  }
  return [
    `${origin}/careers`,
    `${origin}/jobs`,
    `${origin}/career`,
    `${origin}/about/careers`,
    `${origin}/work-with-us`,
    `${origin}/join-us`,
    origin,
  ];
}

/** Bare hostname of a website, e.g. "https://www.snask.com/x" -> "snask.com". */
export function bareHost(website) {
  try {
    return new URL(website).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

/** Plausible ATS tenant slugs for a firm, derived from its id and domain. */
export function slugCandidates(firmId, website) {
  const host = bareHost(website);
  const fromHost = host ? host.split('.')[0] : null;
  const fromId = firmId.replace(/-(stockholm|london|newyork|oslo|helsinki|munich|paris|dublin|copenhagen|gothenburg|tokyo|sanfrancisco)$/, '');
  return [...new Set([fromHost, fromId, fromId.replace(/-/g, '')].filter(Boolean))];
}
