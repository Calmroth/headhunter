import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-06-24';

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
  { id: 'j-1', firmId: 'north-kingdom', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-06-24', agentFound: true },
  { id: 'j-2', firmId: 'north-kingdom', title: 'Art Director, Brand Films', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-23' },
  { id: 'j-3', firmId: 'acne', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-22' },
  { id: 'j-4', firmId: 'snask', title: 'Lead Brand Designer', discipline: 'Brand Designer', seniority: 'Lead', postedAt: '2026-06-21' },
  { id: 'j-5', firmId: 'bvd', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-19' },
  { id: 'j-6', firmId: 'kurppa-hosk', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'j-7', firmId: 'goodbye-kansas', title: 'CG Generalist, Film', discipline: 'CG Generalist', seniority: 'Senior', postedAt: '2026-06-24', agentFound: true },
  { id: 'j-8', firmId: 'goodbye-kansas', title: 'Concept Artist', discipline: 'Concept Artist', seniority: 'Mid', postedAt: '2026-06-20' },

  // Helsinki
  { id: 'j-9', firmId: 'bond', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'j-10', firmId: 'bond', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-16' },
  { id: 'j-11', firmId: 'kurppa', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-19' },

  // Oslo
  { id: 'j-12', firmId: 'bakken-baeck', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  { id: 'j-13', firmId: 'bakken-baeck', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-20' },
  { id: 'j-14', firmId: 'heydays', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-18' },

  // Copenhagen
  { id: 'j-15', firmId: 'e-types', title: 'Type Designer', discipline: 'Type Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'j-16', firmId: 'kontrapunkt', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-15' },

  // London
  { id: 'j-17', firmId: 'pentagram', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-24', agentFound: true },
  { id: 'j-18', firmId: 'pentagram', title: 'Mid Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-22' },
  { id: 'j-19', firmId: 'wolff-olins', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-06-13' },
  { id: 'j-20', firmId: 'wolff-olins', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-20' },
  { id: 'j-21', firmId: 'dn-co', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'j-22', firmId: 'moving-brands', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-21' },
  { id: 'j-23', firmId: 'the-mill', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-06-23' },
  { id: 'j-24', firmId: 'the-mill', title: 'CG Lead, Commercials', discipline: 'CG Generalist', seniority: 'Lead', postedAt: '2026-06-16' },
  { id: 'j-25', firmId: 'mpc', title: 'Concept Artist', discipline: 'Concept Artist', seniority: 'Senior', postedAt: '2026-06-22' },

  // Germany
  { id: 'j-26', firmId: 'bureau-borsche', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-19' },
  { id: 'j-27', firmId: 'mutabor', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'j-28', firmId: 'edenspiekermann', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-14' },
  { id: 'j-29', firmId: 'hort', title: 'Junior Visual Designer', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-06-18' },

  // Netherlands
  { id: 'j-30', firmId: 'studio-dumbar', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'j-31', firmId: 'random-studio', title: 'Creative Technologist', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-24', agentFound: true },

  // Italy
  { id: 'j-32', firmId: 'la-tigre', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-20' },

  // United States
  { id: 'j-33', firmId: 'collins', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  { id: 'j-34', firmId: 'collins', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-24', agentFound: true },
  { id: 'j-35', firmId: 'mother-design', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'j-36', firmId: 'gretel', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'j-37', firmId: 'instrument', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'j-38', firmId: 'instrument', title: 'Lead 3D Artist', discipline: '3D Artist', seniority: 'Lead', postedAt: '2026-06-19' },
  { id: 'j-39', firmId: 'manual', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-16' },
  { id: 'j-40', firmId: 'character-sf', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-20' },

  // Canada
  { id: 'j-41', firmId: 'metalab', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'j-42', firmId: 'sid-lee', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-17' },

  // Australia
  { id: 'j-43', firmId: 'method', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-22' },
  { id: 'j-44', firmId: 'for-the-people', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-19' },

  // Iceland, Switzerland
  { id: 'j-45', firmId: 'ueno', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'j-46', firmId: 'frontify-creative', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-21' },

  // Engineering & IT consultancies (Band C)
  { id: 'j-47', firmId: 'afry-stockholm', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'j-48', firmId: 'afry-stockholm', title: 'UX Designer, Industry Digital', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-24', agentFound: true },
  { id: 'j-49', firmId: 'afry-gothenburg', title: 'Senior 3D Visualisation Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-06-20' },
  { id: 'j-50', firmId: 'nexer-gothenburg', title: 'Lead Experience Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-23' },
  { id: 'j-51', firmId: 'nexer-stockholm', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-19' },
  { id: 'j-52', firmId: 'knowit-stockholm', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'j-53', firmId: 'knowit-stockholm', title: 'Art Director, Brand Practice', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-24', agentFound: true },
  { id: 'j-54', firmId: 'knowit-oslo', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'j-55', firmId: 'knowit-helsinki', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-22' },
  { id: 'j-56', firmId: 'tietoevry-helsinki', title: 'Senior Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-20' },
  { id: 'j-57', firmId: 'tietoevry-stockholm', title: 'Lead UI Designer', discipline: 'UI Designer', seniority: 'Lead', postedAt: '2026-06-16' },
  { id: 'j-58', firmId: 'visma-oslo', title: 'Senior Product Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-19' },
  { id: 'j-59', firmId: 'cognizant-london', title: 'Creative Director, Digital Practice', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-06-17' },
  { id: 'j-60', firmId: 'cognizant-newyork', title: 'Senior 3D Artist, Immersive', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'j-61', firmId: 'tcs-interactive-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-19' },
  { id: 'j-62', firmId: 'infosys-wongdoody-london', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-20' },

  // Global enterprise consultancies (Band B)
  { id: 'j-63', firmId: 'accenture-song-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-24', agentFound: true },
  { id: 'j-64', firmId: 'accenture-song-london', title: 'Lead 3D Artist', discipline: '3D Artist', seniority: 'Lead', postedAt: '2026-06-22' },
  { id: 'j-65', firmId: 'accenture-song-dublin', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'j-66', firmId: 'accenture-song-stockholm', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-23' },
  { id: 'j-67', firmId: 'deloitte-digital-newyork', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'j-68', firmId: 'deloitte-digital-london', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'j-69', firmId: 'deloitte-digital-stockholm', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-24', agentFound: true },
  { id: 'j-70', firmId: 'ideo-sanfrancisco', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'j-71', firmId: 'ideo-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-19' },
  { id: 'j-72', firmId: 'ideo-tokyo', title: 'Lead Designer, Industrial', discipline: 'Industrial Designer', seniority: 'Lead', postedAt: '2026-06-15' },
  { id: 'j-73', firmId: 'mckinsey-design-newyork', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'j-74', firmId: 'mckinsey-design-stockholm', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-20' },
  { id: 'j-75', firmId: 'designit-copenhagen', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'j-76', firmId: 'designit-london', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'j-77', firmId: 'designit-munich', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'j-78', firmId: 'frog-sanfrancisco', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-06-23' },
  { id: 'j-79', firmId: 'frog-london', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-20' },
  { id: 'j-80', firmId: 'frog-munich', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  { id: 'j-81', firmId: 'ibm-ix-newyork', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-19' },
  { id: 'j-82', firmId: 'publicis-sapient-newyork', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'j-83', firmId: 'publicis-sapient-london', title: 'Lead Brand Designer', discipline: 'Brand Designer', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'j-84', firmId: 'ey-doberman-stockholm', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-24', agentFound: true },
  { id: 'j-85', firmId: 'ey-doberman-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-20' },
  { id: 'j-86', firmId: 'capgemini-invent-paris', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'j-87', firmId: 'sopra-steria-paris', title: 'Art Director, Digital', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-19' },

  // Cinode customer roster — sample of plausible creative openings
  { id: 'j-88', firmId: 'rejlers', title: 'Industrial Designer, Energy', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-06-20' },
  { id: 'j-89', firmId: 'consid', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-24', agentFound: true },
  { id: 'j-90', firmId: 'hiq', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'j-91', firmId: 'hiq', title: 'Art Director, Brand Practice', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-19' },
  { id: 'j-92', firmId: 'vincit', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'j-93', firmId: 'twoday', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-23' },
  { id: 'j-94', firmId: 'nitor', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'j-95', firmId: 'knightec', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-06-24', agentFound: true },
  { id: 'j-96', firmId: 'prevas', title: 'Industrial Designer, Embedded', discipline: 'Industrial Designer', seniority: 'Mid', postedAt: '2026-06-17' },
  { id: 'j-97', firmId: 'b3', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'j-98', firmId: 'omegapoint', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-19' },
  { id: 'j-99', firmId: 'forefront', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-22' },
  { id: 'j-100', firmId: 'centigo', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'j-101', firmId: 'bybrick', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-24', agentFound: true },
  { id: 'j-102', firmId: 'tretton37', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-20' },
  { id: 'j-103', firmId: 'plantvision', title: 'Industrial Designer, Pharma', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-06-15' },
  { id: 'j-104', firmId: 'advania-reykjavik', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-19' },
  { id: 'j-105', firmId: 'softhouse', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'j-106', firmId: 'silo-ai', title: 'Visual Designer, ML Tooling', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'j-107', firmId: 'itm8', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },

  // Newly found via live search — 2026-06-24 refresh
  // Consid
  { id: 'j-108', firmId: 'consid', title: 'Senior UX-writer / Content Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  { id: 'j-109', firmId: 'consid', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  // HiQ
  { id: 'j-110', firmId: 'hiq', title: 'UI-Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  { id: 'j-111', firmId: 'hiq', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  { id: 'j-112', firmId: 'hiq', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  // Vincit
  { id: 'j-113', firmId: 'vincit', title: 'Senior UI/UX Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  // Nitor
  { id: 'j-114', firmId: 'nitor', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  { id: 'j-115', firmId: 'nitor', title: 'Senior Digital Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  // Telia
  { id: 'j-116', firmId: 'telia', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  { id: 'j-117', firmId: 'telia', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  { id: 'j-118', firmId: 'telia', title: 'UX/UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  { id: 'j-119', firmId: 'telia', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  // Knightec
  { id: 'j-120', firmId: 'knightec', title: 'Senior Interaktionsdesigner', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-04-08' },
  { id: 'j-121', firmId: 'knightec', title: 'UX/UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-03-11' },
  { id: 'j-122', firmId: 'knightec', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  // H&M
  { id: 'j-123', firmId: 'hm', title: 'Design System Manager', discipline: 'UI Designer', seniority: 'Lead', postedAt: '2026-06-24' },
  { id: 'j-124', firmId: 'hm', title: 'Digital Experience Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  { id: 'j-125', firmId: 'hm', title: 'Experience Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  // Forefront
  { id: 'j-126', firmId: 'forefront', title: 'Tjänstedesigner', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  // AFRY Stockholm
  { id: 'j-127', firmId: 'afry-stockholm', title: 'Director, Design Services', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-01-30' },
  // Nexer Gothenburg
  { id: 'j-128', firmId: 'nexer-gothenburg', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2025-04-06' },
  // TietoEvry Helsinki
  { id: 'j-129', firmId: 'tietoevry-helsinki', title: 'Senior UX/UI Designer, Care Studio', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  { id: 'j-130', firmId: 'tietoevry-helsinki', title: 'UX/UI Designer, Banktech', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  { id: 'j-131', firmId: 'tietoevry-helsinki', title: 'UX Lead, Banking', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2025-05-15' },
  { id: 'j-132', firmId: 'tietoevry-helsinki', title: 'Senior UX/UI Designer, Tech Services Sweden', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  // Visma Oslo
  { id: 'j-133', firmId: 'visma-oslo', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  // Cognizant London
  { id: 'j-134', firmId: 'cognizant-london', title: 'Entry-level UX/UI Designer', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-24' },
  { id: 'j-135', firmId: 'cognizant-london', title: 'UI/UX Consultant', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  { id: 'j-136', firmId: 'cognizant-london', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2025-07-14' },
  { id: 'j-137', firmId: 'cognizant-london', title: 'Digital Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  { id: 'j-138', firmId: 'cognizant-london', title: 'Senior UX/UI Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  // Infosys WongDoody London
  { id: 'j-139', firmId: 'infosys-wongdoody-london', title: 'Creative Director, Visual Design', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-24' },
  { id: 'j-140', firmId: 'infosys-wongdoody-london', title: 'Creative Director, Innovation & Technology', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2025-07-15' },
  { id: 'j-141', firmId: 'infosys-wongdoody-london', title: 'UX Director', discipline: 'UX Designer', seniority: 'Head of', postedAt: '2025-12-27' },
  { id: 'j-142', firmId: 'infosys-wongdoody-london', title: 'Design Lead', discipline: 'UI Designer', seniority: 'Lead', postedAt: '2026-06-24' },
  { id: 'j-143', firmId: 'infosys-wongdoody-london', title: 'Service Design Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-24' },
  { id: 'j-144', firmId: 'infosys-wongdoody-london', title: 'UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  { id: 'j-145', firmId: 'infosys-wongdoody-london', title: 'Director, Creative Technologist', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-06-24' },
  { id: 'j-146', firmId: 'infosys-wongdoody-london', title: 'Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-24' },
];
