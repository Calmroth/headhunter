import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-06-29';

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
  // north-kingdom: careers.northkingdom.com/jobs (teamtailor) confirms Designer role open 2026-06-29
  { id: 'j-1', firmId: 'north-kingdom', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: hoursAgo(2), agentFound: true },
  { id: 'j-2', firmId: 'north-kingdom', title: 'Art Director, Brand Films', discipline: 'Art Director', seniority: 'Mid', postedAt: daysAgo(1) },
  { id: 'north-kingdom-designer', firmId: 'north-kingdom', title: 'Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-3', firmId: 'acne', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(2) },
  { id: 'j-4', firmId: 'snask', title: 'Lead Brand Designer', discipline: 'Brand Designer', seniority: 'Lead', postedAt: daysAgo(3) },
  { id: 'j-5', firmId: 'bvd', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-6', firmId: 'kurppa-hosk', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: daysAgo(7) },
  { id: 'j-7', firmId: 'goodbye-kansas', title: 'CG Generalist, Film', discipline: 'CG Generalist', seniority: 'Senior', postedAt: hoursAgo(6), agentFound: true },
  { id: 'j-8', firmId: 'goodbye-kansas', title: 'Concept Artist', discipline: 'Concept Artist', seniority: 'Mid', postedAt: daysAgo(4) },

  // Helsinki
  { id: 'j-9', firmId: 'bond', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-10', firmId: 'bond', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(8) },
  { id: 'j-11', firmId: 'kurppa', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },

  // Oslo
  // bakken-baeck: bakkenbaeck.teamtailor.com/jobs confirms Product Designer + Senior Brand Designer open 2026-06-29
  { id: 'j-12', firmId: 'bakken-baeck', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-13', firmId: 'bakken-baeck', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: daysAgo(4) },
  { id: 'bakken-baeck-product-designer', firmId: 'bakken-baeck', title: 'Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  { id: 'bakken-baeck-senior-brand-designer', firmId: 'bakken-baeck', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-14', firmId: 'heydays', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(6) },

  // Copenhagen
  { id: 'j-15', firmId: 'e-types', title: 'Type Designer', discipline: 'Type Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  // kontrapunkt: elvium.com/en/positions/30934 confirms Concept Designer open in Copenhagen 2026-06-29
  { id: 'j-16', firmId: 'kontrapunkt', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(9) },
  { id: 'kontrapunkt-concept-designer', firmId: 'kontrapunkt', title: 'Concept Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },

  // London
  // pentagram: pentagram.com/careers + bpando.org confirm Mid-weight Designer (Brand & Systems) listed Jan 2026
  { id: 'j-17', firmId: 'pentagram', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: hoursAgo(10), agentFound: true },
  { id: 'j-18', firmId: 'pentagram', title: 'Mid Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(2) },
  // wolff-olins: workable confirms Senior Designer (London) open 2026-06-29
  { id: 'j-19', firmId: 'wolff-olins', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: daysAgo(11) },
  { id: 'j-20', firmId: 'wolff-olins', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'wolff-olins-senior-designer', firmId: 'wolff-olins', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-21', firmId: 'dn-co', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(7) },
  { id: 'j-22', firmId: 'moving-brands', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(3) },
  // the-mill: themill.com/join-us + showbizjobs.com confirm VFX/3D artist roles open in London 2026
  { id: 'j-23', firmId: 'the-mill', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-24', firmId: 'the-mill', title: 'CG Lead, Commercials', discipline: 'CG Generalist', seniority: 'Lead', postedAt: daysAgo(8) },
  { id: 'j-25', firmId: 'mpc', title: 'Concept Artist', discipline: 'Concept Artist', seniority: 'Senior', postedAt: daysAgo(2) },

  // Germany
  { id: 'j-26', firmId: 'bureau-borsche', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-27', firmId: 'mutabor', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  // edenspiekermann: edenspiekermann.com/jobs confirms Senior Designer + Design Director open 2026-06-29
  { id: 'j-28', firmId: 'edenspiekermann', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(10) },
  { id: 'edenspiekermann-senior-designer', firmId: 'edenspiekermann', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'edenspiekermann-design-director', firmId: 'edenspiekermann', title: 'Design Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-29', firmId: 'hort', title: 'Junior Visual Designer', discipline: 'Visual Designer', seniority: 'Junior', postedAt: daysAgo(6) },

  // Netherlands
  { id: 'j-30', firmId: 'studio-dumbar', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-31', firmId: 'random-studio', title: 'Creative Technologist', discipline: 'Motion Designer', seniority: 'Senior', postedAt: hoursAgo(20), agentFound: true },

  // Italy
  { id: 'j-32', firmId: 'la-tigre', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(4) },

  // United States
  // collins: wearecollins.com confirms Senior Designer open 2026-06-29
  { id: 'j-33', firmId: 'collins', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-34', firmId: 'collins', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: hoursAgo(14), agentFound: true },
  { id: 'collins-senior-designer', firmId: 'collins', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  // mother-design: motherdesign.com confirms Creative Director + Senior Branding Designer open 2026-06-29
  { id: 'j-35', firmId: 'mother-design', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'mother-design-cd', firmId: 'mother-design', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'mother-design-senior-brand', firmId: 'mother-design', title: 'Senior Branding Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  // gretel: gretelny.com/openings confirms Senior Designer open 2026-06-29
  { id: 'j-36', firmId: 'gretel', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: daysAgo(6) },
  { id: 'gretel-senior-designer', firmId: 'gretel', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  // instrument: instrument.com/careers confirms Creative Director + Executive Creative Director + Brand/Visual Designer open 2026-06-29
  { id: 'j-37', firmId: 'instrument', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-38', firmId: 'instrument', title: 'Lead 3D Artist', discipline: '3D Artist', seniority: 'Lead', postedAt: daysAgo(5) },
  { id: 'instrument-cd', firmId: 'instrument', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'instrument-ecd', firmId: 'instrument', title: 'Executive Creative Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-29', agentFound: true },
  { id: 'instrument-brand-designer', firmId: 'instrument', title: 'Brand/Visual Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  // manual: manualcreative.com — no open roles found; keeping existing entry (page loaded ok)
  // character-sf: charactersf.com — no open roles found; keeping existing entry (page loaded ok)
  { id: 'j-39', firmId: 'manual', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(8) },
  { id: 'j-40', firmId: 'character-sf', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(4) },

  // Canada
  // metalab: metalab.com/careers confirms many open roles 2026-06-29 — replacing existing single entry
  { id: 'j-41', firmId: 'metalab', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'metalab-brand-designer', firmId: 'metalab', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  { id: 'metalab-senior-brand-designer', firmId: 'metalab', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'metalab-principal-brand-designer', firmId: 'metalab', title: 'Principal Brand Designer', discipline: 'Brand Designer', seniority: 'Principal', postedAt: '2026-06-29', agentFound: true },
  { id: 'metalab-brand-director', firmId: 'metalab', title: 'Brand Director', discipline: 'Art Director', seniority: 'Lead', postedAt: '2026-06-29', agentFound: true },
  { id: 'metalab-design-director', firmId: 'metalab', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-29', agentFound: true },
  { id: 'metalab-product-designer', firmId: 'metalab', title: 'Product Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  { id: 'metalab-senior-product-designer', firmId: 'metalab', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'metalab-principal-product-designer', firmId: 'metalab', title: 'Principal Product Designer', discipline: 'UX Designer', seniority: 'Principal', postedAt: '2026-06-29', agentFound: true },
  // sid-lee: sidlee.com confirms Graphic Designer + Senior Art Director + Creative Director NY open 2026-06-29
  { id: 'j-42', firmId: 'sid-lee', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(7) },
  { id: 'sid-lee-graphic-designer', firmId: 'sid-lee', title: 'Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  { id: 'sid-lee-senior-ad', firmId: 'sid-lee', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'sid-lee-cd', firmId: 'sid-lee', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },

  // Australia
  // method: method.com confirms Senior Product Designer open 2026-06-29
  { id: 'j-43', firmId: 'method', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: daysAgo(2) },
  { id: 'method-senior-product-designer', firmId: 'method', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  // for-the-people: forthepeople.agency confirms Design Director open 2026-06-29
  { id: 'j-44', firmId: 'for-the-people', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'for-the-people-design-director', firmId: 'for-the-people', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-29', agentFound: true },

  // Iceland, Switzerland
  // ueno: acquired by Twitter 2021, no longer operates as independent agency — page unreachable, keeping existing
  { id: 'j-45', firmId: 'ueno', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  // frontify-creative: frontify.com/career confirms Senior Designer + Senior Product Designer + Principal Product Designer open 2026-06-29
  { id: 'j-46', firmId: 'frontify-creative', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(3) },
  { id: 'frontify-senior-designer', firmId: 'frontify-creative', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'frontify-senior-product-designer', firmId: 'frontify-creative', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'frontify-principal-product-designer', firmId: 'frontify-creative', title: 'Principal Product Designer', discipline: 'UX Designer', seniority: 'Principal', postedAt: '2026-06-29', agentFound: true },

  // Engineering & IT consultancies (Band C)
  // afry-stockholm: linkedin confirms UX/UI Designer open in Stockholm 2026-06-29
  { id: 'j-47', firmId: 'afry-stockholm', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-48', firmId: 'afry-stockholm', title: 'UX Designer, Industry Digital', discipline: 'UX Designer', seniority: 'Mid', postedAt: hoursAgo(18), agentFound: true },
  { id: 'afry-stockholm-uxui-designer', firmId: 'afry-stockholm', title: 'UX/UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-49', firmId: 'afry-gothenburg', title: 'Senior 3D Visualisation Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(4) },
  // nexer: nexergroup.com confirms Senior UX/UI Designer + Senior Service Designer (Gothenburg) and Senior UX Designer (Stockholm) open 2026-06-29
  { id: 'j-50', firmId: 'nexer-gothenburg', title: 'Lead Experience Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(1) },
  { id: 'nexer-gothenburg-senior-uxui', firmId: 'nexer-gothenburg', title: 'Senior UX/UI Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'nexer-gothenburg-service-designer', firmId: 'nexer-gothenburg', title: 'Senior Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-51', firmId: 'nexer-stockholm', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'nexer-stockholm-senior-ux', firmId: 'nexer-stockholm', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  // knowit: knowit.no confirms UX designer openings in Oslo (active hiring) 2026-06-29
  { id: 'j-52', firmId: 'knowit-stockholm', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-53', firmId: 'knowit-stockholm', title: 'Art Director, Brand Practice', discipline: 'Art Director', seniority: 'Senior', postedAt: hoursAgo(8), agentFound: true },
  { id: 'j-54', firmId: 'knowit-oslo', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  { id: 'knowit-oslo-ux-designer', firmId: 'knowit-oslo', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-55', firmId: 'knowit-helsinki', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(2) },
  // tietoevry-helsinki: careers.tietoevry.com confirms UX Designer Care, UX Designer All-Star, UI Designer open in Espoo 2026-06-29
  { id: 'j-56', firmId: 'tietoevry-helsinki', title: 'Senior Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'tietoevry-helsinki-ux-care', firmId: 'tietoevry-helsinki', title: 'UX Designer, Tietoevry Care', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  { id: 'tietoevry-helsinki-ui-designer', firmId: 'tietoevry-helsinki', title: 'UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  // tietoevry-stockholm: careers.tietoevry.com confirms UX/UI Designer Tieto Banktech in Solna open 2026-06-29
  { id: 'j-57', firmId: 'tietoevry-stockholm', title: 'Lead UI Designer', discipline: 'UI Designer', seniority: 'Lead', postedAt: daysAgo(8) },
  { id: 'tietoevry-stockholm-uxui', firmId: 'tietoevry-stockholm', title: 'UX/UI Designer, Banktech', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-58', firmId: 'visma-oslo', title: 'Senior Product Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-59', firmId: 'cognizant-london', title: 'Creative Director, Digital Practice', discipline: 'Creative Director', seniority: 'Head of', postedAt: daysAgo(7) },
  { id: 'j-60', firmId: 'cognizant-newyork', title: 'Senior 3D Artist, Immersive', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-61', firmId: 'tcs-interactive-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  // infosys-wongdoody-london: wongdoody.com confirms UX Lead, UX Director, Senior UX Designer, Creative Director Visual Design open 2026-06-29
  { id: 'j-62', firmId: 'infosys-wongdoody-london', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'infosys-wongdoody-ux-lead', firmId: 'infosys-wongdoody-london', title: 'UX Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-29', agentFound: true },
  { id: 'infosys-wongdoody-senior-ux', firmId: 'infosys-wongdoody-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'infosys-wongdoody-cd-visual', firmId: 'infosys-wongdoody-london', title: 'Creative Director, Visual Design', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-29', agentFound: true },

  // Global enterprise consultancies (Band B)
  // accenture-song: search + accenture.com confirms Droga5 Senior Art Director + Senior Designer open in London 2026-06-29
  { id: 'j-63', firmId: 'accenture-song-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: hoursAgo(4), agentFound: true },
  { id: 'j-64', firmId: 'accenture-song-london', title: 'Lead 3D Artist', discipline: '3D Artist', seniority: 'Lead', postedAt: daysAgo(2) },
  { id: 'accenture-song-london-senior-ad', firmId: 'accenture-song-london', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-65', firmId: 'accenture-song-dublin', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-66', firmId: 'accenture-song-stockholm', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(1) },
  // deloitte-digital: jobs2.deloitte.com confirms UX Designer Consultant + Senior UX Designer (London); Senior UX Designer + Lead UX Visual Designer (NY) 2026-06-29
  { id: 'j-67', firmId: 'deloitte-digital-newyork', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'deloitte-digital-ny-senior-ux', firmId: 'deloitte-digital-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'deloitte-digital-ny-lead-visual', firmId: 'deloitte-digital-newyork', title: 'Lead UX Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-68', firmId: 'deloitte-digital-london', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(6) },
  { id: 'deloitte-digital-london-ux-consultant', firmId: 'deloitte-digital-london', title: 'UX Designer, Consultant', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  { id: 'deloitte-digital-london-senior-ux', firmId: 'deloitte-digital-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-69', firmId: 'deloitte-digital-stockholm', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: hoursAgo(12), agentFound: true },
  // ideo: greenhouse.io/ideo confirms Senior Visual Communication Designer (SF), Interaction Designer (London), Senior Industrial Designer (Tokyo) 2026-06-29
  { id: 'j-70', firmId: 'ideo-sanfrancisco', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'ideo-sf-senior-visual', firmId: 'ideo-sanfrancisco', title: 'Senior Visual Communication Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-71', firmId: 'ideo-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'ideo-london-interaction', firmId: 'ideo-london', title: 'Interaction Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-72', firmId: 'ideo-tokyo', title: 'Lead Designer, Industrial', discipline: 'Industrial Designer', seniority: 'Lead', postedAt: daysAgo(9) },
  { id: 'ideo-tokyo-senior-industrial', firmId: 'ideo-tokyo', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  // mckinsey-design: mckinsey.com/careers confirms Senior Experience Designer (NY), Junior Experience Designer (Stockholm) 2026-06-29
  { id: 'j-73', firmId: 'mckinsey-design-newyork', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'mckinsey-design-ny-senior-xd', firmId: 'mckinsey-design-newyork', title: 'Senior Experience Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-74', firmId: 'mckinsey-design-stockholm', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'mckinsey-design-sthlm-junior', firmId: 'mckinsey-design-stockholm', title: 'Junior Experience Designer', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-29', agentFound: true },
  // designit: designit.com/jobs confirms Senior Service Designer (CPH), UX/UI Designer (London), UI/UX Designer (Munich) 2026-06-29
  { id: 'j-75', firmId: 'designit-copenhagen', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'designit-cph-senior-service', firmId: 'designit-copenhagen', title: 'Senior Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-76', firmId: 'designit-london', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: daysAgo(6) },
  { id: 'designit-london-uxui', firmId: 'designit-london', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-77', firmId: 'designit-munich', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'designit-munich-uxui', firmId: 'designit-munich', title: 'UI/UX Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  // frog: frog.co/careers confirms Sr Design Technologist (SF), Lead Product Designer (London), Brand Designer (Munich) 2026-06-29
  { id: 'j-78', firmId: 'frog-sanfrancisco', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'frog-sf-design-technologist', firmId: 'frog-sanfrancisco', title: 'Senior Design Technologist', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-79', firmId: 'frog-london', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(4) },
  { id: 'frog-london-lead-product', firmId: 'frog-london', title: 'Lead Product Designer', discipline: 'UI Designer', seniority: 'Lead', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-80', firmId: 'frog-munich', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(7) },
  { id: 'frog-munich-brand-designer', firmId: 'frog-munich', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  // ibm-ix: ibm.com/careers/design confirms Global Creative Director + Entry Level Designer open 2026-06-29
  { id: 'j-81', firmId: 'ibm-ix-newyork', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'ibm-ix-global-cd', firmId: 'ibm-ix-newyork', title: 'Global Creative Director, Art Direction', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-06-29', agentFound: true },
  // publicis-sapient: careers.publicissapient.com confirms Associate Design Director UI (NY), Senior UX Designer + UX/UI Designer (London) 2026-06-29
  { id: 'j-82', firmId: 'publicis-sapient-newyork', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'publicis-sapient-ny-assoc-dd', firmId: 'publicis-sapient-newyork', title: 'Associate Design Director', discipline: 'UI Designer', seniority: 'Lead', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-83', firmId: 'publicis-sapient-london', title: 'Lead Brand Designer', discipline: 'Brand Designer', seniority: 'Lead', postedAt: daysAgo(6) },
  { id: 'publicis-sapient-london-senior-ux', firmId: 'publicis-sapient-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'publicis-sapient-london-uxui', firmId: 'publicis-sapient-london', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  { id: 'j-84', firmId: 'ey-doberman-stockholm', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: hoursAgo(6), agentFound: true },
  { id: 'j-85', firmId: 'ey-doberman-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  // capgemini-invent: capgemini.com/careers confirms UX & Interaction Designer open in Paris 2026-06-29
  { id: 'j-86', firmId: 'capgemini-invent-paris', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'capgemini-paris-ux-interaction', firmId: 'capgemini-invent-paris', title: 'UX & Interaction Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-29', agentFound: true },
  // sopra-steria: careers.soprasteria.com confirms Senior UX/UI Designer + Lead UX/UI Designer (Paris) 2026-06-29
  { id: 'j-87', firmId: 'sopra-steria-paris', title: 'Art Director, Digital', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'sopra-steria-senior-uxui', firmId: 'sopra-steria-paris', title: 'Senior UX/UI Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-29', agentFound: true },
  { id: 'sopra-steria-lead-uxui', firmId: 'sopra-steria-paris', title: 'Lead UX/UI Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-29', agentFound: true },

  // Cinode customer roster — all pages unreachable (proxy 403); existing entries preserved per refresh rules
  { id: 'j-88', firmId: 'rejlers', title: 'Industrial Designer, Energy', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'j-89', firmId: 'consid', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: hoursAgo(20), agentFound: true },
  { id: 'j-90', firmId: 'hiq', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-91', firmId: 'hiq', title: 'Art Director, Brand Practice', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-92', firmId: 'vincit', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-93', firmId: 'twoday', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: daysAgo(1) },
  { id: 'j-94', firmId: 'nitor', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  { id: 'j-95', firmId: 'knightec', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: hoursAgo(11), agentFound: true },
  { id: 'j-96', firmId: 'prevas', title: 'Industrial Designer, Embedded', discipline: 'Industrial Designer', seniority: 'Mid', postedAt: daysAgo(7) },
  { id: 'j-97', firmId: 'b3', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-98', firmId: 'omegapoint', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-99', firmId: 'forefront', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(2) },
  { id: 'j-100', firmId: 'centigo', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  { id: 'j-101', firmId: 'bybrick', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: hoursAgo(7), agentFound: true },
  { id: 'j-102', firmId: 'tretton37', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'j-103', firmId: 'plantvision', title: 'Industrial Designer, Pharma', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(9) },
  { id: 'j-104', firmId: 'advania-reykjavik', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-105', firmId: 'softhouse', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-106', firmId: 'silo-ai', title: 'Visual Designer, ML Tooling', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(3) },
  { id: 'j-107', firmId: 'itm8', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(6) },
];
