import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-07-02';

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

export const JOBS: Job[] = [
  // ── Band A: pure creative studios ─────────────────────────────────────────
  // Kept entries from previous cycle — careers pages returned 403 or were
  // JS-gated; unable to confirm removal, so preserving conservatively.

  // London
  { id: 'j-17', firmId: 'pentagram', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: hoursAgo(10), agentFound: true },
  { id: 'j-18', firmId: 'pentagram', title: 'Mid Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(2) },
  { id: 'j-20', firmId: 'wolff-olins', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'j-23', firmId: 'the-mill', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-24', firmId: 'the-mill', title: 'CG Lead, Commercials', discipline: 'CG Generalist', seniority: 'Lead', postedAt: daysAgo(8) },
  { id: 'j-25', firmId: 'mpc', title: 'Concept Artist', discipline: 'Concept Artist', seniority: 'Senior', postedAt: daysAgo(2) },

  // United States
  { id: 'j-33', firmId: 'collins', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-35', firmId: 'mother-design', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-37', firmId: 'instrument', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-38', firmId: 'instrument', title: 'Lead 3D Artist', discipline: '3D Artist', seniority: 'Lead', postedAt: daysAgo(5) },
  { id: 'j-39', firmId: 'manual', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(8) },
  { id: 'j-40', firmId: 'character-sf', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(4) },

  // Canada
  { id: 'j-42', firmId: 'sid-lee', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(7) },

  // Australia
  { id: 'j-43', firmId: 'method', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: daysAgo(2) },

  // Iceland
  { id: 'j-45', firmId: 'ueno', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(6) },

  // ── Band C: engineering / IT consultancy (kept agentFound entry) ───────────
  { id: 'j-48', firmId: 'afry-stockholm', title: 'UX Designer, Industry Digital', discipline: 'UX Designer', seniority: 'Mid', postedAt: hoursAgo(18), agentFound: true },

  // ── Cinode roster — live-scraped 2026-07-02 ────────────────────────────────
  // Firms with confirmed open design roles: consid, hiq, nitor, knightec, hm, twoday
  // Remaining Cinode firms checked; no matching creative/design vacancies found
  { id: 'j-88', firmId: 'consid', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-89', firmId: 'hiq', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-90', firmId: 'hiq', title: 'UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-91', firmId: 'nitor', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-92', firmId: 'nitor', title: 'Senior Digital Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-93', firmId: 'knightec', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-94', firmId: 'knightec', title: 'Junior UX Designer', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-95', firmId: 'knightec', title: 'UX Designer, Digi-Physical Design', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-96', firmId: 'knightec', title: 'UX / Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-97', firmId: 'hm', title: 'Digital Experience Designer (UX)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-98', firmId: 'twoday', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-99', firmId: 'twoday', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },

  // ── NEW: Band A Nordic/EU studios — live-scraped 2026-07-02 ───────────────

  // Kurppa Hosk (Stockholm) — Teamtailor confirmed 2 open roles
  { id: 'j-100', firmId: 'kurppa-hosk', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-101', firmId: 'kurppa-hosk', title: 'Junior Brand Designer', discipline: 'Brand Designer', seniority: 'Junior', postedAt: '2026-07-02', agentFound: true },

  // Goodbye Kansas (Stockholm) — Teamtailor confirmed 2 open roles
  { id: 'j-102', firmId: 'goodbye-kansas', title: 'Realtime Artist — General Application', discipline: '3D Artist', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-103', firmId: 'goodbye-kansas', title: 'Crowd FX Artist', discipline: 'CG Generalist', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },

  // Bakken & Bæck (Oslo) — Teamtailor confirmed 7 open roles
  { id: 'j-104', firmId: 'bakken-baeck', title: 'Freelance — Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-105', firmId: 'bakken-baeck', title: 'Freelance — Senior Digital Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-106', firmId: 'bakken-baeck', title: 'Freelance — Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-107', firmId: 'bakken-baeck', title: 'Product Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-108', firmId: 'bakken-baeck', title: 'Freelance — Product Designers', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-109', firmId: 'bakken-baeck', title: 'Lead Product Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-110', firmId: 'bakken-baeck', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },

  // Mutabor (Hamburg) — Personio board confirmed 6 open roles
  { id: 'j-111', firmId: 'mutabor', title: 'Art Director (f/m/d)', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-112', firmId: 'mutabor', title: 'Senior Art Director & Senior Copywriter (f/m/d)', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-113', firmId: 'mutabor', title: 'Designer – Schwerpunkt Kommunikation im Raum (f/m/d)', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-114', firmId: 'mutabor', title: 'Senior Designer (f/m/d)', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-115', firmId: 'mutabor', title: 'Senior Type Designer (f/m/d)', discipline: 'Type Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-116', firmId: 'mutabor', title: 'Senior Brand Designer – Schwerpunkt Sport & Lifestyle (f/m/d)', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },

  // Edenspiekermann (Berlin) — confirmed 1 live role; others 404
  { id: 'j-117', firmId: 'edenspiekermann', title: 'Senior UI/UX Designer (m/f/x)', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },

  // Random Studio (Amsterdam) — confirmed "Medior Graphic Designer" active (reposted)
  { id: 'j-118', firmId: 'random-studio', title: 'Medior Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },

  // ── NEW: Band A UK/US studios — live-scraped 2026-07-02 ───────────────────

  // Wolff Olins (London) — Design Director confirmed live
  { id: 'j-119', firmId: 'wolff-olins', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-02', agentFound: true },

  // DN&Co (London) — Senior Brand and Motion Designer confirmed live
  { id: 'j-120', firmId: 'dn-co', title: 'Senior Brand and Motion Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },

  // Gretel (New York) — Senior Designer confirmed live
  { id: 'j-121', firmId: 'gretel', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },

  // Metalab (Victoria, BC) — 2 roles confirmed live
  { id: 'j-122', firmId: 'metalab', title: 'Design Specialist, Studio', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-123', firmId: 'metalab', title: 'Principal Product Designer', discipline: 'UI Designer', seniority: 'Principal', postedAt: '2026-07-02', agentFound: true },

  // Sid Lee (Montreal) — Graphic Designer confirmed live (posted 2026-03-06)
  { id: 'j-124', firmId: 'sid-lee', title: 'Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-03-06', agentFound: true },

  // For The People (Sydney) — Design Director confirmed live
  { id: 'j-125', firmId: 'for-the-people', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-02', agentFound: true },

  // Frontify (St. Gallen) — Principal Product Designer confirmed live
  { id: 'j-126', firmId: 'frontify-creative', title: 'Principal Product Designer, Design Systems', discipline: 'UI Designer', seniority: 'Principal', postedAt: '2026-07-02', agentFound: true },

  // ── NEW: Band B global enterprise consultancies — live-scraped 2026-07-02 ──

  // Accenture Song (London) — 2 roles confirmed live
  { id: 'j-127', firmId: 'accenture-song-london', title: 'Cross Brand Art Director / Designer', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-128', firmId: 'accenture-song-london', title: 'Associate Creative Director – Art', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },

  // Deloitte Digital (New York) — 2 roles confirmed live
  { id: 'j-129', firmId: 'deloitte-digital-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-130', firmId: 'deloitte-digital-newyork', title: 'UI/UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },

  // Deloitte Digital (London) — confirmed live
  { id: 'j-131', firmId: 'deloitte-digital-london', title: 'UX Designer – Consultant', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },

  // Deloitte Digital (Stockholm) — confirmed live (posted 2026-02-20)
  { id: 'j-132', firmId: 'deloitte-digital-stockholm', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-02-20', agentFound: true },

  // frog (London) — 2 roles confirmed live
  { id: 'j-133', firmId: 'frog-london', title: 'Creative Director, Brand', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-134', firmId: 'frog-london', title: 'Product Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-02', agentFound: true },

  // frog (Munich) — confirmed live
  { id: 'j-135', firmId: 'frog-munich', title: 'Senior Experience Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },

  // IBM iX (New York) — confirmed live
  { id: 'j-136', firmId: 'ibm-ix-newyork', title: 'UI/UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },

  // Publicis Sapient (New York) — confirmed live
  { id: 'j-137', firmId: 'publicis-sapient-newyork', title: 'Creative Director – Experience Design', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-02', agentFound: true },

  // Publicis Sapient (London) — confirmed live
  { id: 'j-138', firmId: 'publicis-sapient-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },

  // EY-Doberman (New York) — 2 roles confirmed live (posted 2026-04-21)
  { id: 'j-139', firmId: 'ey-doberman-newyork', title: 'Studio+ Experience Designer, Senior – UX/UI', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-04-21', agentFound: true },
  { id: 'j-140', firmId: 'ey-doberman-newyork', title: 'Studio+ Experience Design Director – UX/UI', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-04-21', agentFound: true },

  // Capgemini Invent / frog (Paris) — 2 roles confirmed live
  { id: 'j-141', firmId: 'capgemini-invent-paris', title: 'frog – UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-142', firmId: 'capgemini-invent-paris', title: 'frog – Experience Designer Junior', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-07-02', agentFound: true },

  // Sopra Steria (Paris) — 3 roles confirmed live
  { id: 'j-143', firmId: 'sopra-steria-paris', title: 'Lead UX/UI Designer – Aeroline', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-144', firmId: 'sopra-steria-paris', title: 'UX/UI Designer confirmé – Editeur de logiciels', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-145', firmId: 'sopra-steria-paris', title: 'UX/UI Designer expérimenté – BL Solutions', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },

  // ── NEW: Band C engineering/IT consultancies — live-scraped 2026-07-02 ─────

  // AFRY (Gothenburg) — confirmed live
  { id: 'j-146', firmId: 'afry-gothenburg', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },

  // Nexer (Gothenburg) — confirmed live
  { id: 'j-147', firmId: 'nexer-gothenburg', title: 'Senior UX/UI Designer med AD-profil', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },

  // TietoEVRY (Stockholm) — 2 roles confirmed live
  { id: 'j-148', firmId: 'tietoevry-stockholm', title: 'Senior UX/UI Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-149', firmId: 'tietoevry-stockholm', title: 'UX/UI Designer – Tieto Banktech', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },

  // Visma (Oslo) — confirmed live
  { id: 'j-150', firmId: 'visma-oslo', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-02', agentFound: true },

  // Cognizant (New York) — confirmed live (posted 2026-06-08)
  { id: 'j-151', firmId: 'cognizant-newyork', title: 'Digital Product Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-08', agentFound: true },

  // Infosys WongDoody (London) — 2 roles confirmed live
  { id: 'j-152', firmId: 'infosys-wongdoody-london', title: 'Creative Director – Visual Design', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-02', agentFound: true },
  { id: 'j-153', firmId: 'infosys-wongdoody-london', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-02', agentFound: true },
];
