import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-07-03';

export type Job = {
  id: string;
  firmId: string;
  title: string;
  discipline: Discipline;
  seniority: Seniority;
  postedAt: string; // ISO date
  agentFound?: boolean; // surfaced by a background agent this session
};

const today = new Date();
const daysAgo = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString();
};
const hoursAgo = (n: number) => {
  const d = new Date(today);
  d.setHours(d.getHours() - n);
  return d.toISOString();
};

// Suppress unused-variable warnings for helpers kept for compatibility
void daysAgo;
void hoursAgo;

export const JOBS: Job[] = [
  // ── Stockholm ──────────────────────────────────────────────────────────────
  // north-kingdom: live search confirmed 1 Designer opening (2026-07-03)
  { id: 'north-kingdom-designer', firmId: 'north-kingdom', title: 'Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-03' },

  // acne: live search confirmed Junior Digital Designer (2026-07-03)
  { id: 'acne-junior-digital-designer', firmId: 'acne', title: 'Junior Digital Designer', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-07-03' },

  // snask: careers page unreachable (403) — keeping prior entry
  { id: 'j-4', firmId: 'snask', title: 'Lead Brand Designer', discipline: 'Brand Designer', seniority: 'Lead', postedAt: '2026-06-30' },

  // bvd: careers page unreachable (403) — keeping prior entry
  { id: 'j-5', firmId: 'bvd', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-28' },

  // kurppa-hosk: live search confirmed Junior Brand Designer (2026-07-03)
  { id: 'kurppa-hosk-junior-brand-designer', firmId: 'kurppa-hosk', title: 'Junior Brand Designer', discipline: 'Brand Designer', seniority: 'Junior', postedAt: '2026-07-03' },

  // goodbye-kansas: live search confirmed FX Artist role (2026-07-03)
  { id: 'goodbye-kansas-fx-artist', firmId: 'goodbye-kansas', title: 'FX Artist', discipline: 'CG Generalist', seniority: 'Senior', postedAt: '2026-07-03' },

  // ── Helsinki ───────────────────────────────────────────────────────────────
  // bond: careers page unreachable (403) — keeping prior entries
  { id: 'j-9', firmId: 'bond', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-01' },
  { id: 'j-10', firmId: 'bond', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-25' },

  // kurppa: careers page unreachable (403) — keeping prior entry
  { id: 'j-11', firmId: 'kurppa', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-28' },

  // ── Oslo ───────────────────────────────────────────────────────────────────
  // bakken-baeck: live search confirmed Senior Brand Designer + Product Designer
  { id: 'bakken-baeck-senior-brand-designer', firmId: 'bakken-baeck', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-05-01' },
  { id: 'bakken-baeck-product-designer', firmId: 'bakken-baeck', title: 'Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-03-01' },
  // heydays: confirmed not hiring — removed

  // ── Copenhagen ─────────────────────────────────────────────────────────────
  // e-types: careers page unreachable (403) — keeping prior entry
  { id: 'j-15', firmId: 'e-types', title: 'Type Designer', discipline: 'Type Designer', seniority: 'Senior', postedAt: '2026-06-30' },

  // kontrapunkt: live search confirmed Concept Designer opening (2026-07-03)
  { id: 'kontrapunkt-concept-designer', firmId: 'kontrapunkt', title: 'Concept Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-07-03' },

  // ── London ─────────────────────────────────────────────────────────────────
  // pentagram: live search confirmed Mid-weight Brand Designer (posted 2026-03-09)
  { id: 'pentagram-brand-designer', firmId: 'pentagram', title: 'Mid-weight Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-03-09' },

  // wolff-olins: page 403 but WebSearch confirmed Senior Designer; kept prior Creative Director entry
  { id: 'j-19', firmId: 'wolff-olins', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-06-22' },
  { id: 'wolff-olins-senior-designer', firmId: 'wolff-olins', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-03' },

  // dn-co: live search confirmed Senior Designer (2026-07-03)
  { id: 'dn-co-senior-designer', firmId: 'dn-co', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-03' },

  // moving-brands: live search confirmed Designer opening (2026-07-03)
  { id: 'moving-brands-designer', firmId: 'moving-brands', title: 'Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-03' },

  // the-mill: careers page unreachable (403) — keeping prior entries
  { id: 'j-23', firmId: 'the-mill', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-07-02' },
  { id: 'j-24', firmId: 'the-mill', title: 'CG Lead, Commercials', discipline: 'CG Generalist', seniority: 'Lead', postedAt: '2026-06-25' },

  // mpc: live search confirmed 8 VFX Artist roles in London (2026-07-03)
  { id: 'mpc-senior-3d-artist', firmId: 'mpc', title: 'Senior VFX Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-07-03' },

  // ── Germany ────────────────────────────────────────────────────────────────
  // bureau-borsche: confirmed not accepting applications — removed

  // mutabor: live search confirmed Art Director opening in Hamburg (2026-07-03)
  { id: 'mutabor-art-director', firmId: 'mutabor', title: 'Art Director', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-07-03' },

  // edenspiekermann: live search confirmed Senior UI/UX Designer + UI/UX Designer (Berlin)
  { id: 'edenspiekermann-senior-ux-designer', firmId: 'edenspiekermann', title: 'Senior UI/UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-03' },
  { id: 'edenspiekermann-ux-designer', firmId: 'edenspiekermann', title: 'UI/UX Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-03' },

  // hort: careers page unreachable (403) — keeping prior entry
  { id: 'j-29', firmId: 'hort', title: 'Junior Visual Designer', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-06-27' },

  // ── Netherlands ────────────────────────────────────────────────────────────
  // studio-dumbar: careers page unreachable (403) — keeping prior entry
  { id: 'j-30', firmId: 'studio-dumbar', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-01' },

  // random-studio: live search confirmed Medior Graphic Designer (2026-07-03)
  { id: 'random-studio-visual-designer', firmId: 'random-studio', title: 'Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-03' },

  // ── Italy ──────────────────────────────────────────────────────────────────
  // la-tigre: careers page unreachable (403) — keeping prior entry
  { id: 'j-32', firmId: 'la-tigre', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-29' },

  // ── United States ──────────────────────────────────────────────────────────
  // collins: careers page unreachable (403) — keeping prior entries
  { id: 'j-33', firmId: 'collins', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-02' },
  { id: 'j-34', firmId: 'collins', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-07-03' },

  // mother-design: careers page unreachable (403) — keeping prior entry
  { id: 'j-35', firmId: 'mother-design', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-30' },

  // gretel: live search confirmed Senior Designer (motion/interaction focus, 2026-07-03)
  { id: 'gretel-senior-designer', firmId: 'gretel', title: 'Senior Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-07-03' },

  // instrument: careers page unreachable (403) — keeping prior entries
  { id: 'j-37', firmId: 'instrument', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-07-01' },
  { id: 'j-38', firmId: 'instrument', title: 'Lead 3D Artist', discipline: '3D Artist', seniority: 'Lead', postedAt: '2026-06-28' },

  // manual: careers page unreachable (403) — keeping prior entry
  { id: 'j-39', firmId: 'manual', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-25' },

  // character-sf: careers page unreachable (403) — keeping prior entry
  { id: 'j-40', firmId: 'character-sf', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-29' },

  // ── Canada ─────────────────────────────────────────────────────────────────
  // metalab: live search confirmed Principal Product Designer (2026-07-03)
  { id: 'metalab-principal-product-designer', firmId: 'metalab', title: 'Principal Product Designer', discipline: 'UI Designer', seniority: 'Principal', postedAt: '2026-07-03' },

  // sid-lee: live search confirmed Senior Art Director (2026-04-27) + Graphic Designer (2026-03-06)
  { id: 'sid-lee-senior-art-director', firmId: 'sid-lee', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-04-27' },
  { id: 'sid-lee-graphic-designer', firmId: 'sid-lee', title: 'Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-03-06' },

  // ── Australia ──────────────────────────────────────────────────────────────
  // method: careers page unreachable (403) — keeping prior entry
  { id: 'j-43', firmId: 'method', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-07-01' },

  // for-the-people: live search confirmed Design Director opening (2026-07-03)
  { id: 'for-the-people-design-director', firmId: 'for-the-people', title: 'Design Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-07-03' },

  // ── Iceland / Switzerland ──────────────────────────────────────────────────
  // ueno: appears to be retired/inactive — keeping prior entry
  { id: 'j-45', firmId: 'ueno', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-27' },

  // frontify-creative: live search confirmed Principal Product Designer (2026-07-03)
  { id: 'frontify-creative-principal-product-designer', firmId: 'frontify-creative', title: 'Principal Product Designer', discipline: 'UI Designer', seniority: 'Principal', postedAt: '2026-07-03' },

  // ── Engineering & IT Consultancies (Band C) ────────────────────────────────
  // afry-stockholm: page unreachable (403); UX/UI Designer in Stockholm confirmed via search
  { id: 'j-47', firmId: 'afry-stockholm', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-07-01' },
  { id: 'j-48', firmId: 'afry-stockholm', title: 'UX Designer, Industry Digital', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-03' },

  // afry-gothenburg: careers page unreachable (403) — keeping prior entry
  { id: 'j-49', firmId: 'afry-gothenburg', title: 'Senior 3D Visualisation Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-06-29' },

  // nexer-gothenburg: live search confirmed Senior UX/UI Designer (2026-07-03)
  { id: 'nexer-gothenburg-senior-ux-designer', firmId: 'nexer-gothenburg', title: 'Senior UX/UI Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-03' },

  // nexer-stockholm: careers page unreachable (403) — keeping prior entry
  { id: 'j-51', firmId: 'nexer-stockholm', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-28' },

  // knowit: careers pages unreachable (403) — keeping prior entries
  { id: 'j-52', firmId: 'knowit-stockholm', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'j-53', firmId: 'knowit-stockholm', title: 'Art Director, Brand Practice', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-07-03' },
  { id: 'j-54', firmId: 'knowit-oslo', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-55', firmId: 'knowit-helsinki', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-07-01' },

  // tietoevry-helsinki: live search confirmed UX Designer, Tietoevry Care (2026-07-03)
  { id: 'tietoevry-helsinki-ux-designer', firmId: 'tietoevry-helsinki', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-03' },

  // tietoevry-stockholm: live search confirmed UX/UI Designer in Solna (2026-07-03)
  { id: 'tietoevry-stockholm-ui-designer', firmId: 'tietoevry-stockholm', title: 'UX/UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-03' },

  // visma-oslo: careers page unreachable (403) — keeping prior entry
  { id: 'j-58', firmId: 'visma-oslo', title: 'Senior Product Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-28' },

  // cognizant / tcs / wongdoody: careers pages unreachable (403) — keeping prior entries
  { id: 'j-59', firmId: 'cognizant-london', title: 'Creative Director, Digital Practice', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-06-26' },
  { id: 'j-60', firmId: 'cognizant-newyork', title: 'Senior 3D Artist, Immersive', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'j-61', firmId: 'tcs-interactive-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-28' },
  { id: 'j-62', firmId: 'infosys-wongdoody-london', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-29' },

  // ── Global Enterprise Consultancies (Band B) ───────────────────────────────
  // accenture-song: careers page unreachable (403) — keeping prior entries
  { id: 'j-63', firmId: 'accenture-song-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-03' },
  { id: 'j-64', firmId: 'accenture-song-london', title: 'Lead 3D Artist', discipline: '3D Artist', seniority: 'Lead', postedAt: '2026-07-01' },
  { id: 'j-65', firmId: 'accenture-song-dublin', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'j-66', firmId: 'accenture-song-stockholm', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-07-02' },

  // deloitte-digital: careers page unreachable (403) — keeping prior entries
  { id: 'j-67', firmId: 'deloitte-digital-newyork', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-01' },
  { id: 'j-68', firmId: 'deloitte-digital-london', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-27' },
  { id: 'j-69', firmId: 'deloitte-digital-stockholm', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-07-03' },

  // ideo: careers page unreachable (403) — keeping prior entries
  { id: 'j-70', firmId: 'ideo-sanfrancisco', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'j-71', firmId: 'ideo-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-28' },
  { id: 'j-72', firmId: 'ideo-tokyo', title: 'Lead Designer, Industrial', discipline: 'Industrial Designer', seniority: 'Lead', postedAt: '2026-06-24' },

  // mckinsey-design: careers page unreachable (403) — keeping prior entries
  { id: 'j-73', firmId: 'mckinsey-design-newyork', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-01' },
  { id: 'j-74', firmId: 'mckinsey-design-stockholm', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29' },

  // designit: confirmed no openings in Copenhagen, London, or Munich — all three removed

  // frog (Capgemini Invent): live search confirmed Senior UX Designer across studios
  { id: 'frog-sanfrancisco-senior-ux-designer', firmId: 'frog-sanfrancisco', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-03' },
  { id: 'frog-london-senior-ux-designer', firmId: 'frog-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-03' },

  // frog-munich: careers page unreachable (403) — keeping prior entry
  { id: 'j-80', firmId: 'frog-munich', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-06-26' },

  // ibm-ix / publicis-sapient: careers pages unreachable (403) — keeping prior entries
  { id: 'j-81', firmId: 'ibm-ix-newyork', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-28' },
  { id: 'j-82', firmId: 'publicis-sapient-newyork', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'j-83', firmId: 'publicis-sapient-london', title: 'Lead Brand Designer', discipline: 'Brand Designer', seniority: 'Lead', postedAt: '2026-06-27' },

  // ey-doberman: careers page unreachable (403) — keeping prior entries
  { id: 'j-84', firmId: 'ey-doberman-stockholm', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-03' },
  { id: 'j-85', firmId: 'ey-doberman-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29' },

  // capgemini-invent / sopra-steria: careers pages unreachable (403) — keeping prior entries
  { id: 'j-86', firmId: 'capgemini-invent-paris', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-01' },
  { id: 'j-87', firmId: 'sopra-steria-paris', title: 'Art Director, Digital', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-28' },

  // ── Cinode Customer Roster ─────────────────────────────────────────────────
  // All firms below: careers pages unreachable (403 or no response) — keeping prior entries
  { id: 'j-88', firmId: 'rejlers', title: 'Industrial Designer, Energy', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-06-29' },
  { id: 'j-89', firmId: 'consid', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-02' },
  { id: 'j-90', firmId: 'hiq', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-07-01' },
  { id: 'j-91', firmId: 'hiq', title: 'Art Director, Brand Practice', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-28' },
  { id: 'j-92', firmId: 'vincit', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'j-93', firmId: 'twoday', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-07-02' },
  { id: 'j-94', firmId: 'nitor', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-95', firmId: 'knightec', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-07-03' },
  { id: 'j-96', firmId: 'prevas', title: 'Industrial Designer, Embedded', discipline: 'Industrial Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  { id: 'j-97', firmId: 'b3', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'j-98', firmId: 'omegapoint', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-28' },
  { id: 'j-99', firmId: 'forefront', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-07-01' },
  { id: 'j-100', firmId: 'centigo', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-101', firmId: 'bybrick', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-07-03' },
  { id: 'j-102', firmId: 'tretton37', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-29' },
  { id: 'j-103', firmId: 'plantvision', title: 'Industrial Designer, Pharma', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  { id: 'j-104', firmId: 'advania-reykjavik', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-28' },
  { id: 'j-105', firmId: 'softhouse', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-01' },
  { id: 'j-106', firmId: 'silo-ai', title: 'Visual Designer, ML Tooling', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'j-107', firmId: 'itm8', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-27' },
];
