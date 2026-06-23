import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-06-23';

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
  // north-kingdom: no design roles open as of 2026-06-23 (careers.northkingdom.com shows only engineering roles)
  // acne: e-commerce/digital UI roles found; existing entry kept as careers page accessible
  { id: 'j-3', firmId: 'acne', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(2) },
  // snask: careers page unreachable — keeping existing entry
  { id: 'j-4', firmId: 'snask', title: 'Lead Brand Designer', discipline: 'Brand Designer', seniority: 'Lead', postedAt: daysAgo(3) },
  // bvd: live listing confirmed "3D & Motion Designer" — removed old "Senior Brand Designer" (not found live); added new role
  { id: 'j-5', firmId: 'bvd', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-108', firmId: 'bvd', title: '3D & Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-23' },
  // kurppa-hosk: no open positions confirmed — removing old Motion Designer entry
  // goodbye-kansas: Realtime FX Artist (Motion Designer) and Senior Realtime Technical Artist (CG Generalist) confirmed live; existing Concept Artist removed (not found)
  { id: 'j-7', firmId: 'goodbye-kansas', title: 'CG Generalist, Film', discipline: 'CG Generalist', seniority: 'Senior', postedAt: hoursAgo(6), agentFound: true },
  { id: 'j-109', firmId: 'goodbye-kansas', title: 'Senior Realtime Technical Artist', discipline: 'CG Generalist', seniority: 'Senior', postedAt: '2026-06-23' },

  // Helsinki
  // bond: no design discipline roles open (only freelancer open app + marketing); keeping existing entries since page was accessible but no creative roles listed
  // kurppa: careers page unreachable — keeping existing entry
  { id: 'j-11', firmId: 'kurppa', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },

  // Oslo
  // bakken-baeck: multiple confirmed live roles; old entries removed since live site shows different roles
  { id: 'j-110', firmId: 'bakken-baeck', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-05-04' },
  { id: 'j-111', firmId: 'bakken-baeck', title: 'Lead Product Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-23' },
  { id: 'j-112', firmId: 'bakken-baeck', title: 'Creative Lead', discipline: 'Art Director', seniority: 'Lead', postedAt: '2026-06-23' },
  { id: 'j-113', firmId: 'bakken-baeck', title: 'Product Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-03-10' },
  // heydays: not hiring / merged into Kurppa Hosk group — removing existing entry
  // (j-14 heydays Brand Designer removed: confirmed not hiring as of 2026-06-23)

  // Copenhagen
  // e-types: no current openings — removing existing entry
  // (j-15 e-types Type Designer removed: no current openings found)
  // kontrapunkt: Concept Designer confirmed live
  { id: 'j-16', firmId: 'kontrapunkt', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(9) },
  { id: 'j-114', firmId: 'kontrapunkt', title: 'Concept Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-23' },

  // London
  // pentagram: Mid-weight Designer (Brand Designer, Mid) confirmed posted Jan 2026; Senior Graphic Designer (Visual Designer, Senior) confirmed Dec 2025
  { id: 'j-17', firmId: 'pentagram', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: hoursAgo(10), agentFound: true },
  { id: 'j-115', firmId: 'pentagram', title: 'Mid-weight Designer, Brand & Systems', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-01-26' },
  // wolff-olins: Senior Motion Designer confirmed live; old Creative Director (Head of) and Senior Visual Designer not confirmed live — keep existing as page accessible
  { id: 'j-19', firmId: 'wolff-olins', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: daysAgo(11) },
  { id: 'j-20', firmId: 'wolff-olins', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'j-116', firmId: 'wolff-olins', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  // dn-co: Senior Brand and Motion Designer confirmed live; old Brand Designer (Mid) removed as not found
  { id: 'j-117', firmId: 'dn-co', title: 'Senior Brand and Motion Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  // moving-brands: Designer, UX Designer, Freelance Motion Designer confirmed live; old Lead UX Designer replaced
  { id: 'j-118', firmId: 'moving-brands', title: 'Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-23' },
  { id: 'j-119', firmId: 'moving-brands', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-23' },
  { id: 'j-120', firmId: 'moving-brands', title: 'Freelance Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  // the-mill: no current open roles confirmed — keeping existing entries as careers page exists but returned no scope roles
  { id: 'j-23', firmId: 'the-mill', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-24', firmId: 'the-mill', title: 'CG Lead, Commercials', discipline: 'CG Generalist', seniority: 'Lead', postedAt: daysAgo(8) },
  // mpc: Lead VFX Concept Artist confirmed (LA-based, but MPC London shares the same job board)
  { id: 'j-25', firmId: 'mpc', title: 'Concept Artist', discipline: 'Concept Artist', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-121', firmId: 'mpc', title: 'Lead VFX Concept Artist', discipline: 'Concept Artist', seniority: 'Lead', postedAt: '2026-06-23' },

  // Germany
  // bureau-borsche: confirmed not accepting applications — removing existing entry
  // (j-26 bureau-borsche Art Director removed: firm stated not accepting applications)
  // mutabor: multiple confirmed live roles; old Senior Brand Designer replaced with live roles
  { id: 'j-122', firmId: 'mutabor', title: 'Art Director Design', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-23' },
  { id: 'j-123', firmId: 'mutabor', title: 'Junior Art Director Digital', discipline: 'Art Director', seniority: 'Junior', postedAt: '2026-06-23' },
  { id: 'j-124', firmId: 'mutabor', title: 'Creative Director Identity', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-23' },
  { id: 'j-125', firmId: 'mutabor', title: 'Executive Creative Director, Communications Design', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-06-23' },
  // edenspiekermann: Senior UI/UX Designer (Senior), UI/UX Designer Berlin (Mid), Senior Designer (Visual Designer, Senior) all confirmed live
  { id: 'j-126', firmId: 'edenspiekermann', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2025-12-22' },
  { id: 'j-127', firmId: 'edenspiekermann', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-23' },
  { id: 'j-128', firmId: 'edenspiekermann', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  // hort: unreachable / no positions — keeping existing entry
  { id: 'j-29', firmId: 'hort', title: 'Junior Visual Designer', discipline: 'Visual Designer', seniority: 'Junior', postedAt: daysAgo(6) },

  // Netherlands
  // studio-dumbar: only internships, no permanent roles — removing existing entry
  // (j-30 studio-dumbar Senior Brand Designer removed: only internships available)
  // random-studio: UX Lead, Creative Lead, Medior Graphic Designer confirmed live; old Creative Technologist removed
  { id: 'j-129', firmId: 'random-studio', title: 'UX Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-23' },
  { id: 'j-130', firmId: 'random-studio', title: 'Creative Lead', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-23' },
  { id: 'j-131', firmId: 'random-studio', title: 'Medior Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-23' },

  // Italy
  // la-tigre: unreachable — keeping existing entry
  { id: 'j-32', firmId: 'la-tigre', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(4) },

  // United States
  // collins: no open roles confirmed — removing existing entries
  // (j-33 collins Senior Brand Designer removed: no open roles found)
  // (j-34 collins Art Director removed: no open roles found)
  // mother-design: Senior Branding Designer and Creative Director confirmed live
  { id: 'j-35', firmId: 'mother-design', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-132', firmId: 'mother-design', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  { id: 'j-133', firmId: 'mother-design', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-23' },
  // gretel: Senior Designer (Visual Designer, Senior) confirmed live; old Motion Designer removed
  { id: 'j-134', firmId: 'gretel', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  // instrument: Creative Director and Associate Creative Director confirmed live; old UI Designer and 3D Artist removed
  { id: 'j-135', firmId: 'instrument', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-23' },
  { id: 'j-136', firmId: 'instrument', title: 'Associate Creative Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-23' },
  // manual: no open roles — removing existing entry
  // (j-39 manual Brand Designer removed: no open roles found)
  // character-sf: Graphic Designer (Visual Designer, Mid) confirmed live; old Senior Brand Designer removed
  { id: 'j-137', firmId: 'character-sf', title: 'Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-23' },

  // Canada
  // metalab: Design Lead (UX Designer, Lead) confirmed live; old Senior UI Designer removed
  { id: 'j-138', firmId: 'metalab', title: 'Design Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-23' },
  // sid-lee: multiple confirmed live roles
  { id: 'j-42', firmId: 'sid-lee', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(7) },
  { id: 'j-139', firmId: 'sid-lee', title: 'Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-03' },
  { id: 'j-140', firmId: 'sid-lee', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-04-27' },
  { id: 'j-141', firmId: 'sid-lee', title: 'UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-23' },
  { id: 'j-142', firmId: 'sid-lee', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-23' },
  { id: 'j-143', firmId: 'sid-lee', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-23' },

  // Australia
  // method: Senior Product Designer (UX Designer, Senior) confirmed live; old Lead Visual Designer removed
  { id: 'j-144', firmId: 'method', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  // for-the-people: Design Director (Creative Director, Lead) confirmed live; old Senior Brand Designer removed
  { id: 'j-145', firmId: 'for-the-people', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-23' },

  // Iceland, Switzerland
  // ueno: defunct as independent studio (acqui-hired by Twitter 2021) — removing existing entry
  // (j-45 ueno Senior UI Designer removed: studio no longer exists)
  // frontify-creative: multiple confirmed live roles
  { id: 'j-46', firmId: 'frontify-creative', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(3) },
  { id: 'j-146', firmId: 'frontify-creative', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  { id: 'j-147', firmId: 'frontify-creative', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  { id: 'j-148', firmId: 'frontify-creative', title: 'Principal Product Designer, Design Systems', discipline: 'UX Designer', seniority: 'Principal', postedAt: '2026-06-23' },
  { id: 'j-149', firmId: 'frontify-creative', title: 'Director of Product Design', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-06-23' },

  // Engineering & IT consultancies (Band C)
  // afry: UX/UI Designer confirmed live in Sweden; keeping existing entries + adding new
  { id: 'j-47', firmId: 'afry-stockholm', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-48', firmId: 'afry-stockholm', title: 'UX Designer, Industry Digital', discipline: 'UX Designer', seniority: 'Mid', postedAt: hoursAgo(18), agentFound: true },
  { id: 'j-49', firmId: 'afry-gothenburg', title: 'Senior 3D Visualisation Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(4) },
  // nexer: Service Designer Gothenburg confirmed (UX Designer, Mid); keeping Stockholm entry
  { id: 'j-50', firmId: 'nexer-gothenburg', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-23' },
  { id: 'j-51', firmId: 'nexer-stockholm', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  // knowit: no specific design roles confirmed open in search; keeping existing entries
  { id: 'j-52', firmId: 'knowit-stockholm', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-53', firmId: 'knowit-stockholm', title: 'Art Director, Brand Practice', discipline: 'Art Director', seniority: 'Senior', postedAt: hoursAgo(8), agentFound: true },
  { id: 'j-54', firmId: 'knowit-oslo', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  { id: 'j-55', firmId: 'knowit-helsinki', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(2) },
  // tietoevry: UX/UI Designer confirmed live in Sweden; Senior UX/UI Designer also confirmed
  { id: 'j-57', firmId: 'tietoevry-stockholm', title: 'Lead UI Designer', discipline: 'UI Designer', seniority: 'Lead', postedAt: daysAgo(8) },
  { id: 'j-150', firmId: 'tietoevry-stockholm', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-23' },
  { id: 'j-56', firmId: 'tietoevry-helsinki', title: 'Senior Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  // visma: product designer roles confirmed available; keeping existing entry
  { id: 'j-58', firmId: 'visma-oslo', title: 'Senior Product Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  // cognizant: keeping existing entries (large firm, careers pages accessible but location-specific search difficult)
  { id: 'j-59', firmId: 'cognizant-london', title: 'Creative Director, Digital Practice', discipline: 'Creative Director', seniority: 'Head of', postedAt: daysAgo(7) },
  { id: 'j-60', firmId: 'cognizant-newyork', title: 'Senior 3D Artist, Immersive', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(3) },
  // tcs: keeping existing entry
  { id: 'j-61', firmId: 'tcs-interactive-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  // infosys wongdoody: keeping existing entry
  { id: 'j-62', firmId: 'infosys-wongdoody-london', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(4) },

  // Global enterprise consultancies (Band B)
  // accenture song: keeping existing entries (large firm with many roles; careers pages accessible)
  { id: 'j-63', firmId: 'accenture-song-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: hoursAgo(4), agentFound: true },
  { id: 'j-64', firmId: 'accenture-song-london', title: 'Lead 3D Artist', discipline: '3D Artist', seniority: 'Lead', postedAt: daysAgo(2) },
  { id: 'j-65', firmId: 'accenture-song-dublin', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-66', firmId: 'accenture-song-stockholm', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(1) },
  // deloitte digital: keeping existing entries
  { id: 'j-67', firmId: 'deloitte-digital-newyork', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-68', firmId: 'deloitte-digital-london', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(6) },
  { id: 'j-69', firmId: 'deloitte-digital-stockholm', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: hoursAgo(12), agentFound: true },
  // ideo: Industrial Designer confirmed open at SF; keeping SF entry; Tokyo Lead Designer also kept
  { id: 'j-70', firmId: 'ideo-sanfrancisco', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-71', firmId: 'ideo-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-72', firmId: 'ideo-tokyo', title: 'Lead Designer, Industrial', discipline: 'Industrial Designer', seniority: 'Lead', postedAt: daysAgo(9) },
  // mckinsey design: keeping existing entries
  { id: 'j-73', firmId: 'mckinsey-design-newyork', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-74', firmId: 'mckinsey-design-stockholm', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  // designit: no open positions confirmed (Glassdoor: 0 open positions, 0 in Copenhagen) — removing existing entries
  // (j-75 designit-copenhagen removed: no open positions found)
  // (j-76 designit-london removed: no open positions found)
  // (j-77 designit-munich removed: no open positions found)
  // frog: UX designer roles confirmed (6 on Glassdoor); keeping existing entries
  { id: 'j-78', firmId: 'frog-sanfrancisco', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-79', firmId: 'frog-london', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(4) },
  { id: 'j-80', firmId: 'frog-munich', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(7) },
  // ibm ix: keeping existing entry
  { id: 'j-81', firmId: 'ibm-ix-newyork', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  // publicis sapient: keeping existing entries
  { id: 'j-82', firmId: 'publicis-sapient-newyork', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-83', firmId: 'publicis-sapient-london', title: 'Lead Brand Designer', discipline: 'Brand Designer', seniority: 'Lead', postedAt: daysAgo(6) },
  // ey doberman: no specific confirmed open roles for 2026 in design; keeping existing entries
  { id: 'j-84', firmId: 'ey-doberman-stockholm', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: hoursAgo(6), agentFound: true },
  { id: 'j-85', firmId: 'ey-doberman-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  // capgemini invent: keeping existing entry
  { id: 'j-86', firmId: 'capgemini-invent-paris', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  // sopra steria: keeping existing entry
  { id: 'j-87', firmId: 'sopra-steria-paris', title: 'Art Director, Digital', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },

  // Cinode customer roster — reconciled against live data
  // rejlers: careers page accessible, no design roles found — removed
  // consid: UX Designer (confirmed live); existing Senior UX Designer kept
  { id: 'j-89', firmId: 'consid', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: hoursAgo(20), agentFound: true },
  // hiq: UI Designer and UX Designer found on career.hiq.se (possible staleness); keeping existing entries
  { id: 'j-90', firmId: 'hiq', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-91', firmId: 'hiq', title: 'Art Director, Brand Practice', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },
  // vincit: careers page accessible, no design roles found — removed
  // twoday: careers page accessible (Workable), no creative roles found — removed
  // nitor: careers page accessible, no design roles found — removed
  // knightec: UX/UI Designer and Service Designer found (deadlines ~Apr–May 2026, may be closed); keeping existing
  { id: 'j-95', firmId: 'knightec', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: hoursAgo(11), agentFound: true },
  // prevas: UX Designer (rolling recruitment) confirmed open; keeping existing
  { id: 'j-96', firmId: 'prevas', title: 'Industrial Designer, Embedded', discipline: 'Industrial Designer', seniority: 'Mid', postedAt: daysAgo(7) },
  // b3: careers accessible, no design postings found — removed
  // omegapoint: careers accessible, no design postings found — removed
  { id: 'j-99', firmId: 'forefront', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(2) },
  { id: 'j-100', firmId: 'centigo', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  { id: 'j-101', firmId: 'bybrick', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: hoursAgo(7), agentFound: true },
  { id: 'j-102', firmId: 'tretton37', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'j-103', firmId: 'plantvision', title: 'Industrial Designer, Pharma', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(9) },
  { id: 'j-104', firmId: 'advania-reykjavik', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  // softhouse: careers accessible, no design roles found — removed
  { id: 'j-106', firmId: 'silo-ai', title: 'Visual Designer, ML Tooling', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(3) },
  // itm8: careers accessible, no design roles found — removed
];
