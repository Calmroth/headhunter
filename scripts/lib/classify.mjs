/**
 * Maps a job title onto the closed taxonomy in src/data/taxonomy.ts.
 *
 * This is the one step the old pipeline paid a language model for, and it is
 * the one step that least needs one: job titles in this industry are templated
 * ("Senior 3D Artist", "Lead UX Designer"), and the target vocabulary is 12
 * disciplines by 6 seniorities. A model asked to classify these will be right
 * almost always and confidently wrong the rest of the time, with no signal
 * telling them apart.
 *
 * A table is right or it returns null. Titles that do not map are skipped and
 * reported, never guessed — this roster has a history of synthetic listings,
 * and the cure for that is a classifier that cannot invent.
 */
import { DISCIPLINES, SENIORITIES } from '../../src/data/taxonomy.ts';

/**
 * Discipline patterns, most specific first. Order is load-bearing: "3D Artist"
 * must beat a bare "Artist", "Creative Director" must beat "Art Director"'s
 * looser spellings, and "UX/UI" resolves to UX rather than matching both.
 */
const DISCIPLINE_RULES = [
  // Motion & film crafts — matched before the generic design terms, because
  // "3D Designer" and "Motion Graphic Designer" both end in "designer".
  [/\bcg\s*(generalist|artist)\b/, 'CG Generalist'],
  [/\bcgi\s+generalist\b/, 'CG Generalist'],
  [/\bconcept\s+artist\b/, 'Concept Artist'],
  [/\b3d\s*(artist|generalist|modell?er|designer|visuali[sz]ation)\b/, '3D Artist'],
  [/\bvisuali[sz]ation\s+artist\b/, '3D Artist'],
  [/\b(motion\s+(graphics?\s+)?designer|motion\s+graphics?|animator)\b/, 'Motion Designer'],

  // Creative leadership. These are disciplines here, not seniorities — the
  // seniority table deliberately has no bare "director" rule, so "Art
  // Director" cannot be misread as a head-of role.
  [/\bhead\s+of\s+design\b/, 'Creative Director'],
  [/\bdesign\s+(director|lead)\b/, 'Creative Director'],
  [/\bcreative\s+director\b/, 'Creative Director'],
  [/\becd\b/, 'Creative Director'],
  [/\bart\s+director\b/, 'Art Director'],

  [/\btype(face)?\s+designer\b/, 'Type Designer'],
  [/\bindustrial\s+designer\b/, 'Industrial Designer'],

  // Product/UI/UX. "Product Designer" means interface work in this industry,
  // not industrial design — the existing roster already treats it that way.
  [/\bux\s*\/\s*ui\b/, 'UX Designer'],
  [/\bui\s*\/\s*ux\b/, 'UX Designer'],
  [/\b(ux|user\s+experience|service|interaction)\s+designer\b/, 'UX Designer'],
  [/\bux\s+researcher\b/, 'UX Designer'],
  [/\b(ui|user\s+interface|product|interface)\s+designer\b/, 'UI Designer'],

  [/\b(brand|identity)\s+designer\b/, 'Brand Designer'],
  [/\bbrand\s+identity\b/, 'Brand Designer'],
  [/\b(visual|graphic|digital)\s+designer\b/, 'Visual Designer'],
];

/**
 * Seniority patterns, read straight off the title. Most senior first.
 *
 * Scanning the raw title is safe because no discipline name in the taxonomy
 * contains a seniority word — "Art Director" and "Creative Director" hold no
 * token this table matches, which is why there is no bare "director" rule.
 */
const SENIORITY_RULES = [
  [/\b(head\s+of|chief|vp|vice\s+president|director\s+of|executive)\b/, 'Head of'],
  [/\bprincipal\b/, 'Principal'],
  [/\blead\b/, 'Lead'],
  [/\b(senior|sr\.?)\b/, 'Senior'],
  [/\b(junior|jr\.?|graduate|intern(ship)?|trainee|entry[-\s]level)\b/, 'Junior'],
];

/** Titles that are never a fit for this board, however they classify. */
const EXCLUSIONS = [
  /\b(engineer|developer|architect|devops|data\s+scientist)\b/,
  /\b(account|sales|recruit|finance|payroll|legal|hr)\b/,
  /\bspontaneous\b/,
  /\bopen\s+application\b/,
];

const VALID_DISCIPLINES = new Set(DISCIPLINES);
const VALID_SENIORITIES = new Set(SENIORITIES);

/** Lowercase, collapse whitespace, normalise separators to spaces. */
function normalise(title) {
  return String(title ?? '')
    .toLowerCase()
    .replace(/[–—_|(),[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * @returns {{discipline: string, seniority: string} | null} null when the title
 *   does not map — the caller should skip and report it, not guess.
 */
export function classify(title) {
  const text = normalise(title);
  if (!text) return null;

  for (const pattern of EXCLUSIONS) {
    if (pattern.test(text)) return null;
  }

  let discipline = null;
  for (const [pattern, name] of DISCIPLINE_RULES) {
    if (pattern.test(text)) {
      discipline = name;
      break;
    }
  }
  if (!discipline) return null;

  let seniority = 'Mid';
  for (const [pattern, name] of SENIORITY_RULES) {
    if (pattern.test(text)) {
      seniority = name;
      break;
    }
  }

  // Guard against the table drifting out of sync with the taxonomy.
  if (!VALID_DISCIPLINES.has(discipline) || !VALID_SENIORITIES.has(seniority)) {
    throw new Error(`classify: produced a value outside the taxonomy: ${discipline}/${seniority}`);
  }
  return { discipline, seniority };
}
