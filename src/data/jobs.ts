import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-07-01';

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
  // Stockholm — North Kingdom (live: 1 role)
  { id: 'j-108', firmId: 'north-kingdom', title: 'Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // Stockholm — ACNE Studios Creative (live: 3 roles)
  { id: 'j-109', firmId: 'acne', title: "Senior Men's Wear Designer", discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-110', firmId: 'acne', title: 'Junior Designer', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-111', firmId: 'acne', title: 'Junior Digital Designer', discipline: 'UI Designer', seniority: 'Junior', postedAt: '2026-07-01', agentFound: true },

  // Stockholm — Snask (unreachable — keep existing)
  { id: 'j-4', firmId: 'snask', title: 'Lead Brand Designer', discipline: 'Brand Designer', seniority: 'Lead', postedAt: daysAgo(3) },

  // Stockholm — BVD (live: 2 roles)
  { id: 'j-112', firmId: 'bvd', title: '3D & Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-113', firmId: 'bvd', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // Stockholm — Kurppa Hosk (live: 2 roles)
  { id: 'j-114', firmId: 'kurppa-hosk', title: 'Junior Brand Designer', discipline: 'Brand Designer', seniority: 'Junior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-115', firmId: 'kurppa-hosk', title: 'Packaging/Industrial Designer', discipline: 'Industrial Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // Stockholm — Goodbye Kansas Studios (live: 3 roles)
  { id: 'j-116', firmId: 'goodbye-kansas', title: 'Realtime FX Artist', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-117', firmId: 'goodbye-kansas', title: 'Senior Build Artist', discipline: 'CG Generalist', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-118', firmId: 'goodbye-kansas', title: 'Senior Character & Creature Artist', discipline: 'CG Generalist', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // Helsinki — Bond (live: 1 role)
  { id: 'j-119', firmId: 'bond', title: 'Freelancer (Brand Design)', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // Helsinki — Kurppa Studio (unreachable — keep existing)
  { id: 'j-11', firmId: 'kurppa', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },

  // Oslo — Bakken & Baeck (live: 5 roles)
  { id: 'j-120', firmId: 'bakken-baeck', title: 'Creative Lead', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-121', firmId: 'bakken-baeck', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-03', agentFound: true },
  { id: 'j-122', firmId: 'bakken-baeck', title: 'Lead Product Designer', discipline: 'UI Designer', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-123', firmId: 'bakken-baeck', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-124', firmId: 'bakken-baeck', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // Oslo — Heydays (unreachable — keep existing)
  { id: 'j-14', firmId: 'heydays', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(6) },

  // Copenhagen — e-Types (unreachable — keep existing)
  { id: 'j-15', firmId: 'e-types', title: 'Type Designer', discipline: 'Type Designer', seniority: 'Senior', postedAt: daysAgo(3) },

  // Copenhagen — Kontrapunkt (live: 1 role)
  { id: 'j-125', firmId: 'kontrapunkt', title: 'Concept Designer', discipline: 'Concept Artist', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // London — Pentagram (live: 1 role)
  { id: 'j-126', firmId: 'pentagram', title: 'Mid-weight Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-01-26', agentFound: true },

  // London — Wolff Olins (live: 4 roles)
  { id: 'j-127', firmId: 'wolff-olins', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-128', firmId: 'wolff-olins', title: 'Creative Director (NY)', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-129', firmId: 'wolff-olins', title: 'Design Director (NY)', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-130', firmId: 'wolff-olins', title: 'Associate Creative Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },

  // London — DN&Co (live: 3 roles)
  { id: 'j-131', firmId: 'dn-co', title: 'Senior Brand and Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-132', firmId: 'dn-co', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-133', firmId: 'dn-co', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },

  // London — Moving Brands (live: 1 role)
  { id: 'j-134', firmId: 'moving-brands', title: 'Brand Designer (with Motion skillset)', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // London — The Mill (live: 2 roles)
  { id: 'j-135', firmId: 'the-mill', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-136', firmId: 'the-mill', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // London — MPC (live: 4 roles)
  { id: 'j-137', firmId: 'mpc', title: 'Lead VFX Concept Artist', discipline: 'Concept Artist', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-138', firmId: 'mpc', title: 'FX Artist', discipline: 'CG Generalist', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-139', firmId: 'mpc', title: 'VFX Editor', discipline: 'CG Generalist', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-140', firmId: 'mpc', title: 'VFX Supervisor / Flame Artist', discipline: 'CG Generalist', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // Munich — Bureau Borsche (live page confirmed no openings — all prior entries removed)

  // Hamburg — Mutabor (live: 7 roles)
  { id: 'j-141', firmId: 'mutabor', title: 'Art Director Interior Design / Retail Design', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-142', firmId: 'mutabor', title: 'Art Director - Corporate Identity', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-143', firmId: 'mutabor', title: 'Junior Art Director Digital', discipline: 'Art Director', seniority: 'Junior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-144', firmId: 'mutabor', title: 'Art Director Design', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-145', firmId: 'mutabor', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-146', firmId: 'mutabor', title: 'Design Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-147', firmId: 'mutabor', title: 'Senior Brand Designer - Sport & Lifestyle', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // Berlin — Edenspiekermann (live: 6 roles)
  { id: 'j-148', firmId: 'edenspiekermann', title: 'Senior UI/UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2025-12-22', agentFound: true },
  { id: 'j-149', firmId: 'edenspiekermann', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-150', firmId: 'edenspiekermann', title: 'UI/UX Designer - Leipzig', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-151', firmId: 'edenspiekermann', title: 'UI/UX Designer - Berlin', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-152', firmId: 'edenspiekermann', title: 'Design Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-153', firmId: 'edenspiekermann', title: 'Internship Visual Design & Brand', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-07-01', agentFound: true },

  // Berlin — HORT (unreachable — keep existing)
  { id: 'j-29', firmId: 'hort', title: 'Junior Visual Designer', discipline: 'Visual Designer', seniority: 'Junior', postedAt: daysAgo(6) },

  // Rotterdam — Studio Dumbar (live page confirmed no full-time openings — all prior entries removed)

  // Amsterdam — Random Studio (live: 4 roles)
  { id: 'j-154', firmId: 'random-studio', title: 'Creative Lead', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-155', firmId: 'random-studio', title: 'Senior Spatial Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-156', firmId: 'random-studio', title: 'Medior Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-157', firmId: 'random-studio', title: 'Experiential Retail Lead', discipline: 'Art Director', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },

  // Italy — La Tigre (unreachable — keep existing)
  { id: 'j-32', firmId: 'la-tigre', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(4) },

  // United States — Collins (unreachable — keep existing)
  { id: 'j-33', firmId: 'collins', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-34', firmId: 'collins', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: hoursAgo(14), agentFound: true },

  // New York — Mother Design (live: 2 roles)
  { id: 'j-158', firmId: 'mother-design', title: 'Senior Branding Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-159', firmId: 'mother-design', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // New York — Gretel (live: 1 role)
  { id: 'j-160', firmId: 'gretel', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // Portland — Instrument (live: 5 roles)
  { id: 'j-161', firmId: 'instrument', title: 'Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-162', firmId: 'instrument', title: 'Senior Designer, Web + Brand (Contract)', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-04-01', agentFound: true },
  { id: 'j-163', firmId: 'instrument', title: 'Design Director, Product Design', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-164', firmId: 'instrument', title: 'Executive Creative Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-165', firmId: 'instrument', title: 'Associate Design Director (Contract)', discipline: 'Art Director', seniority: 'Lead', postedAt: '2026-04-08', agentFound: true },

  // San Francisco — Manual (live page confirmed no openings — j-39 removed)

  // San Francisco — Character SF (unreachable — keep existing)
  { id: 'j-40', firmId: 'character-sf', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(4) },

  // Canada — MetaLab (live: 7 roles)
  { id: 'j-166', firmId: 'metalab', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-167', firmId: 'metalab', title: 'Senior Brand Designer (Marketing)', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-168', firmId: 'metalab', title: 'Brand Director', discipline: 'Art Director', seniority: 'Head of', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-169', firmId: 'metalab', title: 'AI Native Sr. Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-05-21', agentFound: true },
  { id: 'j-170', firmId: 'metalab', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-171', firmId: 'metalab', title: 'Product Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-172', firmId: 'metalab', title: 'Design Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },

  // Canada — Sid Lee (live: 4 roles)
  { id: 'j-173', firmId: 'sid-lee', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-04-27', agentFound: true },
  { id: 'j-174', firmId: 'sid-lee', title: 'Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-03', agentFound: true },
  { id: 'j-175', firmId: 'sid-lee', title: 'UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-176', firmId: 'sid-lee', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // Australia — Method (live: 1 role)
  { id: 'j-177', firmId: 'method', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // Australia — For The People (live: 1 role)
  { id: 'j-178', firmId: 'for-the-people', title: 'Design Director', discipline: 'Art Director', seniority: 'Head of', postedAt: '2026-07-01', agentFound: true },

  // Iceland — Ueno (unreachable/defunct — keep existing)
  { id: 'j-45', firmId: 'ueno', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(6) },

  // Switzerland — Frontify Studio (live: 4 roles)
  { id: 'j-179', firmId: 'frontify-creative', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-180', firmId: 'frontify-creative', title: 'Principal Product Designer - Group Guidelines', discipline: 'UX Designer', seniority: 'Principal', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-181', firmId: 'frontify-creative', title: 'Principal Product Designer - Design Systems', discipline: 'UX Designer', seniority: 'Principal', postedAt: '2025-08-11', agentFound: true },
  { id: 'j-182', firmId: 'frontify-creative', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // Engineering & IT consultancies (Band C)

  // AFRY Stockholm (live: 3 roles)
  { id: 'j-183', firmId: 'afry-stockholm', title: 'Senior Designer UX', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-184', firmId: 'afry-stockholm', title: 'Senior Designer UI', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-185', firmId: 'afry-stockholm', title: 'Industrial Designer', discipline: 'Industrial Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // AFRY Gothenburg (reachable, no Gothenburg-specific listing found — keep existing)
  { id: 'j-49', firmId: 'afry-gothenburg', title: 'Senior 3D Visualisation Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(4) },

  // Nexer Gothenburg (live: 2 roles)
  { id: 'j-186', firmId: 'nexer-gothenburg', title: 'Senior UX/UI Designer med AD-profil', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-26', agentFound: true },
  { id: 'j-187', firmId: 'nexer-gothenburg', title: 'Erfaren Service Designer till Nexer Maverick', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-04-07', agentFound: true },

  // Nexer Stockholm (reachable, no Stockholm-specific listing found — keep existing)
  { id: 'j-51', firmId: 'nexer-stockholm', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },

  // Knowit (unreachable — keep existing)
  { id: 'j-52', firmId: 'knowit-stockholm', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-53', firmId: 'knowit-stockholm', title: 'Art Director, Brand Practice', discipline: 'Art Director', seniority: 'Senior', postedAt: hoursAgo(8), agentFound: true },
  { id: 'j-54', firmId: 'knowit-oslo', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  { id: 'j-55', firmId: 'knowit-helsinki', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(2) },

  // Tietoevry Helsinki (live: 4 roles)
  { id: 'j-188', firmId: 'tietoevry-helsinki', title: 'Senior UX/UI Designer - Tietoevry Care', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-189', firmId: 'tietoevry-helsinki', title: 'UX Designer - Tieto Tech Consulting', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-190', firmId: 'tietoevry-helsinki', title: 'UX/UI Designer - Tieto Banktech', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-191', firmId: 'tietoevry-helsinki', title: 'UX Lead - Tietoevry Banking', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },

  // Tietoevry Stockholm (reachable, no Stockholm-specific listing found — keep existing)
  { id: 'j-57', firmId: 'tietoevry-stockholm', title: 'Lead UI Designer', discipline: 'UI Designer', seniority: 'Lead', postedAt: daysAgo(8) },

  // Visma Oslo (live: 1 role)
  { id: 'j-192', firmId: 'visma-oslo', title: 'Head of Design and User Experience', discipline: 'UX Designer', seniority: 'Head of', postedAt: '2026-07-01', agentFound: true },

  // Cognizant London (live: 1 role)
  { id: 'j-193', firmId: 'cognizant-london', title: 'Service Designer (London)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // Cognizant New York (not explicitly checked — keep existing)
  { id: 'j-60', firmId: 'cognizant-newyork', title: 'Senior 3D Artist, Immersive', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(3) },

  // TCS Interactive London (unreachable — keep existing)
  { id: 'j-61', firmId: 'tcs-interactive-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(5) },

  // Infosys Wongdoody London (live: 5 roles)
  { id: 'j-194', firmId: 'infosys-wongdoody-london', title: 'UX Director', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-01-13', agentFound: true },
  { id: 'j-195', firmId: 'infosys-wongdoody-london', title: 'UX Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-196', firmId: 'infosys-wongdoody-london', title: 'User Experience Designer, Snr.', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-197', firmId: 'infosys-wongdoody-london', title: 'Lead Experience Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-198', firmId: 'infosys-wongdoody-london', title: 'Service Design Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },

  // Global enterprise consultancies (Band B)

  // Accenture Song London (live: 5 roles)
  { id: 'j-199', firmId: 'accenture-song-london', title: 'Design Creative Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-200', firmId: 'accenture-song-london', title: 'Droga5 Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-201', firmId: 'accenture-song-london', title: 'Creative Agency Senior Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-202', firmId: 'accenture-song-london', title: 'Brand Campaign Midweight Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-203', firmId: 'accenture-song-london', title: 'Digital Product Design Associate Manager', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // Accenture Song Dublin (reachable, no Dublin-specific listings found — keep existing)
  { id: 'j-65', firmId: 'accenture-song-dublin', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(3) },

  // Accenture Song Stockholm (reachable, no Stockholm-specific listings found — keep existing)
  { id: 'j-66', firmId: 'accenture-song-stockholm', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(1) },

  // Deloitte Digital New York (live: 3 roles)
  { id: 'j-204', firmId: 'deloitte-digital-newyork', title: 'Lead UX Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-02-07', agentFound: true },
  { id: 'j-205', firmId: 'deloitte-digital-newyork', title: 'Lead UX Product Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-206', firmId: 'deloitte-digital-newyork', title: 'UI/UX Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // Deloitte Digital London (reachable, no London-specific listings found — keep existing)
  { id: 'j-68', firmId: 'deloitte-digital-london', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(6) },

  // Deloitte Digital Stockholm (reachable, no Stockholm-specific listings found — keep existing)
  { id: 'j-69', firmId: 'deloitte-digital-stockholm', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: hoursAgo(12), agentFound: true },

  // IDEO San Francisco (live: 2 roles)
  { id: 'j-207', firmId: 'ideo-sanfrancisco', title: 'Industrial Design Lead', discipline: 'Industrial Designer', seniority: 'Lead', postedAt: '2025-10-31', agentFound: true },
  { id: 'j-208', firmId: 'ideo-sanfrancisco', title: 'Software Design Director', discipline: 'Creative Director', seniority: 'Principal', postedAt: '2026-06-01', agentFound: true },

  // IDEO London (reachable, no London-specific listings found — keep existing)
  { id: 'j-71', firmId: 'ideo-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(5) },

  // IDEO Tokyo (reachable, no Tokyo-specific listings found — keep existing)
  { id: 'j-72', firmId: 'ideo-tokyo', title: 'Lead Designer, Industrial', discipline: 'Industrial Designer', seniority: 'Lead', postedAt: daysAgo(9) },

  // McKinsey Design New York (live: 2 roles)
  { id: 'j-209', firmId: 'mckinsey-design-newyork', title: 'Design Director - McKinsey Design', discipline: 'Creative Director', seniority: 'Principal', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-210', firmId: 'mckinsey-design-newyork', title: 'Digital Designer UX/UI - Build by McKinsey', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // McKinsey Design Stockholm (reachable, no Stockholm-specific listings found — keep existing)
  { id: 'j-74', firmId: 'mckinsey-design-stockholm', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(4) },

  // Designit Copenhagen (live: 1 role)
  { id: 'j-211', firmId: 'designit-copenhagen', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // Designit London (reachable, no London-specific listing found — keep existing)
  { id: 'j-76', firmId: 'designit-london', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: daysAgo(6) },

  // Designit Munich (reachable, no Munich-specific listing found — keep existing)
  { id: 'j-77', firmId: 'designit-munich', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(3) },

  // frog San Francisco (live: 4 roles)
  { id: 'j-212', firmId: 'frog-sanfrancisco', title: 'Design Director', discipline: 'Creative Director', seniority: 'Principal', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-213', firmId: 'frog-sanfrancisco', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-214', firmId: 'frog-sanfrancisco', title: 'UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-215', firmId: 'frog-sanfrancisco', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // frog London (reachable, no London-specific listing found — keep existing)
  { id: 'j-79', firmId: 'frog-london', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: daysAgo(4) },

  // frog Munich (reachable, no Munich-specific listing found — keep existing)
  { id: 'j-80', firmId: 'frog-munich', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(7) },

  // IBM iX New York (live: 2 roles)
  { id: 'j-216', firmId: 'ibm-ix-newyork', title: 'Associate Designer 2026', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-217', firmId: 'ibm-ix-newyork', title: 'Entry Level Designer 2026', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2025-12-02', agentFound: true },

  // Publicis Sapient New York (live: 2 roles)
  { id: 'j-218', firmId: 'publicis-sapient-newyork', title: 'Associate Design Director - UI', discipline: 'Art Director', seniority: 'Lead', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-219', firmId: 'publicis-sapient-newyork', title: 'UX/UI Designer - SaaS', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // Publicis Sapient London (reachable, no London-specific listing found — keep existing)
  { id: 'j-83', firmId: 'publicis-sapient-london', title: 'Lead Brand Designer', discipline: 'Brand Designer', seniority: 'Lead', postedAt: daysAgo(6) },

  // EY Doberman Stockholm (live: 1 role)
  { id: 'j-220', firmId: 'ey-doberman-stockholm', title: 'Creative Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // EY Doberman New York (reachable, no NY-specific listing found — keep existing)
  { id: 'j-85', firmId: 'ey-doberman-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(4) },

  // Capgemini Invent Paris (live: 1 role)
  { id: 'j-221', firmId: 'capgemini-invent-paris', title: 'frog - Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // Sopra Steria Paris (live: 2 roles)
  { id: 'j-222', firmId: 'sopra-steria-paris', title: 'Designer - Direction Artistique', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-223', firmId: 'sopra-steria-paris', title: 'UX/UI Designer - Paris', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // Cinode customer roster

  // Rejlers (live page confirmed — no design openings; j-88 removed)

  // Consid (live: 2 roles)
  { id: 'j-224', firmId: 'consid', title: 'UX-designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-225', firmId: 'consid', title: 'Senior UX-writer / Content Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-03-31', agentFound: true },

  // HiQ (live: 2 roles)
  { id: 'j-226', firmId: 'hiq', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-227', firmId: 'hiq', title: 'UI-Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // Vincit (live page confirmed — no design openings; j-92 removed)

  // twoday (live: 2 roles)
  { id: 'j-228', firmId: 'twoday', title: 'UX / UI / Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-229', firmId: 'twoday', title: 'Senior UX Designer (Denmark)', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-01-11', agentFound: true },

  // Nitor (live: 2 roles)
  { id: 'j-230', firmId: 'nitor', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-231', firmId: 'nitor', title: 'Senior Digital Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // Knightec (live: 3 roles)
  { id: 'j-232', firmId: 'knightec', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-233', firmId: 'knightec', title: 'UX/UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-234', firmId: 'knightec', title: 'Senior Interaktionsdesigner', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // Prevas (live: 2 roles)
  { id: 'j-235', firmId: 'prevas', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },
  { id: 'j-236', firmId: 'prevas', title: 'UX / Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // B3 Consulting (live: 1 role)
  { id: 'j-237', firmId: 'b3', title: 'UX-Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-07-01', agentFound: true },

  // Omegapoint (live page confirmed — no design openings; j-98 removed)
  // Forefront (live page confirmed — no design openings; j-99 removed)
  // Centigo (live page confirmed — no design openings; j-100 removed)

  // byBrick (unreachable — keep existing)
  { id: 'j-101', firmId: 'bybrick', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: hoursAgo(7), agentFound: true },

  // tretton37 (unreachable — keep existing)
  { id: 'j-102', firmId: 'tretton37', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(4) },

  // Plantvision (unreachable — keep existing)
  { id: 'j-103', firmId: 'plantvision', title: 'Industrial Designer, Pharma', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: daysAgo(9) },

  // Advania Reykjavik (unreachable — keep existing)
  { id: 'j-104', firmId: 'advania-reykjavik', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(5) },

  // Softhouse (live: 1 role)
  { id: 'j-238', firmId: 'softhouse', title: 'UX/UI-designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-07-01', agentFound: true },

  // Silo AI (unreachable — keep existing)
  { id: 'j-106', firmId: 'silo-ai', title: 'Visual Designer, ML Tooling', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(3) },

  // itm8 (unreachable — keep existing)
  { id: 'j-107', firmId: 'itm8', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(6) },
];
