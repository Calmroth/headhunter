import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-06-27';

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

// Helpers retained for future incremental refreshes; suppress unused-variable warnings.
void daysAgo;
void hoursAgo;

export const JOBS: Job[] = [
  // Stockholm — north-kingdom: careers.northkingdom.com/jobs live; Designer role confirmed
  { id: 'j-1', firmId: 'north-kingdom', title: 'Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-27' },

  // Stockholm — acne: E-Commerce Designer confirmed on acnestudios.com (Jobylon, 2026-03-04)
  { id: 'j-2', firmId: 'acne', title: 'E-Commerce Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-03-04' },

  // Stockholm — bvd: two live hiring pages confirmed on bvd.se
  { id: 'j-3', firmId: 'bvd', title: '3D & Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-4', firmId: 'bvd', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-27' },

  // Stockholm — kurppa-hosk: Junior Brand Designer + Packaging/Industrial Designer confirmed on Teamtailor
  { id: 'j-5', firmId: 'kurppa-hosk', title: 'Junior Brand Designer', discipline: 'Brand Designer', seniority: 'Junior', postedAt: '2026-06-13' },
  { id: 'j-6', firmId: 'kurppa-hosk', title: 'Packaging & Industrial Designer', discipline: 'Industrial Designer', seniority: 'Mid', postedAt: '2026-06-27' },

  // Stockholm — goodbye-kansas: career.goodbyekansas.com — Realtime FX Artist + Concept Artist Intern confirmed
  { id: 'j-7', firmId: 'goodbye-kansas', title: 'Realtime FX Artist', discipline: 'CG Generalist', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-8', firmId: 'goodbye-kansas', title: 'Concept Artist Intern', discipline: 'Concept Artist', seniority: 'Junior', postedAt: '2026-06-27' },

  // snask: no public jobs page — no roles kept
  // bond: freelancer open application only — no specific role
  // kurppa: unreachable (minimal/parked site)
  // heydays: unreachable (no jobs page, appears folded into Kurppa Hosk)

  // Oslo — bakken-baeck: five active roles confirmed on bakkenbaeck.com/join
  { id: 'j-9', firmId: 'bakken-baeck', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-10', firmId: 'bakken-baeck', title: 'Lead Product Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-27' },
  { id: 'j-11', firmId: 'bakken-baeck', title: 'Digital Design Lead', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-27' },
  { id: 'j-12', firmId: 'bakken-baeck', title: 'Creative Lead', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-27' },
  { id: 'j-13', firmId: 'bakken-baeck', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-27' },

  // Copenhagen — e-types: no current roles confirmed
  // Copenhagen — kontrapunkt: Concept Designer confirmed on Elvium ATS
  { id: 'j-14', firmId: 'kontrapunkt', title: 'Concept Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-27' },

  // London — pentagram: no public listings (referral/partner-led hiring only)
  // London — wolff-olins: Senior Motion Designer + Design Director confirmed on wolffolins.com/jobs
  { id: 'j-15', firmId: 'wolff-olins', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-16', firmId: 'wolff-olins', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-27' },

  // London — dn-co: two roles confirmed on dnco.com/jobs
  { id: 'j-17', firmId: 'dn-co', title: 'Senior Brand and Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-18', firmId: 'dn-co', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-27' },

  // London — moving-brands: Designer, UX Designer, Designer for Labs confirmed on apply.workable.com/movingbrands
  { id: 'j-19', firmId: 'moving-brands', title: 'Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-20', firmId: 'moving-brands', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-21', firmId: 'moving-brands', title: 'Designer for Labs', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-27' },

  // London — the-mill: careers.themill.com live, no specific design titles confirmed
  // London — mpc: mpcvfx.com/en/jobs live, no specific design titles confirmed

  // Germany — bureau-borsche: explicitly not hiring (stated on site)
  // Germany — hort: no public jobs board
  // Germany — mutabor: five roles confirmed on mutabor.jobs.personio.de
  { id: 'j-22', firmId: 'mutabor', title: 'Art Director Design', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-23', firmId: 'mutabor', title: 'Art Director Interior Design / Retail Design', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-24', firmId: 'mutabor', title: 'Art Director — Corporate Identity', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-25', firmId: 'mutabor', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-27' },
  { id: 'j-26', firmId: 'mutabor', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-27' },

  // Germany — edenspiekermann: four roles confirmed on edenspiekermann.com/jobs
  { id: 'j-27', firmId: 'edenspiekermann', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2025-12-22' },
  { id: 'j-28', firmId: 'edenspiekermann', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2025-12-22' },
  { id: 'j-29', firmId: 'edenspiekermann', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-27' },
  { id: 'j-30', firmId: 'edenspiekermann', title: 'Internship Digital Product Design', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-27' },

  // Netherlands — studio-dumbar: internships only (no full-time roles confirmed)
  // Netherlands — random-studio: UX Lead + Creative Lead confirmed on jobs.random.studio
  { id: 'j-31', firmId: 'random-studio', title: 'UX Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-27' },
  { id: 'j-32', firmId: 'random-studio', title: 'Creative Lead', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-27' },

  // Italy — la-tigre: no public job listings (word-of-mouth hiring only)

  // United States — collins: Senior Designer confirmed on wearecollins.com/jobs
  { id: 'j-33', firmId: 'collins', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-27' },

  // United States — mother-design: Senior Brand Designer + Creative Director confirmed (IfYouCould aggregator)
  { id: 'j-34', firmId: 'mother-design', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-35', firmId: 'mother-design', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-27' },

  // United States — gretel: Senior Designer confirmed on gretelny.com/openings
  { id: 'j-36', firmId: 'gretel', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-27' },

  // United States — instrument: Creative Director + Senior Designer (Contract) confirmed on instrument.com/careers
  { id: 'j-37', firmId: 'instrument', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-38', firmId: 'instrument', title: 'Senior Designer, Web & Brand', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-04-01' },

  // United States — manual: internship only, no FTE roles
  // United States — character-sf: absorbed into Dentsu, no standalone listings confirmed

  // Canada — metalab: multiple roles confirmed via Greenhouse (job-boards.greenhouse.io/metalab)
  { id: 'j-39', firmId: 'metalab', title: 'Executive Design Director', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-02-24' },
  { id: 'j-40', firmId: 'metalab', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-41', firmId: 'metalab', title: 'Principal Brand Designer', discipline: 'Brand Designer', seniority: 'Principal', postedAt: '2026-06-27' },
  { id: 'j-42', firmId: 'metalab', title: 'AI Native Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-05-21' },

  // Canada — sid-lee: multiple roles confirmed on sidlee.com/en/careers/job-listing
  { id: 'j-43', firmId: 'sid-lee', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-04-28' },
  { id: 'j-44', firmId: 'sid-lee', title: 'Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-45', firmId: 'sid-lee', title: 'Art Director', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-46', firmId: 'sid-lee', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-47', firmId: 'sid-lee', title: 'UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-48', firmId: 'sid-lee', title: 'Creative Director, NY', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-27' },

  // Australia — method: 403, no design roles confirmed
  // Australia — for-the-people: Design Director role referenced but unverified as active
  // Iceland — ueno: defunct (acqui-hired by Twitter 2021)
  // Switzerland — frontify-creative: multiple roles confirmed on jobs.lever.co/frontify
  { id: 'j-49', firmId: 'frontify-creative', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2025-04-23' },
  { id: 'j-50', firmId: 'frontify-creative', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-51', firmId: 'frontify-creative', title: 'Principal Product Designer', discipline: 'UI Designer', seniority: 'Principal', postedAt: '2026-05-10' },

  // Engineering & IT consultancies (Band C)

  // afry-stockholm: UX/UI Designer confirmed (afry.com/en/join-us/available-jobs, Stockholm)
  { id: 'j-52', firmId: 'afry-stockholm', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-27' },

  // afry-gothenburg: UX/UI Designer confirmed (AFRY Experience Studios, Gothenburg, 4 yrs exp)
  { id: 'j-53', firmId: 'afry-gothenburg', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-27' },

  // nexer-gothenburg: Erfaren Service Designer confirmed (nexergroup.com, exp 2026-06-27, 10+ yrs)
  { id: 'j-54', firmId: 'nexer-gothenburg', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-01' },

  // knowit-stockholm: UX Designer (rolling intake) confirmed (knowit.se/jobb/ux-designer2/)
  { id: 'j-55', firmId: 'knowit-stockholm', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-27' },

  // knowit-oslo: Senior UX Designer confirmed (knowit.no/karriere, Universitetsgata 7-9)
  { id: 'j-56', firmId: 'knowit-oslo', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-27' },

  // knowit-helsinki: open application only, no specific design posting confirmed

  // tietoevry-helsinki: Junior UX Designer confirmed (tieto.wd3.myworkdayjobs.com R117147, Espoo)
  { id: 'j-57', firmId: 'tietoevry-helsinki', title: 'Junior UX Designer', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-27' },

  // tietoevry-stockholm: UX/UI Designer (Tieto Banktech, Solna) + Senior UX/UI Designer confirmed
  { id: 'j-58', firmId: 'tietoevry-stockholm', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-59', firmId: 'tietoevry-stockholm', title: 'Senior UX/UI Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-27' },

  // visma-oslo: Product Designer confirmed (Visma Enterprise ERP Plus, Skøyen Oslo)
  { id: 'j-60', firmId: 'visma-oslo', title: 'Product Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-27' },

  // cognizant-newyork: Senior UX/UI Designer + Entry-level UI/UX Designer confirmed (careers.cognizant.com)
  { id: 'j-61', firmId: 'cognizant-newyork', title: 'Senior UX/UI Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-62', firmId: 'cognizant-newyork', title: 'UI/UX Experience Designer', discipline: 'UI Designer', seniority: 'Junior', postedAt: '2026-06-27' },

  // cognizant-london: no London-specific design posting confirmed

  // tcs-interactive-london: Mid-Weight Product Designer confirmed (April 2026, Old Street London)
  { id: 'j-63', firmId: 'tcs-interactive-london', title: 'Mid-Weight Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-04-01' },

  // infosys-wongdoody-london: four roles confirmed (wongdoody.com/careers + Greenhouse ATS)
  { id: 'j-64', firmId: 'infosys-wongdoody-london', title: 'UX Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-27' },
  { id: 'j-65', firmId: 'infosys-wongdoody-london', title: 'UX Director', discipline: 'UX Designer', seniority: 'Head of', postedAt: '2026-01-13' },
  { id: 'j-66', firmId: 'infosys-wongdoody-london', title: 'Creative Director — Visual Design', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-02-23' },
  { id: 'j-67', firmId: 'infosys-wongdoody-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-27' },

  // Global enterprise consultancies (Band B)

  // accenture-song: roles confirmed via Accenture Workday ATS (Droga5/Work&Co/Accenture Song)
  { id: 'j-68', firmId: 'accenture-song-london', title: 'Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-69', firmId: 'accenture-song-london', title: 'Art Director', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-03-20' },
  { id: 'j-70', firmId: 'accenture-song-dublin', title: 'Associate Creative Director, Art', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-27' },
  { id: 'j-71', firmId: 'accenture-song-stockholm', title: 'Senior Creative Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-27' },

  // deloitte-digital: roles confirmed via apply.deloitte.com and jobs2.deloitte.com/uk
  { id: 'j-72', firmId: 'deloitte-digital-newyork', title: 'Lead UX Visual Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-27' },
  { id: 'j-73', firmId: 'deloitte-digital-london', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-74', firmId: 'deloitte-digital-stockholm', title: 'Lead Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-27' },

  // ideo: careers page explicitly states no current openings

  // mckinsey-design: roles confirmed via mckinsey.com/careers/search-jobs
  { id: 'j-75', firmId: 'mckinsey-design-newyork', title: 'Senior Experience Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-76', firmId: 'mckinsey-design-stockholm', title: 'Digital Product Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-27' },

  // designit: Senior UX Designer confirmed on designit.com/careers
  { id: 'j-77', firmId: 'designit-copenhagen', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-27' },

  // frog: roles confirmed on frog.co/careers
  { id: 'j-78', firmId: 'frog-sanfrancisco', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-79', firmId: 'frog-london', title: 'Junior UX Designer', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-27' },

  // ibm-ix-newyork: UI/UX Designer confirmed on careers.ibm.com
  { id: 'j-80', firmId: 'ibm-ix-newyork', title: 'UI/UX Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-27' },

  // publicis-sapient: roles confirmed on careers.publicissapient.com
  { id: 'j-81', firmId: 'publicis-sapient-newyork', title: 'UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-82', firmId: 'publicis-sapient-london', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-27' },

  // ey-doberman: no design roles found on doberman.co or any aggregator

  // capgemini-invent-paris: no Paris-specific design roles confirmed
  // sopra-steria-paris: three roles confirmed on careers.soprasteria.fr
  { id: 'j-83', firmId: 'sopra-steria-paris', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-84', firmId: 'sopra-steria-paris', title: 'Senior UX/UI Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-85', firmId: 'sopra-steria-paris', title: 'Art Director, Digital', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-27' },

  // Cinode customer roster — confirmed live design roles

  // hiq: UX Designer (Malmö) + Senior UX Designer (Stockholm) confirmed (career.hiq.se)
  { id: 'j-86', firmId: 'hiq', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-27' },
  { id: 'j-87', firmId: 'hiq', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-27' },

  // twoday: Senior UX Designer (Denmark) + UX Designer (Norway) confirmed (twoday.com/careers)
  { id: 'j-88', firmId: 'twoday', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-01-11' },
  { id: 'j-89', firmId: 'twoday', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-27' },

  // nitor: Senior UX Designer + Senior Digital Designer confirmed (apply.workable.com/nitor)
  { id: 'j-90', firmId: 'nitor', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-91', firmId: 'nitor', title: 'Senior Digital Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-27' },

  // knightec: three roles confirmed (career.knightecgroup.com)
  { id: 'j-92', firmId: 'knightec', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-03-11' },
  { id: 'j-93', firmId: 'knightec', title: 'Senior Interaction Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-27' },
  { id: 'j-94', firmId: 'knightec', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-27' },

  // rejlers, consid, vincit, itm8, silo-ai, qestit, prevas, b3, omegapoint,
  // softronic, kvadrat, nektab, xlent, time-people-group, cag, co-native, hm,
  // centigo, bybrick, forefront, human-it, accigo, system-verification, techseed,
  // dynabyte, influence, ddp, precio-fishbone, castra, agreat, tretton37, plantvision,
  // togethertech, addpro, m4, digitalent, advania-reykjavik, aqc, softhouse, sylog,
  // cygate, conoa, accelerate, fujitsu-tokyo, telia, nexer-stockholm:
  // Careers pages were either unreachable (403) or returned no creative-discipline
  // openings matching the allowed Discipline enum. No entries kept per reconciliation rules.
];
