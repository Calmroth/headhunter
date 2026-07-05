import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-07-05';

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
  // Stockholm
  // north-kingdom: careers.northkingdom.com reachable; no design roles found — j-108 removed.
  // acne: careers.acnestudios.com reachable; no design roles found — j-3 removed.
  // snask: reachable; no open positions found — j-4 removed.
  // bvd: bvd.se reachable; 2 live roles. Senior Brand Designer (j-5) not in live list — replaced.
  { id: 'j-164', firmId: 'bvd', title: '3D & Motion Designer', discipline: '3D Artist', seniority: 'Mid', postedAt: '2026-07-05' },
  { id: 'j-165', firmId: 'bvd', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  // kurppa-hosk: teamtailor reachable; Senior Brand Designer live. Motion Designer (j-6) not found — replaced.
  { id: 'j-166', firmId: 'kurppa-hosk', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // goodbye-kansas: career.goodbyekansas.com reachable; no design roles found — j-7, j-8 removed.

  // Helsinki
  // bond: thisisbond.com reachable; no design roles found — j-9, j-10 removed.
  // kurppa: kurppa.fi reachable; no design roles found — j-11 removed.

  // Oslo
  // bakken-baeck: bakkenbaeck.com/join reachable; Product Designer, Lead Product Designer, Senior Brand Designer confirmed.
  //   Design Director (j-113) not in live list — removed; Senior Brand Designer added as j-167.
  { id: 'j-111', firmId: 'bakken-baeck', title: 'Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  { id: 'j-112', firmId: 'bakken-baeck', title: 'Lead Product Designer', discipline: 'UI Designer', seniority: 'Lead', postedAt: '2026-07-05' },
  { id: 'j-167', firmId: 'bakken-baeck', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // heydays: reachable; no open positions found — j-14 removed.

  // Copenhagen
  // e-types: e-types.com/careers reachable; no design roles found — j-15 removed.
  // kontrapunkt: kontrapunkt.com/career reachable; no design roles found — j-16 removed.

  // London
  // pentagram: pentagram.com/careers reachable; no design roles found — j-17, j-18 removed.
  // wolff-olins: apply.workable.com/wolff-olins reachable; Creative Director + Design Director (both NYC) confirmed.
  //   Senior Visual Designer (j-20) not in live list — replaced.
  { id: 'j-168', firmId: 'wolff-olins', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-05' },
  { id: 'j-169', firmId: 'wolff-olins', title: 'Design Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-07-05' },
  // dn-co: dnco.com/jobs reachable; Senior Brand Designer (Maternity Cover) confirmed. Brand Designer/Mid (j-21) not found — replaced.
  { id: 'j-170', firmId: 'dn-co', title: 'Senior Brand Designer (Maternity Cover)', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // moving-brands: apply.workable.com/movingbrands reachable; no active listings — j-22 removed (prior session).
  // the-mill: careers.themill.com JS-gated; no design roles confirmed — j-23, j-24 removed.
  // mpc: mpcvfx.com/en/jobs/ JS-rendered; no listings resolved — j-25 removed.

  // Germany
  // bureau-borsche: reachable; explicitly states not accepting applications — j-26 removed.
  // mutabor: Personio portal reachable; 6 live roles confirmed. Previous Senior Brand Designer (j-27) maps to
  //   "Senior Designer" in live list — j-27 kept; 5 additional roles added.
  { id: 'j-27', firmId: 'mutabor', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-171', firmId: 'mutabor', title: 'Art Director', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-07-05' },
  { id: 'j-172', firmId: 'mutabor', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-07-05' },
  { id: 'j-173', firmId: 'mutabor', title: 'Designer – Kommunikation im Raum', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  { id: 'j-174', firmId: 'mutabor', title: 'Senior Type Designer', discipline: 'Type Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  { id: 'j-175', firmId: 'mutabor', title: 'Senior Brand Designer – Sport & Lifestyle', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // edenspiekermann: edenspiekermann.com/jobs reachable; 7 roles confirmed. Previous j-109, j-110 replaced with full list.
  { id: 'j-176', firmId: 'edenspiekermann', title: 'Senior Brand / Visual Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  { id: 'j-177', firmId: 'edenspiekermann', title: 'Senior UI/UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  { id: 'j-178', firmId: 'edenspiekermann', title: 'Senior Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  { id: 'j-179', firmId: 'edenspiekermann', title: 'Senior Interaction Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  { id: 'j-180', firmId: 'edenspiekermann', title: 'Digital Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  { id: 'j-181', firmId: 'edenspiekermann', title: 'Senior Conceptual Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  { id: 'j-182', firmId: 'edenspiekermann', title: 'Design Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-07-05' },
  // hort: hort.org.uk/info/ reachable; explicitly states no positions and no intern programme — j-29 removed.

  // Netherlands
  // studio-dumbar: studiodumbar.com/jobs reachable; only internship tracks — j-30 removed.
  // random-studio: random.studio reachable; 2 live roles. Creative Technologist (j-31) not in live list — replaced.
  { id: 'j-183', firmId: 'random-studio', title: 'Senior Spatial Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  { id: 'j-184', firmId: 'random-studio', title: 'Medior Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-05' },

  // Italy
  // la-tigre: returned HTTP 429 (rate-limited) — page unreachable; j-32 kept.
  { id: 'j-32', firmId: 'la-tigre', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(4) },

  // United States
  // collins: reachable; /jobs/ returns 404 and cached listing removed — j-33 removed.
  // mother-design: reachable; all listings closed (2021/2023) — j-35 removed.
  // gretel: gretelny.com/openings reachable; Senior Designer confirmed. Motion Designer (j-36) not found — replaced.
  { id: 'j-185', firmId: 'gretel', title: 'Senior Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // instrument: reachable; Design Director, Product Design confirmed — j-114 kept.
  { id: 'j-114', firmId: 'instrument', title: 'Design Director, Product Design', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-07-05' },
  // manual: reachable; no full-time positions — j-39 removed (prior session).
  // character-sf: character-sf.com returned HTTP 500 — page unreachable; j-40 kept.
  { id: 'j-40', firmId: 'character-sf', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(4) },

  // Canada
  // metalab: reachable; 7 live design roles (j-115 through j-121).
  { id: 'j-115', firmId: 'metalab', title: 'Executive Design Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-07-05' },
  { id: 'j-116', firmId: 'metalab', title: 'Design Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-07-05' },
  { id: 'j-117', firmId: 'metalab', title: 'Brand Director', discipline: 'Brand Designer', seniority: 'Lead', postedAt: '2026-07-05' },
  { id: 'j-118', firmId: 'metalab', title: 'Design Lead', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-07-05' },
  { id: 'j-119', firmId: 'metalab', title: 'Principal Product Designer', discipline: 'UI Designer', seniority: 'Principal', postedAt: '2026-07-05' },
  { id: 'j-120', firmId: 'metalab', title: 'AI Native Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  { id: 'j-121', firmId: 'metalab', title: 'Motion Design Specialist', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  // sid-lee: reachable; 3 live listings.
  { id: 'j-42', firmId: 'sid-lee', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(7) },
  { id: 'j-122', firmId: 'sid-lee', title: 'Art Director, Content', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-07-05' },
  { id: 'j-123', firmId: 'sid-lee', title: 'Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-05' },

  // Australia
  // method: reachable; 2 live design roles.
  { id: 'j-124', firmId: 'method', title: 'Senior Product Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  { id: 'j-125', firmId: 'method', title: 'Associate Director, Experience Design', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-07-05' },
  // for-the-people: reachable (LinkedIn); Design Director live.
  { id: 'j-126', firmId: 'for-the-people', title: 'Design Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-07-05' },

  // Iceland, Switzerland
  // ueno: no open positions — j-45 removed (prior session).
  // frontify-creative: reachable; Principal Product Designer live.
  { id: 'j-127', firmId: 'frontify-creative', title: 'Principal Product Designer', discipline: 'UI Designer', seniority: 'Principal', postedAt: '2026-07-05' },

  // Engineering & IT consultancies (Band C) — reconciled 2026-07-05
  // afry-stockholm: reachable; UX/UI Designer confirmed.
  { id: 'j-48', firmId: 'afry-stockholm', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  // afry-gothenburg: reachable; 2 live roles.
  { id: 'j-138', firmId: 'afry-gothenburg', title: 'Material Artist', discipline: '3D Artist', seniority: 'Mid', postedAt: '2026-07-05' },
  { id: 'j-139', firmId: 'afry-gothenburg', title: 'Visualization and Graphical Designer Lead', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-07-05' },
  // nexer-gothenburg: reachable; 3 live UX roles.
  { id: 'j-140', firmId: 'nexer-gothenburg', title: 'Senior UX/UI Designer med AD-profil', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  { id: 'j-141', firmId: 'nexer-gothenburg', title: 'Erfaren Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  { id: 'j-142', firmId: 'nexer-gothenburg', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  // nexer-stockholm: reachable; no design roles found.
  // knowit-stockholm: reachable; no design roles found.
  // knowit-oslo: reachable; Senior UX Designer confirmed.
  { id: 'j-54', firmId: 'knowit-oslo', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  // knowit-helsinki: reachable; no design roles found.
  // tietoevry-helsinki: reachable; Junior UX Designer live.
  { id: 'j-143', firmId: 'tietoevry-helsinki', title: 'Junior UX Designer', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-07-05' },
  // tietoevry-stockholm: reachable; UX/UI Designer live.
  { id: 'j-144', firmId: 'tietoevry-stockholm', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  // visma-oslo: reachable; Senior Product Designer + Product Designer confirmed.
  { id: 'j-58', firmId: 'visma-oslo', title: 'Senior Product Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-145', firmId: 'visma-oslo', title: 'Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  // cognizant-london: reachable; Service Designer live.
  { id: 'j-146', firmId: 'cognizant-london', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  // cognizant-newyork: reachable; Digital Product Designer live.
  { id: 'j-147', firmId: 'cognizant-newyork', title: 'Digital Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-08' },
  // tcs-interactive-london: reachable; no design roles found.
  // infosys-wongdoody-london: reachable; UX Director live.
  { id: 'j-148', firmId: 'infosys-wongdoody-london', title: 'UX Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-07-05' },

  // Global enterprise consultancies (Band B) — reconciled 2026-07-05
  // accenture-song-london: reachable; Visual Design Associate Manager confirmed. j-63, j-64 not in live list — removed.
  { id: 'j-149', firmId: 'accenture-song-london', title: 'Visual Design Associate Manager', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-01' },
  // accenture-song-dublin: reachable; Design System Specialist UX/UI confirmed — j-65 kept.
  { id: 'j-65', firmId: 'accenture-song-dublin', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  // accenture-song-stockholm: reachable; no design jobs found — j-66 removed.
  // deloitte-digital-newyork: reachable; Senior UX Designer confirmed. Senior Brand Designer (j-67) not found — replaced.
  { id: 'j-150', firmId: 'deloitte-digital-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // deloitte-digital-london: reachable; UX Designer – Consultant confirmed. Lead UX Designer (j-68) not found — replaced.
  { id: 'j-163', firmId: 'deloitte-digital-london', title: 'UX Designer – Consultant', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // deloitte-digital-stockholm: reachable; no design jobs found — j-69 removed.
  // ideo-sanfrancisco: Greenhouse reachable; Senior Visual Communication Designer confirmed. j-70 not found — replaced.
  { id: 'j-151', firmId: 'ideo-sanfrancisco', title: 'Senior Visual Communication Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // ideo-london: Greenhouse reachable; Digital Product Director confirmed. j-71 not found — replaced.
  { id: 'j-152', firmId: 'ideo-london', title: 'Digital Product Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-07-05' },
  // ideo-tokyo: Greenhouse reachable; no design roles — j-72 removed.
  // mckinsey-design-newyork: reachable; Senior Experience Designer confirmed. j-73 not found — replaced.
  { id: 'j-153', firmId: 'mckinsey-design-newyork', title: 'Senior Experience Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // mckinsey-design-stockholm: reachable; no design roles found — j-74 removed.
  // designit-copenhagen: reachable; Glassdoor confirmed no current jobs — j-75 removed.
  // designit-london: reachable; Senior Business Designer confirmed. j-76 not found — replaced.
  { id: 'j-154', firmId: 'designit-london', title: 'Senior Business Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // designit-munich: reachable; Senior Service Designer confirmed. j-77 not found — replaced.
  { id: 'j-155', firmId: 'designit-munich', title: 'Senior Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // frog-sanfrancisco: frog.co/careers reachable; Senior Service Designer confirmed. j-78 not found — replaced.
  { id: 'j-156', firmId: 'frog-sanfrancisco', title: 'Senior Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // frog-london: frog.co/careers reachable; 3 live roles. Lead UX Designer (j-79) not found — replaced.
  { id: 'j-157', firmId: 'frog-london', title: 'Creative Director Brand', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-05' },
  { id: 'j-158', firmId: 'frog-london', title: 'Product Design Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-07-05' },
  { id: 'j-159', firmId: 'frog-london', title: 'Midweight Product Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  // frog-munich: frog.co/careers reachable; Senior Experience Designer confirmed. j-80 not found — replaced.
  { id: 'j-160', firmId: 'frog-munich', title: 'Senior Experience Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // ibm-ix-newyork: reachable; Senior UX Designer confirmed. j-81 not found — replaced.
  { id: 'j-161', firmId: 'ibm-ix-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // publicis-sapient-newyork: reachable; Sr. Experience (UX) Designer confirmed. j-82 not found — replaced.
  { id: 'j-162', firmId: 'publicis-sapient-newyork', title: 'Sr. Experience (UX) Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // publicis-sapient-london: reachable; no current open jobs confirmed — j-83 removed.
  // ey-doberman-stockholm: EY ATS reachable; no active design roles in Stockholm confirmed — j-84 removed.
  // ey-doberman-newyork: EY ATS reachable; no active design roles in New York confirmed — j-85 removed.
  // capgemini-invent-paris: reachable; all Paris frog jobs confirmed filled — j-86 removed.
  // sopra-steria-paris: careers.soprasteria.fr reachable; Art Director (Direction Artistique) confirmed (June 2026) — j-87 kept.
  { id: 'j-87', firmId: 'sopra-steria-paris', title: 'Art Director, Digital', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-01' },

  // Cinode customer roster — reconciled against live careers pages 2026-07-05
  // rejlers: reachable; no design roles found.
  // consid: reachable; Senior UX Designer confirmed.
  { id: 'j-89', firmId: 'consid', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: hoursAgo(20), agentFound: true },
  // hiq: reachable; Senior UI Designer + UX Designer confirmed.
  { id: 'j-90', firmId: 'hiq', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-128', firmId: 'hiq', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  // vincit: reachable; no design roles found.
  // twoday: reachable; Senior UX Designer live.
  { id: 'j-129', firmId: 'twoday', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-01-11' },
  // nitor: reachable; Senior UX Designer live.
  { id: 'j-130', firmId: 'nitor', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // telia: reachable; Service Designer/Senior live.
  { id: 'j-131', firmId: 'telia', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // knightec: reachable; UX/UI Designer + Senior Interaction Designer live.
  { id: 'j-132', firmId: 'knightec', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  { id: 'j-133', firmId: 'knightec', title: 'Senior Interaction Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // prevas, b3, omegapoint, forefront: reachable; no design roles found.
  // centigo: reachable; Visual Designer/Mid live.
  { id: 'j-136', firmId: 'centigo', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  // bybrick: reachable; no design roles found.
  // tretton37: reachable; Senior UX Designer live.
  { id: 'j-137', firmId: 'tretton37', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // plantvision: reachable; no design roles found.
  // advania-reykjavik: reachable; no design roles found.
  // softhouse: reachable; Senior Front-End Designer live.
  { id: 'j-105', firmId: 'softhouse', title: 'Senior Front-End Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-05' },
  // silo-ai: reachable (AMD site); no creative design roles found.
  // itm8: reachable; no design roles found.
  // hm: reachable; 2 live design roles.
  { id: 'j-134', firmId: 'hm', title: 'Digital Experience Designer (UX)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-05' },
  { id: 'j-135', firmId: 'hm', title: 'Design Manager, Design System', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-07-05' },
];
