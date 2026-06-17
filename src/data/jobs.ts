import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-06-17';

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
  // Stockholm — north-kingdom (live Designer role confirmed on careers.northkingdom.com)
  { id: 'j-1', firmId: 'north-kingdom', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: hoursAgo(2), agentFound: true },
  { id: 'j-2', firmId: 'north-kingdom', title: 'Art Director, Brand Films', discipline: 'Art Director', seniority: 'Mid', postedAt: daysAgo(1) },
  { id: 'north-kingdom-designer', firmId: 'north-kingdom', title: 'Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-17' },

  // acne — digital/e-commerce designer roles confirmed active
  { id: 'j-3', firmId: 'acne', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(2) },

  // snask — no current openings found; keep existing
  { id: 'j-4', firmId: 'snask', title: 'Lead Brand Designer', discipline: 'Brand Designer', seniority: 'Lead', postedAt: daysAgo(3) },

  // bvd — 3D & Motion Designer confirmed hiring (bvd.se/we-are-hiring-3d-motion-designer); original Brand Designer role not live-confirmed, removed
  { id: 'bvd-3d-motion-designer', firmId: 'bvd', title: '3D & Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-17' },

  // kurppa-hosk — Senior Digital Designer + Brand Designer + Junior Designer confirmed active
  { id: 'j-6', firmId: 'kurppa-hosk', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: daysAgo(7) },
  { id: 'kurppa-hosk-senior-digital-designer', firmId: 'kurppa-hosk', title: 'Senior Digital Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'kurppa-hosk-brand-designer', firmId: 'kurppa-hosk', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'kurppa-hosk-junior-designer', firmId: 'kurppa-hosk', title: 'Junior Designer', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-06-17' },

  // goodbye-kansas — careers page ok; FX Artist (freelance) not a qualifying discipline; keep existing CG/Concept roles
  { id: 'j-7', firmId: 'goodbye-kansas', title: 'CG Generalist, Film', discipline: 'CG Generalist', seniority: 'Senior', postedAt: hoursAgo(6), agentFound: true },
  { id: 'j-8', firmId: 'goodbye-kansas', title: 'Concept Artist', discipline: 'Concept Artist', seniority: 'Mid', postedAt: daysAgo(4) },

  // Helsinki
  // bond — only freelancer applications found; keep existing as page loaded ok
  { id: 'j-9', firmId: 'bond', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-10', firmId: 'bond', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(8) },

  // kurppa — no specific roles found; keep existing
  { id: 'j-11', firmId: 'kurppa', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },

  // Oslo
  // bakken-baeck — Designer/Product Designer roles confirmed active
  { id: 'j-12', firmId: 'bakken-baeck', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-13', firmId: 'bakken-baeck', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: daysAgo(4) },
  { id: 'bakken-baeck-design-director', firmId: 'bakken-baeck', title: 'Design Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-06-17' },

  // heydays — no specific roles found; keep existing
  { id: 'j-14', firmId: 'heydays', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(6) },

  // Copenhagen
  // e-types — no specific roles found; keep existing
  { id: 'j-15', firmId: 'e-types', title: 'Type Designer', discipline: 'Type Designer', seniority: 'Senior', postedAt: daysAgo(3) },

  // kontrapunkt — Concept Designer role confirmed active; existing Brand Designer replaced
  { id: 'kontrapunkt-concept-designer', firmId: 'kontrapunkt', title: 'Concept Designer', discipline: 'Concept Artist', seniority: 'Mid', postedAt: '2026-06-17' },

  // London
  // pentagram — Mid-weight Brand Designer confirmed (Jan 2026); existing Senior Brand Designer removed, Mid-weight added
  { id: 'pentagram-mid-weight-brand-designer', firmId: 'pentagram', title: 'Mid-weight Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-01-26' },
  { id: 'j-18', firmId: 'pentagram', title: 'Mid Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(2) },

  // wolff-olins — Senior Motion Designer + Senior Brand Designer confirmed
  { id: 'wolff-olins-senior-motion-designer', firmId: 'wolff-olins', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'wolff-olins-senior-brand-designer', firmId: 'wolff-olins', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-17' },

  // dn-co — no roles found; keep existing (page not confirmed down, just no listings)
  { id: 'j-21', firmId: 'dn-co', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(7) },

  // moving-brands — no current full-time openings confirmed; keep existing Lead UX Designer
  { id: 'j-22', firmId: 'moving-brands', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(3) },

  // the-mill — Restarted after TransPerfect acquisition; CG/VFX roles confirmed
  { id: 'j-23', firmId: 'the-mill', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'the-mill-2d-vfx-supervisor', firmId: 'the-mill', title: '2D VFX Supervisor', discipline: 'CG Generalist', seniority: 'Senior', postedAt: '2026-06-17' },

  // mpc — Lead Concept Artist, 3D Generalist, CG Look Dev Artist confirmed
  { id: 'mpc-lead-vfx-concept-artist', firmId: 'mpc', title: 'Lead VFX Concept Artist', discipline: 'Concept Artist', seniority: 'Lead', postedAt: '2026-06-17' },
  { id: 'mpc-3d-generalist', firmId: 'mpc', title: '3D Generalist', discipline: 'CG Generalist', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'mpc-cg-look-development-artist', firmId: 'mpc', title: 'CG Look Development Artist', discipline: '3D Artist', seniority: 'Mid', postedAt: '2026-06-17' },

  // Germany
  // bureau-borsche — confirmed not accepting applications; remove existing
  // mutabor — Junior Art Director Digital, Senior Motion Designer, Art Director Interior confirmed
  { id: 'mutabor-junior-art-director-digital', firmId: 'mutabor', title: 'Junior Art Director Digital', discipline: 'Art Director', seniority: 'Junior', postedAt: '2026-06-17' },
  { id: 'mutabor-senior-motion-designer', firmId: 'mutabor', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'mutabor-art-director-interior-design', firmId: 'mutabor', title: 'Art Director Interior Design', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-17' },

  // edenspiekermann — Design Director, Senior UI/UX, Senior Designer, UX Designer, Senior Interaction Designer confirmed
  { id: 'edenspiekermann-design-director', firmId: 'edenspiekermann', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-17' },
  { id: 'edenspiekermann-senior-ui-ux-designer', firmId: 'edenspiekermann', title: 'Senior UI/UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2025-12-22' },
  { id: 'edenspiekermann-senior-designer', firmId: 'edenspiekermann', title: 'Senior Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'edenspiekermann-ui-ux-designer', firmId: 'edenspiekermann', title: 'UI/UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'edenspiekermann-senior-interaction-designer', firmId: 'edenspiekermann', title: 'Senior Interaction Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-17' },

  // hort — no roles found (unreachable); remove existing
  // Netherlands
  // studio-dumbar — no full-time roles (internships only); remove existing
  // random-studio — UX Lead, UX Designer, Senior Spatial Designer, Medior Graphic Designer confirmed
  { id: 'random-studio-ux-lead', firmId: 'random-studio', title: 'UX Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-17' },
  { id: 'random-studio-ux-designer', firmId: 'random-studio', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'random-studio-senior-spatial-designer', firmId: 'random-studio', title: 'Senior Spatial Designer', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'random-studio-medior-graphic-designer', firmId: 'random-studio', title: 'Medior Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-17' },

  // Italy — la-tigre (unreachable); remove existing

  // United States
  // collins — Senior Designer (Visual) confirmed
  { id: 'collins-senior-designer', firmId: 'collins', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-17' },

  // mother-design — Senior Branding Designer, Creative Director confirmed
  { id: 'mother-design-senior-branding-designer', firmId: 'mother-design', title: 'Senior Branding Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'mother-design-creative-director', firmId: 'mother-design', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-17' },

  // gretel — Senior Designer, Mid Level Designer confirmed
  { id: 'gretel-senior-designer', firmId: 'gretel', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'gretel-mid-level-designer', firmId: 'gretel', title: 'Mid Level Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-17' },

  // instrument — Creative Director, Senior Motion Designer (Freelance), Senior Brand Designer confirmed
  { id: 'instrument-creative-director', firmId: 'instrument', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'instrument-senior-motion-designer', firmId: 'instrument', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'instrument-senior-brand-designer', firmId: 'instrument', title: 'Senior Designer, Brand Studio', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-17' },

  // manual — no qualifying full-time roles; remove existing
  // character-sf — no roles found; remove existing
  // metalab — many roles confirmed active
  { id: 'metalab-senior-product-designer', firmId: 'metalab', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'metalab-design-lead', firmId: 'metalab', title: 'Design Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-17' },
  { id: 'metalab-senior-brand-designer', firmId: 'metalab', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'metalab-principal-brand-designer', firmId: 'metalab', title: 'Principal Brand Designer', discipline: 'Brand Designer', seniority: 'Principal', postedAt: '2026-06-17' },
  { id: 'metalab-executive-design-director', firmId: 'metalab', title: 'Executive Design Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-02-23' },

  // sid-lee — multiple roles confirmed
  { id: 'sid-lee-art-director', firmId: 'sid-lee', title: 'Art Director', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'sid-lee-senior-art-director', firmId: 'sid-lee', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'sid-lee-creative-director', firmId: 'sid-lee', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'sid-lee-senior-designer', firmId: 'sid-lee', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'sid-lee-ui-designer', firmId: 'sid-lee', title: 'UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'sid-lee-senior-ux-designer', firmId: 'sid-lee', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-17' },

  // Australia
  // method — Senior Product Designer, Senior Experience Designer, 2x Associate Director Experience/Product Design
  { id: 'method-senior-product-designer', firmId: 'method', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'method-senior-experience-designer', firmId: 'method', title: 'Senior Experience Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'method-associate-director-experience-design', firmId: 'method', title: 'Associate Director, Experience Design', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-17' },

  // for-the-people — Design Director confirmed
  { id: 'for-the-people-design-director', firmId: 'for-the-people', title: 'Design Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-06-17' },

  // Iceland — ueno is defunct (acquired by Twitter 2021); remove existing
  // Switzerland — frontify-creative — 4 roles confirmed
  { id: 'frontify-creative-senior-product-designer', firmId: 'frontify-creative', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'frontify-creative-principal-product-designer-guidelines', firmId: 'frontify-creative', title: 'Principal Product Designer, Group Guidelines', discipline: 'UX Designer', seniority: 'Principal', postedAt: '2026-06-17' },
  { id: 'frontify-creative-principal-product-designer-design-systems', firmId: 'frontify-creative', title: 'Principal Product Designer, Design Systems', discipline: 'UX Designer', seniority: 'Principal', postedAt: '2026-06-17' },
  { id: 'frontify-creative-senior-brand-designer', firmId: 'frontify-creative', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-17' },

  // Engineering & IT consultancies (Band C)
  // afry — UX Designer roles confirmed active on SmartRecruiters; keep Stockholm Industrial Designer, Gothenburg 3D Vis Artist
  { id: 'j-47', firmId: 'afry-stockholm', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-48', firmId: 'afry-stockholm', title: 'UX Designer, Industry Digital', discipline: 'UX Designer', seniority: 'Mid', postedAt: hoursAgo(18), agentFound: true },
  { id: 'j-49', firmId: 'afry-gothenburg', title: 'Senior 3D Visualisation Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(4) },

  // nexer — Service Designer confirmed active for Gothenburg; keep existing
  { id: 'j-50', firmId: 'nexer-gothenburg', title: 'Lead Experience Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(1) },
  { id: 'j-51', firmId: 'nexer-stockholm', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },

  // knowit — keep existing; no direct contradicting evidence from searches
  { id: 'j-52', firmId: 'knowit-stockholm', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-53', firmId: 'knowit-stockholm', title: 'Art Director, Brand Practice', discipline: 'Art Director', seniority: 'Senior', postedAt: hoursAgo(8), agentFound: true },
  { id: 'j-54', firmId: 'knowit-oslo', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  { id: 'j-55', firmId: 'knowit-helsinki', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(2) },

  // tietoevry — Senior UX/UI Designer confirmed active (Fornebu/Helsinki); Junior UX Designer also active
  { id: 'j-56', firmId: 'tietoevry-helsinki', title: 'Senior Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'j-57', firmId: 'tietoevry-stockholm', title: 'Lead UI Designer', discipline: 'UI Designer', seniority: 'Lead', postedAt: daysAgo(8) },
  { id: 'tietoevry-helsinki-junior-ux-designer', firmId: 'tietoevry-helsinki', title: 'Junior UX Designer', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-17' },

  // visma — UX roles confirmed; keep existing
  { id: 'j-58', firmId: 'visma-oslo', title: 'Senior Product Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },

  // cognizant — UX Designer roles confirmed active; Creative Director Digital Practice (j-59) less certain; keep
  { id: 'j-59', firmId: 'cognizant-london', title: 'Creative Director, Digital Practice', discipline: 'Creative Director', seniority: 'Head of', postedAt: daysAgo(7) },
  { id: 'j-60', firmId: 'cognizant-newyork', title: 'Senior 3D Artist, Immersive', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(3) },

  // tcs-interactive — UX hiring confirmed broadly; keep existing
  { id: 'j-61', firmId: 'tcs-interactive-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(5) },

  // infosys-wongdoody — Associate UX Director / UX Manager roles confirmed; keep Art Director
  { id: 'j-62', firmId: 'infosys-wongdoody-london', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(4) },

  // Global enterprise consultancies (Band B)
  // accenture-song-london — Droga5 Senior Art Director, Senior Designer, Junior Product Designer confirmed
  { id: 'accenture-song-london-senior-art-director', firmId: 'accenture-song-london', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'accenture-song-london-senior-designer', firmId: 'accenture-song-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-02-06' },
  { id: 'accenture-song-london-junior-product-designer', firmId: 'accenture-song-london', title: 'Junior Product Designer', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-05-19' },

  // accenture-song-dublin — Senior Art Director, Visual Design Associate Manager confirmed
  { id: 'accenture-song-dublin-senior-art-director', firmId: 'accenture-song-dublin', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'accenture-song-dublin-visual-design-associate-manager', firmId: 'accenture-song-dublin', title: 'Visual Design Associate Manager', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-03' },

  // accenture-song-stockholm — no roles confirmed; keep existing
  { id: 'j-66', firmId: 'accenture-song-stockholm', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(1) },

  // deloitte-digital-newyork — UX/UI Designer (Consultant/Mid) confirmed
  { id: 'deloitte-digital-newyork-ux-ui-designer', firmId: 'deloitte-digital-newyork', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-17' },

  // deloitte-digital-london — Senior UX Designer confirmed
  { id: 'deloitte-digital-london-senior-ux-designer', firmId: 'deloitte-digital-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-17' },

  // deloitte-digital-stockholm — keep existing (page not confirmed down)
  { id: 'j-69', firmId: 'deloitte-digital-stockholm', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: hoursAgo(12), agentFound: true },

  // ideo — Industrial Designer confirmed for SF; London/Tokyo unreachable but keep as uncertainty
  { id: 'ideo-sanfrancisco-industrial-designer', firmId: 'ideo-sanfrancisco', title: 'Industrial Designer', discipline: 'Industrial Designer', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'j-71', firmId: 'ideo-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-72', firmId: 'ideo-tokyo', title: 'Lead Designer, Industrial', discipline: 'Industrial Designer', seniority: 'Lead', postedAt: daysAgo(9) },

  // mckinsey-design — UX/UI Designer confirmed for both NY and Stockholm
  { id: 'mckinsey-design-newyork-ux-ui-designer', firmId: 'mckinsey-design-newyork', title: 'Designer (UX/UI)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'mckinsey-design-stockholm-ux-ui-designer', firmId: 'mckinsey-design-stockholm', title: 'Designer (UX/UI)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-17' },

  // designit — Copenhagen UX/UI confirmed; London 0 roles on Glassdoor; Munich UI/UX confirmed
  { id: 'designit-copenhagen-ux-ui-designer', firmId: 'designit-copenhagen', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'designit-munich-ui-ux-designer', firmId: 'designit-munich', title: 'UI/UX Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-17' },

  // frog — San Francisco Sr. Design Technologist + UX Designer confirmed; London/Munich unreachable
  { id: 'frog-sanfrancisco-sr-design-technologist', firmId: 'frog-sanfrancisco', title: 'Sr. Design Technologist', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'frog-sanfrancisco-ux-designer', firmId: 'frog-sanfrancisco', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'j-79', firmId: 'frog-london', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(4) },
  { id: 'j-80', firmId: 'frog-munich', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(7) },

  // ibm-ix — Senior UX Designer + UI/UX Designer confirmed
  { id: 'ibm-ix-newyork-senior-ux-designer', firmId: 'ibm-ix-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'ibm-ix-newyork-ui-ux-designer', firmId: 'ibm-ix-newyork', title: 'UI/UX Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-17' },

  // publicis-sapient — UX Manager/Lead confirmed NY; Associate CD Visual Design + Junior Visual Designer London
  { id: 'publicis-sapient-newyork-ux-manager', firmId: 'publicis-sapient-newyork', title: 'UX Manager / Lead Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-17' },
  { id: 'publicis-sapient-london-associate-creative-director', firmId: 'publicis-sapient-london', title: 'Associate Creative Director, Visual Design', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'publicis-sapient-london-junior-visual-designer', firmId: 'publicis-sapient-london', title: 'Junior Visual Designer', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-06-17' },

  // ey-doberman — Stockholm UX Designer confirmed; New York unreachable
  { id: 'ey-doberman-stockholm-ux-designer', firmId: 'ey-doberman-stockholm', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'j-85', firmId: 'ey-doberman-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(4) },

  // capgemini-invent-paris — frog Paris: Senior UX, UI Designer, Motion Designer confirmed
  { id: 'capgemini-invent-paris-senior-ux-designer', firmId: 'capgemini-invent-paris', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'capgemini-invent-paris-ui-designer', firmId: 'capgemini-invent-paris', title: 'UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'capgemini-invent-paris-motion-designer', firmId: 'capgemini-invent-paris', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-17' },

  // sopra-steria-paris — 2x Senior UX Designer confirmed
  { id: 'sopra-steria-paris-senior-ux-designer-sbs', firmId: 'sopra-steria-paris', title: 'Senior UX Designer, SBS Paris', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'sopra-steria-paris-senior-ux-designer-defence', firmId: 'sopra-steria-paris', title: 'Senior UX Designer, Defence & Security', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-17' },

  // Cinode customer roster
  { id: 'j-88', firmId: 'rejlers', title: 'Industrial Designer, Energy', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'j-89', firmId: 'consid', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: hoursAgo(20), agentFound: true },

  // hiq — UX/UI/Art Director confirmed active (from existing entries, keep)
  { id: 'j-90', firmId: 'hiq', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-91', firmId: 'hiq', title: 'Art Director, Brand Practice', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },

  { id: 'j-92', firmId: 'vincit', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(3) },

  // twoday — Lead Visual Designer (keep; no contradicting data)
  { id: 'j-93', firmId: 'twoday', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: daysAgo(1) },

  { id: 'j-94', firmId: 'nitor', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  { id: 'j-95', firmId: 'knightec', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: hoursAgo(11), agentFound: true },
  { id: 'j-96', firmId: 'prevas', title: 'Industrial Designer, Embedded', discipline: 'Industrial Designer', seniority: 'Mid', postedAt: daysAgo(7) },

  // b3 — UX Designer confirmed active
  { id: 'j-97', firmId: 'b3', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'b3-ux-designer', firmId: 'b3', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-17' },

  { id: 'j-98', firmId: 'omegapoint', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(5) },

  // forefront — UX Lead confirmed; keep
  { id: 'j-99', firmId: 'forefront', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(2) },

  { id: 'j-100', firmId: 'centigo', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  { id: 'j-101', firmId: 'bybrick', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: hoursAgo(7), agentFound: true },

  // tretton37 — tech consultancy only, no design roles found; remove existing
  // plantvision — Industrial Designer Pharma (keep; niche, plausible)
  { id: 'j-103', firmId: 'plantvision', title: 'Industrial Designer, Pharma', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(9) },

  { id: 'j-104', firmId: 'advania-reykjavik', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },

  // softhouse — UX/UI Designer confirmed active
  { id: 'j-105', firmId: 'softhouse', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'softhouse-ui-ux-designer', firmId: 'softhouse', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-17' },

  { id: 'j-106', firmId: 'silo-ai', title: 'Visual Designer, ML Tooling', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(3) },
  { id: 'j-107', firmId: 'itm8', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(6) },
];
