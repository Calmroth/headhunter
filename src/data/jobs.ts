import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-07-07';

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
  // Stockholm — Band A (unreachable firms retain prior snapshot)
  { id: 'j-3', firmId: 'acne', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(2) },
  { id: 'j-4', firmId: 'snask', title: 'Lead Brand Designer', discipline: 'Brand Designer', seniority: 'Lead', postedAt: daysAgo(3) },
  { id: 'j-5', firmId: 'bvd', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-6', firmId: 'kurppa-hosk', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: daysAgo(7) },
  // Goodbye Kansas — live 2026-07-07 (replaced prior entries)
  { id: 'j-134', firmId: 'goodbye-kansas', title: 'Realtime Artist', discipline: '3D Artist', seniority: 'Mid', postedAt: '2026-07-07' },
  { id: 'j-135', firmId: 'goodbye-kansas', title: 'Crowd FX Artist', discipline: 'CG Generalist', seniority: 'Mid', postedAt: '2026-07-07' },

  // Helsinki — Band A (unreachable)
  { id: 'j-9', firmId: 'bond', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-10', firmId: 'bond', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(8) },
  { id: 'j-11', firmId: 'kurppa', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },

  // Oslo — Band A
  { id: 'j-14', firmId: 'heydays', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(6) },
  // Bakken & Bæck — live 2026-07-07
  { id: 'j-124', firmId: 'bakken-baeck', title: 'Lead Product Designer', discipline: 'UI Designer', seniority: 'Lead', postedAt: '2026-07-07' },
  { id: 'j-125', firmId: 'bakken-baeck', title: 'Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-07' },
  { id: 'j-126', firmId: 'bakken-baeck', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-07' },
  { id: 'j-127', firmId: 'bakken-baeck', title: 'Freelance Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-07-07' },
  { id: 'j-128', firmId: 'bakken-baeck', title: 'Freelance Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-07-07' },

  // Copenhagen — Band A (unreachable)
  { id: 'j-15', firmId: 'e-types', title: 'Type Designer', discipline: 'Type Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-16', firmId: 'kontrapunkt', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(9) },

  // London — Band A (unreachable firms retain prior snapshot)
  { id: 'j-19', firmId: 'wolff-olins', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: daysAgo(11) },
  { id: 'j-20', firmId: 'wolff-olins', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  // DN&Co — live 2026-07-07
  { id: 'j-136', firmId: 'dn-co', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-07' },
  { id: 'j-22', firmId: 'moving-brands', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(3) },
  { id: 'j-23', firmId: 'the-mill', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-24', firmId: 'the-mill', title: 'CG Lead, Commercials', discipline: 'CG Generalist', seniority: 'Lead', postedAt: daysAgo(8) },

  // Germany — Band A (unreachable except Mutabor)
  { id: 'j-26', firmId: 'bureau-borsche', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },
  // Mutabor — live 2026-07-07
  { id: 'j-129', firmId: 'mutabor', title: 'Art/Copy Team Advertising', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-07-07' },
  { id: 'j-130', firmId: 'mutabor', title: 'Designer Corporate Design', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-07-07' },
  { id: 'j-131', firmId: 'mutabor', title: 'Senior Art Director Creative Team', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-07-07' },
  { id: 'j-132', firmId: 'mutabor', title: 'Senior Brand Designer Sport & Lifestyle', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-07' },
  { id: 'j-133', firmId: 'mutabor', title: 'Senior Type Designer', discipline: 'Type Designer', seniority: 'Senior', postedAt: '2026-07-07' },
  { id: 'j-28', firmId: 'edenspiekermann', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(10) },
  { id: 'j-29', firmId: 'hort', title: 'Junior Visual Designer', discipline: 'Visual Designer', seniority: 'Junior', postedAt: daysAgo(6) },

  // Netherlands — Band A (unreachable)
  { id: 'j-31', firmId: 'random-studio', title: 'Creative Technologist', discipline: 'Motion Designer', seniority: 'Senior', postedAt: hoursAgo(20), agentFound: true },

  // Italy — Band A (unreachable)
  { id: 'j-32', firmId: 'la-tigre', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(4) },

  // United States — Band A (unreachable firms retain prior snapshot)
  { id: 'j-33', firmId: 'collins', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-34', firmId: 'collins', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: hoursAgo(14), agentFound: true },
  { id: 'j-35', firmId: 'mother-design', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-36', firmId: 'gretel', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: daysAgo(6) },
  { id: 'j-40', firmId: 'character-sf', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(4) },

  // Canada — MetaLab & Sid Lee live 2026-07-07
  { id: 'j-137', firmId: 'metalab', title: 'Principal Product Designer', discipline: 'UI Designer', seniority: 'Principal', postedAt: '2026-07-07' },
  { id: 'j-138', firmId: 'metalab', title: 'Brand Director', discipline: 'Brand Designer', seniority: 'Head of', postedAt: '2026-07-07' },
  { id: 'j-139', firmId: 'metalab', title: 'AI Native Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-07' },
  { id: 'j-140', firmId: 'metalab', title: 'Motion Design Specialist', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-07-07' },
  { id: 'j-141', firmId: 'sid-lee', title: 'Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-07' },
  { id: 'j-142', firmId: 'sid-lee', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-07-07' },
  { id: 'j-143', firmId: 'sid-lee', title: 'Art Director Content', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-07-07' },

  // Australia — Band A (unreachable)
  { id: 'j-43', firmId: 'method', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: daysAgo(2) },
  { id: 'j-44', firmId: 'for-the-people', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(5) },

  // Iceland — Band A (unreachable)
  { id: 'j-45', firmId: 'ueno', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(6) },

  // Switzerland — Frontify Studio live 2026-07-07
  { id: 'j-144', firmId: 'frontify-creative', title: 'Midweight Creative Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-07' },
  { id: 'j-145', firmId: 'frontify-creative', title: 'Principal Product Designer', discipline: 'UI Designer', seniority: 'Principal', postedAt: '2026-07-07' },
  { id: 'j-146', firmId: 'frontify-creative', title: 'Senior Product Researcher', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-07' },

  // Engineering & IT consultancies (Band C) — live data from 2026-07-07 refresh
  { id: 'j-147', firmId: 'nexer-gothenburg', title: 'Senior UX/UI Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-26' },
  { id: 'j-148', firmId: 'visma-oslo', title: 'UX Intern', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-07-07' },
  { id: 'j-149', firmId: 'tcs-interactive-london', title: 'Senior Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-16' },

  // Global enterprise consultancies (Band B) — live data from 2026-07-07 refresh
  { id: 'j-109', firmId: 'deloitte-digital-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-07' },
  { id: 'j-110', firmId: 'deloitte-digital-london', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-07' },
  { id: 'j-111', firmId: 'deloitte-digital-stockholm', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-02-20' },
  { id: 'j-112', firmId: 'mckinsey-design-newyork', title: 'Digital Designer UX/UI', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-07' },
  { id: 'j-113', firmId: 'mckinsey-design-newyork', title: 'Senior Experience Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-07' },
  { id: 'j-114', firmId: 'frog-london', title: 'Midweight Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-07' },
  { id: 'j-115', firmId: 'ibm-ix-newyork', title: 'Senior UX Designer, IBM iX', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-07' },
  { id: 'j-116', firmId: 'publicis-sapient-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-07' },
  { id: 'j-117', firmId: 'ey-doberman-newyork', title: 'Studio+ Experience Designer, Senior UX/UI', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-07' },
  { id: 'j-118', firmId: 'ey-doberman-newyork', title: 'Studio+ Experience Design Director UX/UI', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-07-07' },
  { id: 'j-119', firmId: 'capgemini-invent-paris', title: 'frog Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-07' },
  { id: 'j-120', firmId: 'capgemini-invent-paris', title: 'frog Experience Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-07' },
  { id: 'j-121', firmId: 'capgemini-invent-paris', title: 'frog UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-07' },
  { id: 'j-122', firmId: 'sopra-steria-paris', title: 'Designer Direction Artistique', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-07-07' },
  { id: 'j-123', firmId: 'sopra-steria-paris', title: 'UX/UI Designer confirmé', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-07' },

  // Cinode roster — unreachable firms retain prior snapshot
  { id: 'j-95', firmId: 'knightec', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: hoursAgo(11), agentFound: true },
  { id: 'j-96', firmId: 'prevas', title: 'Industrial Designer, Embedded', discipline: 'Industrial Designer', seniority: 'Mid', postedAt: daysAgo(7) },
  { id: 'j-97', firmId: 'b3', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-98', firmId: 'omegapoint', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-102', firmId: 'tretton37', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'j-103', firmId: 'plantvision', title: 'Industrial Designer, Pharma', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(9) },
  { id: 'j-104', firmId: 'advania-reykjavik', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-105', firmId: 'softhouse', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(2) },

  // Cinode roster — confirmed live 2026-07-07
  { id: 'j-108', firmId: 'telia', title: 'Head of Digital Experience', discipline: 'UX Designer', seniority: 'Head of', postedAt: '2026-07-03' },
];
