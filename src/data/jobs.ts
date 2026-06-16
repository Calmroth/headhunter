import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-06-16';

export type Job = {
  id: string;
  firmId: string;
  title: string;
  discipline: Discipline;
  seniority: Seniority;
  postedAt: string; // ISO date
  agentFound?: boolean; // surfaced by a background agent this session
};

export const JOBS: Job[] = [
  // Stockholm
  { id: 'j-1', firmId: 'north-kingdom', title: 'Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-2', firmId: 'acne', title: 'Junior Digital Designer', discipline: 'UI Designer', seniority: 'Junior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-3', firmId: 'acne', title: 'Digital Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-4', firmId: 'acne', title: 'E-Commerce Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-5', firmId: 'bvd', title: '3D & Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-6', firmId: 'bvd', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-7', firmId: 'kurppa-hosk', title: 'Packaging/Industrial Designer', discipline: 'Industrial Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-8', firmId: 'kurppa-hosk', title: '3D Artist', discipline: '3D Artist', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-9', firmId: 'goodbye-kansas', title: 'Realtime FX Artist', discipline: 'CG Generalist', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-10', firmId: 'goodbye-kansas', title: 'Creature Artist (Lookdev & Groom)', discipline: 'CG Generalist', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },

  // Oslo
  { id: 'j-11', firmId: 'bakken-baeck', title: 'Product Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-12', firmId: 'bakken-baeck', title: 'Lead Product Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-13', firmId: 'bakken-baeck', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-14', firmId: 'bakken-baeck', title: 'Digital Design Lead', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-15', firmId: 'bakken-baeck', title: 'Design Director — Digital', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-03-10', agentFound: true },
  { id: 'j-16', firmId: 'bakken-baeck', title: 'Freelance — Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-17', firmId: 'bakken-baeck', title: 'Freelance — Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },

  // Copenhagen
  { id: 'j-18', firmId: 'kontrapunkt', title: 'Concept Designer', discipline: 'Concept Artist', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },

  // London
  { id: 'j-19', firmId: 'pentagram', title: 'Midweight Designer — Brand & Systems', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-01-26', agentFound: true },
  { id: 'j-20', firmId: 'pentagram', title: 'Senior Graphic Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2025-12-23', agentFound: true },
  { id: 'j-21', firmId: 'wolff-olins', title: 'Senior Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-22', firmId: 'dn-co', title: 'Senior Brand and Motion Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-23', firmId: 'dn-co', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-24', firmId: 'dn-co', title: 'Junior Designer', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2025-05-30', agentFound: true },
  { id: 'j-25', firmId: 'moving-brands', title: 'Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-26', firmId: 'moving-brands', title: 'Freelance Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-27', firmId: 'the-mill', title: '2D VFX Supervisor', discipline: 'CG Generalist', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-28', firmId: 'mpc', title: '3D Generalist', discipline: 'CG Generalist', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-29', firmId: 'mpc', title: 'Senior CG Generalist', discipline: 'CG Generalist', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-30', firmId: 'mpc', title: 'Lead VFX Concept Artist', discipline: 'Concept Artist', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-31', firmId: 'mpc', title: 'Senior Lighting Artist', discipline: 'CG Generalist', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-32', firmId: 'mpc', title: 'Previs Generalist', discipline: 'CG Generalist', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },

  // Germany
  { id: 'j-33', firmId: 'mutabor', title: 'Junior Art Director Digital', discipline: 'Art Director', seniority: 'Junior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-34', firmId: 'mutabor', title: 'Art Director Design', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-35', firmId: 'mutabor', title: 'Art Director Interior Design / Retail Design', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-36', firmId: 'mutabor', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-37', firmId: 'mutabor', title: 'Trainee Design', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-38', firmId: 'edenspiekermann', title: 'Senior Brand / Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-39', firmId: 'edenspiekermann', title: 'Senior Interaction Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-40', firmId: 'edenspiekermann', title: 'Senior UI/UX Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-41', firmId: 'edenspiekermann', title: 'UI/UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-42', firmId: 'edenspiekermann', title: 'Service / UX Designer (Junior/Medior)', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-43', firmId: 'edenspiekermann', title: 'Digital Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-44', firmId: 'edenspiekermann', title: 'Product Designer HMI / Automotive — 3D/Motion', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-45', firmId: 'edenspiekermann', title: 'Design Director (initiative application)', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },

  // Netherlands
  { id: 'j-46', firmId: 'random-studio', title: 'Senior Spatial Designer', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-47', firmId: 'random-studio', title: 'Medior Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-48', firmId: 'random-studio', title: 'Medior Interior Architect Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-49', firmId: 'random-studio', title: 'Creative Lead', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-50', firmId: 'random-studio', title: 'Spatial Design Intern', discipline: '3D Artist', seniority: 'Junior', postedAt: '2026-06-16', agentFound: true },

  // Switzerland
  { id: 'j-51', firmId: 'frontify-creative', title: 'Senior Product Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-52', firmId: 'frontify-creative', title: 'Principal Product Designer – Group Guidelines & Finder', discipline: 'UI Designer', seniority: 'Principal', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-53', firmId: 'frontify-creative', title: 'Principal Product Designer – Design Systems', discipline: 'UI Designer', seniority: 'Principal', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-54', firmId: 'frontify-creative', title: 'Senior Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },

  // United States
  { id: 'j-55', firmId: 'collins', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-56', firmId: 'mother-design', title: 'Senior Branding Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-57', firmId: 'mother-design', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-58', firmId: 'mother-design', title: 'MW Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-59', firmId: 'gretel', title: 'Senior Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-60', firmId: 'gretel', title: 'Mid Level Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-61', firmId: 'instrument', title: 'Executive Creative Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-62', firmId: 'instrument', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-63', firmId: 'instrument', title: 'Associate Design Director (Contract)', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-64', firmId: 'instrument', title: 'Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-65', firmId: 'instrument', title: 'Brand/Visual Designer (Freelance Roster)', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-66', firmId: 'instrument', title: 'Motion Designer, Freelance (South America)', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-67', firmId: 'instrument', title: 'Motion Designer, Freelance (Asia)', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-68', firmId: 'instrument', title: 'Production Designer, Web & Design Systems (Freelance)', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },

  // Canada
  { id: 'j-69', firmId: 'metalab', title: 'Executive Design Director (Brand, Product & Experience)', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-02-23', agentFound: true },
  { id: 'j-70', firmId: 'metalab', title: 'Principal Brand Designer', discipline: 'Brand Designer', seniority: 'Principal', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-71', firmId: 'metalab', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-72', firmId: 'metalab', title: 'AI Native Sr. Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-73', firmId: 'sid-lee', title: 'Art Director', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-74', firmId: 'sid-lee', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-75', firmId: 'sid-lee', title: 'Creative Director, NY', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-76', firmId: 'sid-lee', title: 'Designer UI', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },

  // Australia
  { id: 'j-77', firmId: 'method', title: 'Associate Director, Experience Design', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-78', firmId: 'method', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-79', firmId: 'method', title: 'Senior Experience Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-80', firmId: 'for-the-people', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },

  // Global enterprise consultancies (Band B) — Accenture Song unreachable, entries retained
  { id: 'j-81', firmId: 'accenture-song-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-16' },
  { id: 'j-82', firmId: 'accenture-song-london', title: 'Lead 3D Artist', discipline: '3D Artist', seniority: 'Lead', postedAt: '2026-06-14' },
  { id: 'j-83', firmId: 'accenture-song-dublin', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-13' },
  { id: 'j-84', firmId: 'accenture-song-stockholm', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-15' },
  { id: 'j-85', firmId: 'deloitte-digital-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-86', firmId: 'deloitte-digital-newyork', title: 'UI/UX Designer – Consultant', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-87', firmId: 'deloitte-digital-newyork', title: 'UX Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-88', firmId: 'deloitte-digital-london', title: 'Lead UX Designer, Product Enabled Solutions', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-89', firmId: 'deloitte-digital-london', title: 'UX Designer – Consultant', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-90', firmId: 'deloitte-digital-london', title: 'Visual Designer – Consultant', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-91', firmId: 'deloitte-digital-london', title: 'Senior User Experience Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-92', firmId: 'deloitte-digital-london', title: 'Experience Designer / Service Designer (Defence and Security)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-93', firmId: 'deloitte-digital-stockholm', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-02-20', agentFound: true },
  { id: 'j-94', firmId: 'ideo-sanfrancisco', title: 'Industrial Designer', discipline: 'Industrial Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-95', firmId: 'ideo-sanfrancisco', title: 'Design Research Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-96', firmId: 'ideo-london', title: 'Design Researcher (Individual Contributor)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-97', firmId: 'ideo-tokyo', title: 'Interaction Designer (D4V Visual Interaction Designer)', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-98', firmId: 'ideo-tokyo', title: 'Visual Communications Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  // McKinsey Design unreachable (HTTP 403), entries retained
  { id: 'j-99', firmId: 'mckinsey-design-newyork', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-14' },
  { id: 'j-100', firmId: 'mckinsey-design-stockholm', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-12' },
  { id: 'j-101', firmId: 'frog-sanfrancisco', title: 'Sr. Design Technologist', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-102', firmId: 'frog-sanfrancisco', title: 'Design Director, Interaction Design', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-103', firmId: 'frog-london', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-03-24', agentFound: true },
  { id: 'j-104', firmId: 'frog-london', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-02-18', agentFound: true },
  { id: 'j-105', firmId: 'frog-london', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-02-18', agentFound: true },
  { id: 'j-106', firmId: 'frog-munich', title: 'Experience Designer (m/w/d)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-107', firmId: 'frog-munich', title: 'Experience Design Intern', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-108', firmId: 'ibm-ix-newyork', title: 'Senior UX Designer – IBM iX', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-109', firmId: 'ibm-ix-newyork', title: 'Associate Designer 2026', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-110', firmId: 'publicis-sapient-newyork', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-111', firmId: 'publicis-sapient-newyork', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-112', firmId: 'publicis-sapient-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-113', firmId: 'publicis-sapient-london', title: 'UX/UI Designer – SaaS', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-114', firmId: 'ey-doberman-stockholm', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-115', firmId: 'capgemini-invent-paris', title: 'frog – Experience Designer (Paris)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-116', firmId: 'capgemini-invent-paris', title: 'Experience Designer II', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-117', firmId: 'sopra-steria-paris', title: 'UX/UI Designer – Editeur de logiciels', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-118', firmId: 'sopra-steria-paris', title: 'UX/UI Designer – BL Solutions & Expertises', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-119', firmId: 'sopra-steria-paris', title: 'UX Designer – Défense & Sécurité', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-120', firmId: 'sopra-steria-paris', title: 'UX/UI Designer – SBS Paris', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-121', firmId: 'sopra-steria-paris', title: 'Designer – Direction Artistique', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },

  // Engineering & IT consultancies (Band C)
  { id: 'j-122', firmId: 'afry-stockholm', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-123', firmId: 'afry-gothenburg', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-124', firmId: 'afry-gothenburg', title: 'Experienced Visualization and Graphical Designer Lead', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-05-22', agentFound: true },
  { id: 'j-125', firmId: 'nexer-gothenburg', title: 'Erfaren Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-126', firmId: 'knowit-oslo', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-127', firmId: 'knowit-oslo', title: 'Senior Interaction Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-128', firmId: 'tietoevry-helsinki', title: 'Junior UX Designer', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-129', firmId: 'tietoevry-helsinki', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-130', firmId: 'tietoevry-helsinki', title: 'Senior Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-131', firmId: 'tietoevry-helsinki', title: 'UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-132', firmId: 'tietoevry-stockholm', title: 'UX/UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-133', firmId: 'tietoevry-stockholm', title: 'Senior UX/UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  // Visma Oslo unreachable (all found roles had expired deadlines), entry retained
  { id: 'j-134', firmId: 'visma-oslo', title: 'Senior Product Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-11' },
  { id: 'j-135', firmId: 'cognizant-london', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-136', firmId: 'cognizant-newyork', title: 'Digital Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-137', firmId: 'cognizant-newyork', title: 'Experience Strategist', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2025-12-17', agentFound: true },
  { id: 'j-138', firmId: 'tcs-interactive-london', title: 'Senior Product Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-02-25', agentFound: true },
  { id: 'j-139', firmId: 'tcs-interactive-london', title: 'Junior Product Designer', discipline: 'UI Designer', seniority: 'Junior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-140', firmId: 'infosys-wongdoody-london', title: 'Creative Director – Visual Design', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-141', firmId: 'infosys-wongdoody-london', title: 'UX Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-142', firmId: 'infosys-wongdoody-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-143', firmId: 'infosys-wongdoody-london', title: 'Service Design Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-16', agentFound: true },

  // Cinode customer roster
  { id: 'j-144', firmId: 'consid', title: 'UX-designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-145', firmId: 'hiq', title: 'UX-designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-146', firmId: 'hiq', title: 'UI-designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-147', firmId: 'vincit', title: 'Senior UI/UX Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-148', firmId: 'twoday', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-149', firmId: 'twoday', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-150', firmId: 'nitor', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-151', firmId: 'nitor', title: 'Senior Digital Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-152', firmId: 'telia', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-10', agentFound: true },
  { id: 'j-153', firmId: 'telia', title: 'UX/UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-10', agentFound: true },
  { id: 'j-154', firmId: 'knightec', title: 'Junior UX-Designer', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-155', firmId: 'knightec', title: 'UX-Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-156', firmId: 'knightec', title: 'UX-Designer within digi-physical design', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-157', firmId: 'knightec', title: 'UX/UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-03-01', agentFound: true },
  { id: 'j-158', firmId: 'knightec', title: 'Senior Interaktionsdesigner', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-05-01', agentFound: true },
  { id: 'j-159', firmId: 'fujitsu-tokyo', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-160', firmId: 'prevas', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-161', firmId: 'b3', title: 'UX-Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-162', firmId: 'hm', title: 'Design System Manager', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-163', firmId: 'hm', title: 'Digital Experience Designer (UX)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-164', firmId: 'hm', title: 'UI/UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-165', firmId: 'centigo', title: 'Senior UX designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-166', firmId: 'forefront', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-167', firmId: 'techseed', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-168', firmId: 'techseed', title: 'Head of Design', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-169', firmId: 'castra', title: 'UX/UI Designer – Konsult till bankkund', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-170', firmId: 'tretton37', title: 'Techsavvy Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16', agentFound: true },
  { id: 'j-171', firmId: 'softhouse', title: 'UX/UI-designer till Softhouse Småland', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2024-11-24', agentFound: true },
];
