import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-06-26';

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
  // Stockholm — Band A (careers pages blocked; existing entries kept)
  { id: 'j-1', firmId: 'north-kingdom', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-06-26', agentFound: true },
  { id: 'j-2', firmId: 'north-kingdom', title: 'Art Director, Brand Films', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-25' },
  { id: 'j-3', firmId: 'acne', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  { id: 'j-4', firmId: 'snask', title: 'Lead Brand Designer', discipline: 'Brand Designer', seniority: 'Lead', postedAt: '2026-06-23' },
  { id: 'j-5', firmId: 'bvd', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'j-6', firmId: 'kurppa-hosk', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-19' },
  { id: 'j-7', firmId: 'goodbye-kansas', title: 'CG Generalist, Film', discipline: 'CG Generalist', seniority: 'Senior', postedAt: '2026-06-26', agentFound: true },
  { id: 'j-8', firmId: 'goodbye-kansas', title: 'Concept Artist', discipline: 'Concept Artist', seniority: 'Mid', postedAt: '2026-06-22' },

  // Helsinki — Band A (blocked; kept)
  { id: 'j-9', firmId: 'bond', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  { id: 'j-10', firmId: 'bond', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'j-11', firmId: 'kurppa', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-21' },

  // Oslo — Band A (blocked; kept)
  { id: 'j-12', firmId: 'bakken-baeck', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-25' },
  { id: 'j-13', firmId: 'bakken-baeck', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-22' },
  { id: 'j-14', firmId: 'heydays', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-20' },

  // Copenhagen — Band A (blocked; kept)
  { id: 'j-15', firmId: 'e-types', title: 'Type Designer', discipline: 'Type Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  { id: 'j-16', firmId: 'kontrapunkt', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-17' },

  // London — Band A (blocked; kept)
  { id: 'j-17', firmId: 'pentagram', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-26', agentFound: true },
  { id: 'j-18', firmId: 'pentagram', title: 'Mid Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  { id: 'j-19', firmId: 'wolff-olins', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-06-15' },
  { id: 'j-20', firmId: 'wolff-olins', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'j-21', firmId: 'dn-co', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-19' },
  { id: 'j-22', firmId: 'moving-brands', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-23' },
  { id: 'j-23', firmId: 'the-mill', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: '2026-06-25' },
  { id: 'j-24', firmId: 'the-mill', title: 'CG Lead, Commercials', discipline: 'CG Generalist', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'j-25', firmId: 'mpc', title: 'Concept Artist', discipline: 'Concept Artist', seniority: 'Senior', postedAt: '2026-06-24' },

  // Germany — Band A (blocked; kept)
  { id: 'j-26', firmId: 'bureau-borsche', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'j-27', firmId: 'mutabor', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  { id: 'j-28', firmId: 'edenspiekermann', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-16' },
  { id: 'j-29', firmId: 'hort', title: 'Junior Visual Designer', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-06-20' },

  // Netherlands — Band A (blocked; kept)
  { id: 'j-30', firmId: 'studio-dumbar', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  { id: 'j-31', firmId: 'random-studio', title: 'Creative Technologist', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-25', agentFound: true },

  // Italy — Band A (blocked; kept)
  { id: 'j-32', firmId: 'la-tigre', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-22' },

  // United States — Band A (blocked; kept)
  { id: 'j-33', firmId: 'collins', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-25' },
  { id: 'j-34', firmId: 'collins', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-25', agentFound: true },
  { id: 'j-35', firmId: 'mother-design', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  { id: 'j-36', firmId: 'gretel', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-20' },
  { id: 'j-37', firmId: 'instrument', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  { id: 'j-38', firmId: 'instrument', title: 'Lead 3D Artist', discipline: '3D Artist', seniority: 'Lead', postedAt: '2026-06-21' },
  { id: 'j-39', firmId: 'manual', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'j-40', firmId: 'character-sf', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-22' },

  // Canada — Band A (blocked; kept)
  { id: 'j-41', firmId: 'metalab', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  { id: 'j-42', firmId: 'sid-lee', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-19' },

  // Australia — Band A (blocked; kept)
  { id: 'j-43', firmId: 'method', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-24' },
  { id: 'j-44', firmId: 'for-the-people', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-21' },

  // Iceland, Switzerland — Band A (blocked; kept)
  { id: 'j-45', firmId: 'ueno', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-20' },
  { id: 'j-46', firmId: 'frontify-creative', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-23' },

  // Engineering & IT consultancies (Band C) — live-scraped via web search
  // AFRY: old entries replaced with live UX/UI Designer roles
  { id: 'j-108', firmId: 'afry-stockholm', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  { id: 'j-109', firmId: 'afry-gothenburg', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  // Nexer: old entry replaced with live roles
  { id: 'j-110', firmId: 'nexer-gothenburg', title: 'Erfaren Service Designer till Nexer Maverick', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-04-28' },
  { id: 'j-111', firmId: 'nexer-gothenburg', title: 'UX Designer till samhällsviktigt inhouse-uppdrag', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2025-04-06' },
  // nexer-stockholm: no open role confirmed; kept below
  { id: 'j-51', firmId: 'nexer-stockholm', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  // Knowit: old entries replaced with live roles
  { id: 'j-112', firmId: 'knowit-stockholm', title: 'UX Lead till Nordens största digitala byrå', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-26' },
  { id: 'j-113', firmId: 'knowit-stockholm', title: 'UX-designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  { id: 'j-114', firmId: 'knowit-oslo', title: 'Engasjerte UX-designere til givende og samfunnsnyttige innovasjonsprosjekter', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  { id: 'j-115', firmId: 'knowit-oslo', title: 'Senior UX-Designere til innovative og samfunnsnyttige løsninger', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-26' },
  { id: 'j-116', firmId: 'knowit-oslo', title: 'UX-designere til bærekraftige og samfunnsnyttige prosjekter', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  // knowit-helsinki: no roles found; kept
  { id: 'j-55', firmId: 'knowit-helsinki', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-24' },
  // Tietoevry: old entries replaced with live roles
  { id: 'j-117', firmId: 'tietoevry-helsinki', title: 'Junior UX Designer - Tietoevry Create', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-22' },
  { id: 'j-118', firmId: 'tietoevry-stockholm', title: 'UX/UI Designer - Tieto Banktech', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-03-06' },
  { id: 'j-119', firmId: 'tietoevry-stockholm', title: 'Senior UX/UI Designer - Tietoevry Tech Services Sweden', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-26' },
  // Visma: old entry replaced with live role
  { id: 'j-120', firmId: 'visma-oslo', title: 'Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2025-11-07' },
  // Cognizant: old entries replaced with live roles
  { id: 'j-121', firmId: 'cognizant-london', title: 'Senior Product Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2025-11-16' },
  { id: 'j-122', firmId: 'cognizant-newyork', title: 'Digital Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-08' },
  // tcs-interactive-london: no open role confirmed; kept
  { id: 'j-61', firmId: 'tcs-interactive-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  // WongDoody: old entry replaced with 6 live roles
  { id: 'j-123', firmId: 'infosys-wongdoody-london', title: 'Creative Director - Visual Design', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-02-24' },
  { id: 'j-124', firmId: 'infosys-wongdoody-london', title: 'UX Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-26' },
  { id: 'j-125', firmId: 'infosys-wongdoody-london', title: 'UX Director', discipline: 'UX Designer', seniority: 'Head of', postedAt: '2026-06-26' },
  { id: 'j-126', firmId: 'infosys-wongdoody-london', title: 'Design Lead', discipline: 'Art Director', seniority: 'Lead', postedAt: '2026-06-26' },
  { id: 'j-127', firmId: 'infosys-wongdoody-london', title: 'Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  { id: 'j-128', firmId: 'infosys-wongdoody-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-26' },

  // Global enterprise consultancies (Band B) — live-scraped via web search
  // Accenture Song: old entries replaced with confirmed live role
  { id: 'j-129', firmId: 'accenture-song-london', title: 'Cross Brand Art Director / Designer', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-26' },
  { id: 'j-130', firmId: 'accenture-song-dublin', title: 'Design System Specialist – UX/UI', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  // accenture-song-stockholm: no role confirmed; kept
  { id: 'j-66', firmId: 'accenture-song-stockholm', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-25' },
  // deloitte-digital-newyork: unreachable; kept
  { id: 'j-67', firmId: 'deloitte-digital-newyork', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  // Deloitte Digital London: old entry replaced with 2 live roles
  { id: 'j-131', firmId: 'deloitte-digital-london', title: 'Deloitte Digital UX Designer – Consultant', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  { id: 'j-132', firmId: 'deloitte-digital-london', title: 'Consultant, Consulting UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  // deloitte-digital-stockholm: unreachable; kept
  { id: 'j-69', firmId: 'deloitte-digital-stockholm', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-26', agentFound: true },
  // IDEO: old entries replaced with live roles
  { id: 'j-133', firmId: 'ideo-sanfrancisco', title: 'Industrial Designer', discipline: 'Industrial Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  { id: 'j-134', firmId: 'ideo-sanfrancisco', title: 'Interaction Designer – Design for Change', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  // ideo-london: unreachable; kept
  { id: 'j-71', firmId: 'ideo-london', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  // IDEO Tokyo: old entry replaced with live roles
  { id: 'j-135', firmId: 'ideo-tokyo', title: 'Interaction Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  { id: 'j-136', firmId: 'ideo-tokyo', title: 'Visual Interaction Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  // mckinsey-design: unreachable; kept
  { id: 'j-73', firmId: 'mckinsey-design-newyork', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  { id: 'j-74', firmId: 'mckinsey-design-stockholm', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  // Designit Copenhagen: old entry replaced with live role
  { id: 'j-137', firmId: 'designit-copenhagen', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-26' },
  // designit-london, designit-munich: unreachable; kept
  { id: 'j-76', firmId: 'designit-london', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-20' },
  { id: 'j-77', firmId: 'designit-munich', title: 'Senior Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-06-23' },
  // frog: old entries replaced with live roles
  { id: 'j-138', firmId: 'frog-sanfrancisco', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-26' },
  { id: 'j-139', firmId: 'frog-sanfrancisco', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-26' },
  // frog-london: unreachable; kept
  { id: 'j-79', firmId: 'frog-london', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-22' },
  // frog-munich: old entry replaced with live role
  { id: 'j-140', firmId: 'frog-munich', title: 'Experience Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  // ibm-ix, publicis-sapient-newyork: unreachable; kept
  { id: 'j-81', firmId: 'ibm-ix-newyork', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'j-82', firmId: 'publicis-sapient-newyork', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-23' },
  // Publicis Sapient London: old entry replaced with live role
  { id: 'j-141', firmId: 'publicis-sapient-london', title: 'Associate Creative Director – Visual Design', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-26' },
  // ey-doberman: unreachable; kept
  { id: 'j-84', firmId: 'ey-doberman-stockholm', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-26', agentFound: true },
  { id: 'j-85', firmId: 'ey-doberman-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  // capgemini-invent-paris: unreachable; kept
  { id: 'j-86', firmId: 'capgemini-invent-paris', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-24' },
  // Sopra Steria: old entry replaced with 3 live roles
  { id: 'j-142', firmId: 'sopra-steria-paris', title: 'UX/UI Designer Confirmé – Sopra Banking Software', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-26' },
  { id: 'j-143', firmId: 'sopra-steria-paris', title: 'Designer – Direction Artistique', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-26' },
  { id: 'j-144', firmId: 'sopra-steria-paris', title: 'UX/UI Designer Confirmé – Editeur de Logiciels', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-26' },

  // Cinode customer roster — live-scraped; stale seeds removed, confirmed live roles added
  // rejlers: no design roles found live; j-88 removed
  // consid: j-89 removed; 2 live roles added
  { id: 'j-145', firmId: 'consid', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  { id: 'j-146', firmId: 'consid', title: 'Senior UX Writer / Content Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-26' },
  // hiq: j-90, j-91 removed; 3 live roles added
  { id: 'j-147', firmId: 'hiq', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  { id: 'j-148', firmId: 'hiq', title: 'UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  { id: 'j-149', firmId: 'hiq', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  // vincit: no roles found; j-92 removed
  // twoday: no design roles found; j-93 removed
  // nitor: no design roles found; j-94 removed
  // knightec: j-95 removed; 3 live roles added
  { id: 'j-150', firmId: 'knightec', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  { id: 'j-151', firmId: 'knightec', title: 'Senior Interaktionsdesigner', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-26' },
  { id: 'j-152', firmId: 'knightec', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  // prevas: j-96 removed; 1 live role added
  { id: 'j-153', firmId: 'prevas', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  // b3: no design roles found; j-97 removed
  // omegapoint: blocked; kept
  { id: 'j-98', firmId: 'omegapoint', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  // forefront: blocked; kept
  { id: 'j-99', firmId: 'forefront', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-24' },
  // centigo: blocked; kept
  { id: 'j-100', firmId: 'centigo', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-20' },
  // bybrick: blocked; kept
  { id: 'j-101', firmId: 'bybrick', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-26', agentFound: true },
  // tretton37: blocked; kept
  { id: 'j-102', firmId: 'tretton37', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  // plantvision: blocked; kept
  { id: 'j-103', firmId: 'plantvision', title: 'Industrial Designer, Pharma', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-06-17' },
  // advania-reykjavik: blocked; kept
  { id: 'j-104', firmId: 'advania-reykjavik', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  // softhouse: j-105 removed; 1 live role added
  { id: 'j-154', firmId: 'softhouse', title: 'UX/UI-designer till Softhouse Småland', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2024-11-25' },
  // silo-ai: no design roles found; j-106 removed
  // itm8: no design roles found; j-107 removed
  // Telia: no prior entry; 2 live roles added
  { id: 'j-155', firmId: 'telia', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
  { id: 'j-156', firmId: 'telia', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-26' },
];
