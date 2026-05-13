import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-05-13';

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
  { id: 'j-1', firmId: 'north-kingdom', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: hoursAgo(2), agentFound: true },
  { id: 'j-2', firmId: 'north-kingdom', title: 'Art Director, Brand Films', discipline: 'Art Director', seniority: 'Mid', postedAt: daysAgo(1) },
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
  { id: 'j-12', firmId: 'bakken-baeck', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-13', firmId: 'bakken-baeck', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: daysAgo(4) },
  { id: 'j-14', firmId: 'heydays', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(6) },

  // Copenhagen
  { id: 'j-15', firmId: 'e-types', title: 'Type Designer', discipline: 'Type Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-16', firmId: 'kontrapunkt', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(9) },

  // London
  { id: 'j-17', firmId: 'pentagram', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: hoursAgo(10), agentFound: true },
  { id: 'j-18', firmId: 'pentagram', title: 'Mid Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(2) },
  { id: 'j-19', firmId: 'wolff-olins', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: daysAgo(11) },
  { id: 'j-20', firmId: 'wolff-olins', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'j-21', firmId: 'dn-co', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(7) },
  { id: 'j-22', firmId: 'moving-brands', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(3) },
  { id: 'j-23', firmId: 'the-mill', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-24', firmId: 'the-mill', title: 'CG Lead, Commercials', discipline: 'CG Generalist', seniority: 'Lead', postedAt: daysAgo(8) },
  { id: 'j-25', firmId: 'mpc', title: 'Concept Artist', discipline: 'Concept Artist', seniority: 'Senior', postedAt: daysAgo(2) },

  // Germany
  { id: 'j-26', firmId: 'bureau-borsche', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-27', firmId: 'mutabor', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-28', firmId: 'edenspiekermann', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(10) },
  { id: 'j-29', firmId: 'hort', title: 'Junior Visual Designer', discipline: 'Visual Designer', seniority: 'Junior', postedAt: daysAgo(6) },

  // Netherlands
  { id: 'j-30', firmId: 'studio-dumbar', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-31', firmId: 'random-studio', title: 'Creative Technologist', discipline: 'Motion Designer', seniority: 'Senior', postedAt: hoursAgo(20), agentFound: true },

  // Italy
  { id: 'j-32', firmId: 'la-tigre', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(4) },

  // United States
  { id: 'j-33', firmId: 'collins', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-34', firmId: 'collins', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: hoursAgo(14), agentFound: true },
  { id: 'j-35', firmId: 'mother-design', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-36', firmId: 'gretel', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: daysAgo(6) },
  { id: 'j-37', firmId: 'instrument', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-38', firmId: 'instrument', title: 'Lead 3D Artist', discipline: '3D Artist', seniority: 'Lead', postedAt: daysAgo(5) },
  { id: 'j-39', firmId: 'manual', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(8) },
  { id: 'j-40', firmId: 'character-sf', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(4) },

  // Canada
  { id: 'j-41', firmId: 'metalab', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-42', firmId: 'sid-lee', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(7) },

  // Australia
  { id: 'j-43', firmId: 'method', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: daysAgo(2) },
  { id: 'j-44', firmId: 'for-the-people', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(5) },

  // Iceland, Switzerland
  { id: 'j-45', firmId: 'ueno', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  { id: 'j-46', firmId: 'frontify-creative', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(3) },

  // Engineering & IT consultancies (Band C)
  { id: 'j-47', firmId: 'afry-stockholm', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-48', firmId: 'afry-stockholm', title: 'UX Designer, Industry Digital', discipline: 'UX Designer', seniority: 'Mid', postedAt: hoursAgo(18), agentFound: true },
  { id: 'j-49', firmId: 'afry-gothenburg', title: 'Senior 3D Visualisation Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'j-50', firmId: 'nexer-gothenburg', title: 'Lead Experience Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(1) },
  { id: 'j-51', firmId: 'nexer-stockholm', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-52', firmId: 'knowit-stockholm', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-53', firmId: 'knowit-stockholm', title: 'Art Director, Brand Practice', discipline: 'Art Director', seniority: 'Senior', postedAt: hoursAgo(8), agentFound: true },
  { id: 'j-54', firmId: 'knowit-oslo', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  { id: 'j-55', firmId: 'knowit-helsinki', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(2) },
  { id: 'j-56', firmId: 'tietoevry-helsinki', title: 'Senior Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'j-57', firmId: 'tietoevry-stockholm', title: 'Lead UI Designer', discipline: 'UI Designer', seniority: 'Lead', postedAt: daysAgo(8) },
  { id: 'j-58', firmId: 'visma-oslo', title: 'Senior Product Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-59', firmId: 'cognizant-london', title: 'Creative Director, Digital Practice', discipline: 'Creative Director', seniority: 'Head of', postedAt: daysAgo(7) },
  { id: 'j-60', firmId: 'cognizant-newyork', title: 'Senior 3D Artist, Immersive', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-61', firmId: 'tcs-interactive-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-62', firmId: 'infosys-wongdoody-london', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(4) },

  // Global enterprise consultancies (Band B)
  { id: 'j-63', firmId: 'accenture-song-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: hoursAgo(4), agentFound: true },
  { id: 'j-64', firmId: 'accenture-song-london', title: 'Lead 3D Artist', discipline: '3D Artist', seniority: 'Lead', postedAt: daysAgo(2) },
  { id: 'j-65', firmId: 'accenture-song-dublin', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-66', firmId: 'accenture-song-stockholm', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-67', firmId: 'deloitte-digital-newyork', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-68', firmId: 'deloitte-digital-london', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(6) },
  { id: 'j-69', firmId: 'deloitte-digital-stockholm', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: hoursAgo(12), agentFound: true },
  { id: 'j-70', firmId: 'ideo-sanfrancisco', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-71', firmId: 'ideo-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-72', firmId: 'ideo-tokyo', title: 'Lead Designer, Industrial', discipline: 'Industrial Designer', seniority: 'Lead', postedAt: daysAgo(9) },
  { id: 'j-73', firmId: 'mckinsey-design-newyork', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-74', firmId: 'mckinsey-design-stockholm', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'j-75', firmId: 'designit-copenhagen', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-76', firmId: 'designit-london', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: daysAgo(6) },
  { id: 'j-77', firmId: 'designit-munich', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-78', firmId: 'frog-sanfrancisco', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-79', firmId: 'frog-london', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(4) },
  { id: 'j-80', firmId: 'frog-munich', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(7) },
  { id: 'j-81', firmId: 'ibm-ix-newyork', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-82', firmId: 'publicis-sapient-newyork', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-83', firmId: 'publicis-sapient-london', title: 'Lead Brand Designer', discipline: 'Brand Designer', seniority: 'Lead', postedAt: daysAgo(6) },
  { id: 'j-84', firmId: 'ey-doberman-stockholm', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: hoursAgo(6), agentFound: true },
  { id: 'j-85', firmId: 'ey-doberman-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'j-86', firmId: 'capgemini-invent-paris', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-87', firmId: 'sopra-steria-paris', title: 'Art Director, Digital', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },

  // Cinode customer roster — sample of plausible creative openings
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
