import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-06-30';

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
  // ── Stockholm / Band A ──────────────────────────────────────────────────────
  // north-kingdom: careers page reachable, no mappable design roles live — entries removed
  // acne: 2 live roles confirmed via Jobylon
  { id: 'acne-junior-digital-designer', firmId: 'acne', title: 'Junior Digital Designer', discipline: 'UI Designer', seniority: 'Junior', postedAt: '2026-06-30' },
  { id: 'acne-junior-designer', firmId: 'acne', title: 'Junior Designer', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-06-30' },
  // snask: no current listings found — entries removed
  // bvd: 2 live roles confirmed
  { id: 'bvd-3d-motion-designer', firmId: 'bvd', title: '3D & Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'bvd-motion-designer', firmId: 'bvd', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  // kurppa-hosk: 2 live roles confirmed via Teamtailor
  { id: 'kurppa-hosk-junior-brand-designer', firmId: 'kurppa-hosk', title: 'Junior Brand Designer', discipline: 'Brand Designer', seniority: 'Junior', postedAt: '2026-06-30' },
  { id: 'kurppa-hosk-packaging-industrial-designer', firmId: 'kurppa-hosk', title: 'Packaging/Industrial Designer', discipline: 'Industrial Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  // goodbye-kansas: 3 live roles confirmed via career.goodbyekansas.com
  { id: 'goodbye-kansas-facial-modeling-artist', firmId: 'goodbye-kansas', title: 'Facial Modeling Artist', discipline: '3D Artist', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'goodbye-kansas-realtime-fx-artist', firmId: 'goodbye-kansas', title: 'Realtime FX Artist', discipline: 'CG Generalist', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'goodbye-kansas-matchmove-artist', firmId: 'goodbye-kansas', title: 'Matchmove Artist', discipline: 'CG Generalist', seniority: 'Mid', postedAt: '2026-06-30' },

  // ── Helsinki / Band A ───────────────────────────────────────────────────────
  // bond: only generic freelancer form found; careers page status unclear — keep existing
  { id: 'j-9', firmId: 'bond', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-10', firmId: 'bond', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(8) },
  // kurppa: no careers page indexed (unreachable) — keep existing
  { id: 'j-11', firmId: 'kurppa', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },

  // ── Oslo / Band A ───────────────────────────────────────────────────────────
  // bakken-baeck: 5 live roles confirmed via bakkenbaeck.com/join
  { id: 'bakken-baeck-senior-brand-designer', firmId: 'bakken-baeck', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'bakken-baeck-lead-product-designer', firmId: 'bakken-baeck', title: 'Lead Product Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-30' },
  { id: 'bakken-baeck-digital-design-lead', firmId: 'bakken-baeck', title: 'Digital Design Lead', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-30' },
  { id: 'bakken-baeck-product-designer', firmId: 'bakken-baeck', title: 'Product Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'bakken-baeck-brand-designer', firmId: 'bakken-baeck', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  // heydays: confirmed not currently hiring — entry removed

  // ── Copenhagen / Band A ─────────────────────────────────────────────────────
  // e-types: careers page reachable, no mappable creative roles — entry removed
  // kontrapunkt: 1 live role confirmed via elvium.com
  { id: 'kontrapunkt-concept-designer', firmId: 'kontrapunkt', title: 'Concept Designer', discipline: 'Concept Artist', seniority: 'Mid', postedAt: '2026-06-30' },

  // ── London / Band A ─────────────────────────────────────────────────────────
  // pentagram: careers portal active, no live postings confirmed — entries removed
  // wolff-olins: 2 live roles confirmed via Workable
  { id: 'wolff-olins-senior-designer', firmId: 'wolff-olins', title: 'Senior Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'wolff-olins-senior-motion-designer', firmId: 'wolff-olins', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  // dn-co: 1 live role confirmed
  { id: 'dn-co-senior-brand-motion-designer', firmId: 'dn-co', title: 'Senior Brand and Motion Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  // moving-brands: 3 live roles confirmed via Workable
  { id: 'moving-brands-designer', firmId: 'moving-brands', title: 'Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'moving-brands-freelance-motion-designer', firmId: 'moving-brands', title: 'Freelance Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'moving-brands-ux-designer', firmId: 'moving-brands', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  // the-mill: careers portal active but no specific confirmed open roles in search — keep existing
  { id: 'j-23', firmId: 'the-mill', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-24', firmId: 'the-mill', title: 'CG Lead, Commercials', discipline: 'CG Generalist', seniority: 'Lead', postedAt: daysAgo(8) },
  // mpc: 1 live role confirmed via SmartRecruiters
  { id: 'mpc-lead-vfx-concept-artist', firmId: 'mpc', title: 'Lead VFX Concept Artist', discipline: 'Concept Artist', seniority: 'Lead', postedAt: '2026-06-30' },

  // ── Germany ─────────────────────────────────────────────────────────────────
  // bureau-borsche: explicitly not accepting applications — entry removed
  // mutabor: 2 live roles confirmed via Personio
  { id: 'mutabor-ux-designer', firmId: 'mutabor', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'mutabor-junior-art-director-digital', firmId: 'mutabor', title: '(Junior) Art Director Digital', discipline: 'Art Director', seniority: 'Junior', postedAt: '2026-06-30' },
  // edenspiekermann: 4 live roles confirmed via edenspiekermann.com/jobs
  { id: 'edenspiekermann-senior-ui-ux-designer', firmId: 'edenspiekermann', title: 'Senior UI/UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'edenspiekermann-ui-ux-designer-berlin', firmId: 'edenspiekermann', title: 'UI/UX Designer - Berlin', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'edenspiekermann-ui-ux-designer-leipzig', firmId: 'edenspiekermann', title: 'UI/UX Designer - Leipzig', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'edenspiekermann-design-director', firmId: 'edenspiekermann', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-30' },
  // hort: no open roles confirmed — entry removed

  // ── Netherlands ─────────────────────────────────────────────────────────────
  // studio-dumbar: careers page reachable, no confirmed roles — entry removed
  // random-studio: 3 live roles confirmed via jobs.random.studio
  { id: 'random-studio-creative-lead', firmId: 'random-studio', title: 'Creative Lead', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-30' },
  { id: 'random-studio-ux-lead', firmId: 'random-studio', title: 'UX Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-30' },
  { id: 'random-studio-ux-designer', firmId: 'random-studio', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },

  // ── Italy ───────────────────────────────────────────────────────────────────
  // la-tigre: proxy blocked — keep existing
  { id: 'j-32', firmId: 'la-tigre', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(4) },

  // ── United States ───────────────────────────────────────────────────────────
  // All proxy-blocked — keep existing
  { id: 'j-33', firmId: 'collins', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-34', firmId: 'collins', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: hoursAgo(14), agentFound: true },
  { id: 'j-35', firmId: 'mother-design', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-36', firmId: 'gretel', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: daysAgo(6) },
  { id: 'j-37', firmId: 'instrument', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-38', firmId: 'instrument', title: 'Lead 3D Artist', discipline: '3D Artist', seniority: 'Lead', postedAt: daysAgo(5) },
  { id: 'j-39', firmId: 'manual', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(8) },
  { id: 'j-40', firmId: 'character-sf', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(4) },

  // ── Canada ──────────────────────────────────────────────────────────────────
  // proxy-blocked — keep existing
  { id: 'j-41', firmId: 'metalab', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-42', firmId: 'sid-lee', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(7) },

  // ── Australia ───────────────────────────────────────────────────────────────
  // proxy-blocked — keep existing
  { id: 'j-43', firmId: 'method', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: daysAgo(2) },
  { id: 'j-44', firmId: 'for-the-people', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(5) },

  // ── Iceland / Switzerland ────────────────────────────────────────────────────
  // proxy-blocked — keep existing
  { id: 'j-45', firmId: 'ueno', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  { id: 'j-46', firmId: 'frontify-creative', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(3) },

  // ── Band C — Engineering & IT consultancies ──────────────────────────────────
  // afry-stockholm: 1 live role confirmed via LinkedIn search
  { id: 'afry-stockholm-ux-ui-designer', firmId: 'afry-stockholm', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  // afry-gothenburg: 1 live role confirmed via search
  { id: 'afry-gothenburg-visualization-lead', firmId: 'afry-gothenburg', title: 'Experienced Visualization and Graphical Designer Lead', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-30' },
  // nexer-gothenburg: 2 live roles confirmed via designproject.io
  { id: 'nexer-gothenburg-senior-ux-ui-ad', firmId: 'nexer-gothenburg', title: 'Senior UX/UI Designer med AD-profil', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'nexer-gothenburg-senior-service-designer', firmId: 'nexer-gothenburg', title: 'Erfaren Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  // nexer-stockholm: no Stockholm-specific design roles found — entry removed
  // knowit-stockholm: 1 live role confirmed via knowit.se
  { id: 'knowit-stockholm-ux-designer', firmId: 'knowit-stockholm', title: 'UX-designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  // knowit-oslo: 2 live roles confirmed via knowit.no
  { id: 'knowit-oslo-ux-designer', firmId: 'knowit-oslo', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'knowit-oslo-senior-ux-designer', firmId: 'knowit-oslo', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  // knowit-helsinki: no current design openings found — entry removed
  // tietoevry-helsinki: 1 live role confirmed via Workday
  { id: 'tietoevry-helsinki-junior-ux-designer', firmId: 'tietoevry-helsinki', title: 'Junior UX Designer', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-30' },
  // tietoevry-stockholm: 2 live roles confirmed via SmartRecruiters/Workday
  { id: 'tietoevry-stockholm-ux-ui-designer-banktech', firmId: 'tietoevry-stockholm', title: 'UX/UI Designer - Tieto Banktech', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'tietoevry-stockholm-senior-ux-ui-designer', firmId: 'tietoevry-stockholm', title: 'Senior UX/UI Designer - Tietoevry Tech Services', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  // visma-oslo: Head of Design role found but deadline was June 20 — unconfirmed if still open; keep existing as fallback
  { id: 'j-58', firmId: 'visma-oslo', title: 'Senior Product Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  // cognizant-london: no confirmed London-specific design roles — keep existing
  { id: 'j-59', firmId: 'cognizant-london', title: 'Creative Director, Digital Practice', discipline: 'Creative Director', seniority: 'Head of', postedAt: daysAgo(7) },
  // cognizant-newyork: 2 live roles confirmed via careers.cognizant.com
  { id: 'cognizant-newyork-digital-product-designer', firmId: 'cognizant-newyork', title: 'Digital Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-08' },
  { id: 'cognizant-newyork-ux-experience-designer', firmId: 'cognizant-newyork', title: 'Moment UI/UX Experience Designer', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-03-24' },
  // tcs-interactive-london: no specific design listings confirmed — keep existing
  { id: 'j-61', firmId: 'tcs-interactive-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  // infosys-wongdoody-london: 4 live roles confirmed via greenhouse/ZipRecruiter UK
  { id: 'infosys-wongdoody-london-creative-director-visual', firmId: 'infosys-wongdoody-london', title: 'Creative Director - Visual Design', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-02-23' },
  { id: 'infosys-wongdoody-london-ux-director', firmId: 'infosys-wongdoody-london', title: 'UX Director', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-01-13' },
  { id: 'infosys-wongdoody-london-assoc-ux-director', firmId: 'infosys-wongdoody-london', title: 'Associate User Experience Director', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-02-25' },

  // ── Band B — Global enterprise consultancies ─────────────────────────────────
  // accenture-song-london: live Droga5 roles confirmed via search
  { id: 'accenture-song-london-senior-art-director', firmId: 'accenture-song-london', title: 'Droga5 Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'accenture-song-london-art-director', firmId: 'accenture-song-london', title: 'Droga5 Art Director', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'accenture-song-london-assoc-cd-art', firmId: 'accenture-song-london', title: 'Droga5 Associate Creative Director, Art', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'accenture-song-london-senior-designer', firmId: 'accenture-song-london', title: 'Droga5 Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  // accenture-song-dublin: live Droga5 roles confirmed
  { id: 'accenture-song-dublin-senior-art-director', firmId: 'accenture-song-dublin', title: 'Droga5 Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'accenture-song-dublin-art-director', firmId: 'accenture-song-dublin', title: 'Droga5 Art Director', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'accenture-song-dublin-senior-designer', firmId: 'accenture-song-dublin', title: 'Droga5 Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  // accenture-song-stockholm: no confirmed Stockholm office — entry removed
  // deloitte-digital-newyork: live roles confirmed
  { id: 'deloitte-digital-newyork-cd-ux', firmId: 'deloitte-digital-newyork', title: 'Creative Director, UX', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'deloitte-digital-newyork-lead-ux-agentic-ai', firmId: 'deloitte-digital-newyork', title: 'Lead UX Designer - Agentic AI Platform', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-03-21' },
  { id: 'deloitte-digital-newyork-lead-ux-product', firmId: 'deloitte-digital-newyork', title: 'Lead UX Product Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-30' },
  { id: 'deloitte-digital-newyork-lead-ux-visual', firmId: 'deloitte-digital-newyork', title: 'Lead UX Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-02-01' },
  // deloitte-digital-london: no London design postings confirmed — keep existing
  { id: 'j-68', firmId: 'deloitte-digital-london', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(6) },
  // deloitte-digital-stockholm: no Stockholm design postings confirmed — keep existing
  { id: 'j-69', firmId: 'deloitte-digital-stockholm', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: hoursAgo(12), agentFound: true },
  // ideo-sanfrancisco: 3 live roles confirmed
  { id: 'ideo-sanfrancisco-visual-comms-lead', firmId: 'ideo-sanfrancisco', title: 'Visual Communication Design Lead', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-02-01' },
  { id: 'ideo-sanfrancisco-senior-visual-comms', firmId: 'ideo-sanfrancisco', title: 'Senior Visual Communication Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-02-05' },
  { id: 'ideo-sanfrancisco-interaction-designer', firmId: 'ideo-sanfrancisco', title: 'Interaction Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-03-25' },
  // ideo-london: no London-specific postings confirmed — keep existing
  { id: 'j-71', firmId: 'ideo-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  // ideo-tokyo: no Tokyo postings confirmed — keep existing
  { id: 'j-72', firmId: 'ideo-tokyo', title: 'Lead Designer, Industrial', discipline: 'Industrial Designer', seniority: 'Lead', postedAt: daysAgo(9) },
  // mckinsey-design-newyork: 4 live roles confirmed
  { id: 'mckinsey-design-newyork-digital-designer-ux-ui', firmId: 'mckinsey-design-newyork', title: 'Digital Designer UX/UI', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'mckinsey-design-newyork-senior-experience-designer', firmId: 'mckinsey-design-newyork', title: 'Senior Experience Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'mckinsey-design-newyork-design-director', firmId: 'mckinsey-design-newyork', title: 'Design Director', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'mckinsey-design-newyork-assoc-design-director', firmId: 'mckinsey-design-newyork', title: 'Associate Design Director, Circular Design', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-30' },
  // mckinsey-design-stockholm: 1 live role confirmed
  { id: 'mckinsey-design-stockholm-senior-designer', firmId: 'mckinsey-design-stockholm', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-16' },
  // designit: no open positions in Copenhagen, London, or Munich confirmed — entries removed
  // frog-sanfrancisco: 1 live role confirmed
  { id: 'frog-sanfrancisco-senior-visual-designer', firmId: 'frog-sanfrancisco', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  // frog-london: 5 live roles confirmed via Capgemini careers indexed results
  { id: 'frog-london-ux-creative-director', firmId: 'frog-london', title: 'UX Creative Director', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-04-28' },
  { id: 'frog-london-creative-director', firmId: 'frog-london', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-03-24' },
  { id: 'frog-london-senior-motion-graphic-designer', firmId: 'frog-london', title: 'Senior Motion Graphic Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'frog-london-experience-designer', firmId: 'frog-london', title: 'Experience Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-04-10' },
  { id: 'frog-london-public-sector-service-designer', firmId: 'frog-london', title: 'Midweight Public Sector Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  // frog-munich: no Munich-specific postings confirmed — keep existing
  { id: 'j-80', firmId: 'frog-munich', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(7) },
  // ibm-ix-newyork: 2 live roles confirmed
  { id: 'ibm-ix-newyork-ui-ux-designer', firmId: 'ibm-ix-newyork', title: 'UI/UX Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'ibm-ix-newyork-app-dev-ux-designer', firmId: 'ibm-ix-newyork', title: 'Application Developer / UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-04-14' },
  // publicis-sapient-newyork: 3 live roles confirmed
  { id: 'publicis-sapient-newyork-cd-experience-design', firmId: 'publicis-sapient-newyork', title: 'Creative Director - Experience Design', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'publicis-sapient-newyork-experience-designer', firmId: 'publicis-sapient-newyork', title: 'Experience Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  // publicis-sapient-london: 2 live roles confirmed
  { id: 'publicis-sapient-london-assoc-cd-visual', firmId: 'publicis-sapient-london', title: 'Associate Creative Director - Visual Design', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'publicis-sapient-london-ux-visual-working-student', firmId: 'publicis-sapient-london', title: 'UX UI Visual Design - Working Student', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-06-30' },
  // ey-doberman-stockholm: 1 live role confirmed
  { id: 'ey-doberman-stockholm-creative-designer', firmId: 'ey-doberman-stockholm', title: 'Creative Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  // ey-doberman-newyork: 2 live roles confirmed
  { id: 'ey-doberman-newyork-studio-exp-design-director', firmId: 'ey-doberman-newyork', title: 'Studio+ Experience Design Director, UX/UI', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'ey-doberman-newyork-studio-senior-exp-designer', firmId: 'ey-doberman-newyork', title: 'Studio+ Senior Experience Designer, UX/UI', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  // capgemini-invent-paris: no Paris design postings confirmed — keep existing
  { id: 'j-86', firmId: 'capgemini-invent-paris', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  // sopra-steria-paris: 5 live roles confirmed
  { id: 'sopra-steria-paris-art-director', firmId: 'sopra-steria-paris', title: 'Designer - Direction Artistique', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'sopra-steria-paris-motion-designer', firmId: 'sopra-steria-paris', title: 'Concepteur Designer Video - Motion Design', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'sopra-steria-paris-ux-ui-designer-mid', firmId: 'sopra-steria-paris', title: 'UX/UI Designer confirme - Editeur de logiciels', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'sopra-steria-paris-ux-ui-designer-senior', firmId: 'sopra-steria-paris', title: 'UX/UI Designer experimente - BL Solutions', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'sopra-steria-paris-lead-ux-designer', firmId: 'sopra-steria-paris', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-30' },

  // ── Cinode roster ────────────────────────────────────────────────────────────
  // rejlers: careers reachable, no mappable design roles — entry removed
  // consid: 2 live roles confirmed via search
  { id: 'consid-senior-ux-writer', firmId: 'consid', title: 'Senior UX-writer / Content Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'consid-ux-designer', firmId: 'consid', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  // hiq: 1 live role confirmed (Service Designer mapped to UX Designer)
  { id: 'hiq-service-designer', firmId: 'hiq', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  // vincit: careers reachable, no mappable design roles — entry removed
  // itm8: careers reachable, no mappable design roles — entry removed
  // silo-ai: unreachable (AMD acquisition, no careers page) — keep existing
  { id: 'j-106', firmId: 'silo-ai', title: 'Visual Designer, ML Tooling', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(3) },
  // qestit: reachable, no roles found — no entry
  // twoday: 1 live role confirmed via twoday.no
  { id: 'twoday-ux-designer', firmId: 'twoday', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  // nitor: reachable, no mappable roles — entry removed
  // telia: 1 live role confirmed via teliacompany.com careers
  { id: 'telia-ux-ui-designer', firmId: 'telia', title: 'UX/UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  // knightec: 3 live roles confirmed via career.knightecgroup.com
  { id: 'knightec-ux-ui-designer', firmId: 'knightec', title: 'UX/UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  { id: 'knightec-senior-interaktionsdesigner', firmId: 'knightec', title: 'Senior Interaktionsdesigner', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-30' },
  { id: 'knightec-service-designer', firmId: 'knightec', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  // fujitsu-tokyo: reachable, no design roles found — no entry
  // prevas: 1 live role confirmed via prevas.workbuster.com
  { id: 'prevas-ux-designer', firmId: 'prevas', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-30' },
  // b3: reachable, no mappable roles — entry removed
  // omegapoint: proxy-blocked — keep existing
  { id: 'j-98', firmId: 'omegapoint', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  // forefront: proxy-blocked — keep existing
  { id: 'j-99', firmId: 'forefront', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(2) },
  // centigo: proxy-blocked — keep existing
  { id: 'j-100', firmId: 'centigo', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  // bybrick: proxy-blocked — keep existing
  { id: 'j-101', firmId: 'bybrick', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: hoursAgo(7), agentFound: true },
  // tretton37: proxy-blocked — keep existing
  { id: 'j-102', firmId: 'tretton37', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  // plantvision: proxy-blocked — keep existing
  { id: 'j-103', firmId: 'plantvision', title: 'Industrial Designer, Pharma', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(9) },
  // advania-reykjavik: proxy-blocked — keep existing
  { id: 'j-104', firmId: 'advania-reykjavik', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  // softhouse: proxy-blocked — keep existing
  { id: 'j-105', firmId: 'softhouse', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  // softronic, kvadrat, nektab, xlent, time-people-group, cag, co-native, hm,
  // human-it, accigo, system-verification, techseed, dynabyte, influence, ddp,
  // precio-fishbone, castra, agreat, togethertech, addpro, m4, digitalent,
  // aqc, sylog, cygate, conoa, accelerate:
  //   all proxy-blocked, no prior entries in JOBS — nothing to keep or add
];
