import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-06-22';

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
  // Kept from previous run — careers page unreachable on 2026-06-22
  { id: 'j-4',  firmId: 'snask',               title: 'Lead Brand Designer',    discipline: 'Brand Designer',  seniority: 'Lead',   postedAt: daysAgo(3) },
  { id: 'j-11', firmId: 'kurppa',              title: 'Art Director',            discipline: 'Art Director',    seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'j-14', firmId: 'heydays',             title: 'Brand Designer',          discipline: 'Brand Designer',  seniority: 'Mid',    postedAt: daysAgo(6) },
  { id: 'j-15', firmId: 'e-types',             title: 'Type Designer',           discipline: 'Type Designer',   seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-32', firmId: 'la-tigre',            title: 'Visual Designer',         discipline: 'Visual Designer', seniority: 'Mid',    postedAt: daysAgo(4) },
  { id: 'j-84', firmId: 'ey-doberman-stockholm', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: hoursAgo(6), agentFound: true },
  { id: 'j-85', firmId: 'ey-doberman-newyork', title: 'Senior UX Designer',      discipline: 'UX Designer',     seniority: 'Senior', postedAt: daysAgo(4) },

  // Stockholm — North Kingdom (northkingdom.teamtailor.com)
  { id: 'north-kingdom-designer', firmId: 'north-kingdom', title: 'Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-22' },

  // Stockholm — ACNE Studios (jobylon / Business of Fashion)
  { id: 'acne-senior-mens-wear-designer', firmId: 'acne', title: 'Senior Mens Wear Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'acne-ecommerce-designer',        firmId: 'acne', title: 'E-Commerce Designer',        discipline: 'UI Designer',     seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'acne-junior-digital-designer',   firmId: 'acne', title: 'Junior Digital Designer',    discipline: 'UI Designer',     seniority: 'Junior', postedAt: '2026-06-22' },

  // Stockholm — BVD (bvd.se/we-are-hiring)
  { id: 'bvd-3d-motion-designer', firmId: 'bvd', title: '3D & Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-22' },
  { id: 'bvd-motion-designer',    firmId: 'bvd', title: 'Motion Designer',       discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-22' },

  // Stockholm — Goodbye Kansas (career.goodbyekansas.com)
  { id: 'goodbye-kansas-concept-artist-intern', firmId: 'goodbye-kansas', title: 'Concept Artist Intern', discipline: 'Concept Artist', seniority: 'Junior', postedAt: '2025-10-01' },

  // Helsinki — Bond (thisisbond.com/job-application/freelancer)
  { id: 'bond-freelancer', firmId: 'bond', title: 'Freelancer (Brand Designer)', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-22' },

  // Oslo — Bakken & Bæck (bakkenbaeck.teamtailor.com)
  { id: 'bakken-baeck-senior-brand-designer', firmId: 'bakken-baeck', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'bakken-baeck-lead-product-designer', firmId: 'bakken-baeck', title: 'Lead Product Designer',  discipline: 'UI Designer',    seniority: 'Lead',   postedAt: '2026-06-22' },
  { id: 'bakken-baeck-digital-design-lead',   firmId: 'bakken-baeck', title: 'Digital Design Lead',    discipline: 'UI Designer',    seniority: 'Lead',   postedAt: '2026-06-22' },

  // Copenhagen — Kontrapunkt (app.elvium.com/en/positions/30934)
  { id: 'kontrapunkt-concept-designer', firmId: 'kontrapunkt', title: 'Concept Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-22' },

  // London — Pentagram (pentagram.com/careers, via BP&O / ifyoucouldjobs, Jan 2026)
  { id: 'pentagram-mid-weight-designer', firmId: 'pentagram', title: 'Mid-weight Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-01-01' },

  // London — Wolff Olins (wolffolins.com/jobs)
  { id: 'wolff-olins-design-director',   firmId: 'wolff-olins', title: 'Design Director',  discipline: 'Art Director',      seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'wolff-olins-creative-director', firmId: 'wolff-olins', title: 'Creative Director', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'wolff-olins-senior-designer',   firmId: 'wolff-olins', title: 'Senior Designer',   discipline: 'Visual Designer',   seniority: 'Senior', postedAt: '2026-06-22' },

  // London — DN&Co (dnco.com/jobs)
  { id: 'dn-co-senior-brand-motion-designer', firmId: 'dn-co', title: 'Senior Brand and Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'dn-co-design-director',              firmId: 'dn-co', title: 'Design Director',                  discipline: 'Art Director',    seniority: 'Lead',   postedAt: '2026-06-22' },

  // London — Moving Brands (apply.workable.com/movingbrands)
  { id: 'moving-brands-designer', firmId: 'moving-brands', title: 'Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-22' },

  // Hamburg — Mutabor (mutabor.jobs.personio.de)
  { id: 'mutabor-junior-art-director-digital',  firmId: 'mutabor', title: '(Junior) Art Director Digital',         discipline: 'Art Director', seniority: 'Junior', postedAt: '2026-06-22' },
  { id: 'mutabor-senior-art-director-digital',  firmId: 'mutabor', title: '(Senior) Art Director Digital',         discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'mutabor-art-director-design',          firmId: 'mutabor', title: 'Art Director Design',                   discipline: 'Art Director', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'mutabor-art-director-interior-retail', firmId: 'mutabor', title: 'Art Director Interior Design / Retail', discipline: 'Art Director', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'mutabor-ux-designer',                  firmId: 'mutabor', title: 'UX Designer',                          discipline: 'UX Designer',  seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'mutabor-junior-ux-designer',           firmId: 'mutabor', title: 'Junior UX Designer',                   discipline: 'UX Designer',  seniority: 'Junior', postedAt: '2026-06-22' },

  // Berlin — Edenspiekermann (edenspiekermann.com/jobs)
  { id: 'edenspiekermann-design-director',       firmId: 'edenspiekermann', title: 'Design Director',       discipline: 'Art Director',    seniority: 'Lead',   postedAt: '2026-06-22' },
  { id: 'edenspiekermann-senior-designer',       firmId: 'edenspiekermann', title: 'Senior Designer',       discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'edenspiekermann-senior-ui-ux-designer', firmId: 'edenspiekermann', title: 'Senior UI/UX Designer', discipline: 'UX Designer',     seniority: 'Senior', postedAt: '2026-06-22' },

  // Amsterdam — Random Studio (jobs.random.studio)
  { id: 'random-studio-ux-lead',                firmId: 'random-studio', title: 'UX Lead',               discipline: 'UX Designer',      seniority: 'Lead',   postedAt: '2026-06-22' },
  { id: 'random-studio-creative-lead',           firmId: 'random-studio', title: 'Creative Lead',          discipline: 'Creative Director', seniority: 'Lead',  postedAt: '2026-06-22' },
  { id: 'random-studio-medior-graphic-designer', firmId: 'random-studio', title: 'Medior Graphic Designer', discipline: 'Visual Designer',  seniority: 'Mid',   postedAt: '2026-06-22' },
  { id: 'random-studio-senior-spatial-designer', firmId: 'random-studio', title: 'Senior Spatial Designer', discipline: '3D Artist',        seniority: 'Senior', postedAt: '2026-06-22' },

  // New York — Collins (wearecollins.com/jobs)
  { id: 'collins-senior-designer', firmId: 'collins', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-22' },

  // London — Mother Design (ifyoucouldjobs.com)
  { id: 'mother-design-creative-director',        firmId: 'mother-design', title: 'Creative Director',      discipline: 'Creative Director', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'mother-design-senior-branding-designer', firmId: 'mother-design', title: 'Senior Branding Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-22' },

  // New York — Gretel (gretelny.com)
  { id: 'gretel-senior-designer',    firmId: 'gretel', title: 'Senior Designer',    discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'gretel-mid-level-designer', firmId: 'gretel', title: 'Mid Level Designer', discipline: 'Visual Designer', seniority: 'Mid',    postedAt: '2026-06-22' },

  // Portland — Instrument (instrument.com/careers)
  { id: 'instrument-creative-director',           firmId: 'instrument', title: 'Creative Director',           discipline: 'Creative Director', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'instrument-associate-creative-director', firmId: 'instrument', title: 'Associate Creative Director', discipline: 'Creative Director', seniority: 'Lead',   postedAt: '2026-06-22' },
  { id: 'instrument-senior-designer',             firmId: 'instrument', title: 'Senior Designer',             discipline: 'Visual Designer',   seniority: 'Senior', postedAt: '2026-06-22' },

  // Victoria, Canada — MetaLab (job-boards.greenhouse.io/metalab)
  { id: 'metalab-ai-native-sr-product-designer', firmId: 'metalab', title: 'AI Native Sr. Product Designer',    discipline: 'UX Designer',    seniority: 'Senior',    postedAt: '2026-06-22' },
  { id: 'metalab-product-designer',              firmId: 'metalab', title: 'Product Designer',                  discipline: 'UX Designer',    seniority: 'Mid',       postedAt: '2026-06-22' },
  { id: 'metalab-senior-product-designer',       firmId: 'metalab', title: 'Senior Product Designer',           discipline: 'UX Designer',    seniority: 'Senior',    postedAt: '2026-06-22' },
  { id: 'metalab-principal-product-designer',    firmId: 'metalab', title: 'Principal Product Designer',        discipline: 'UX Designer',    seniority: 'Principal', postedAt: '2026-06-22' },
  { id: 'metalab-brand-designer',                firmId: 'metalab', title: 'Brand Designer',                    discipline: 'Brand Designer', seniority: 'Mid',       postedAt: '2026-06-22' },
  { id: 'metalab-senior-brand-designer',         firmId: 'metalab', title: 'Senior Brand Designer (Marketing)', discipline: 'Brand Designer', seniority: 'Senior',    postedAt: '2026-06-22' },
  { id: 'metalab-brand-director',                firmId: 'metalab', title: 'Brand Director',                    discipline: 'Brand Designer', seniority: 'Head of',   postedAt: '2026-06-22' },
  { id: 'metalab-principal-brand-designer',      firmId: 'metalab', title: 'Principal Brand Designer',          discipline: 'Brand Designer', seniority: 'Principal', postedAt: '2026-06-22' },

  // Montreal — Sid Lee (sidlee.com/en/careers/job-listing)
  { id: 'sid-lee-senior-art-director',     firmId: 'sid-lee', title: 'Senior Art Director',                   discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-04-27' },
  { id: 'sid-lee-art-director',            firmId: 'sid-lee', title: 'Art Director',                          discipline: 'Art Director', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'sid-lee-creative-team-ad',        firmId: 'sid-lee', title: 'Creative Team (Art Director)',           discipline: 'Art Director', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'sid-lee-senior-creative-team-ad', firmId: 'sid-lee', title: 'Senior Creative Team (Art Director)',    discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'sid-lee-senior-ad-mat-leave',     firmId: 'sid-lee', title: 'Senior Art Director (Mat Leave Contract)', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-22' },

  // Sydney — For The People (forthepeople.agency)
  { id: 'for-the-people-design-director', firmId: 'for-the-people', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-22' },

  // Zürich — Frontify Studio (builtin.com/company/frontify)
  { id: 'frontify-creative-principal-pd-ds',  firmId: 'frontify-creative', title: 'Principal Product Designer – Design Systems', discipline: 'UX Designer', seniority: 'Principal', postedAt: '2026-06-22' },
  { id: 'frontify-creative-senior-pd',        firmId: 'frontify-creative', title: 'Senior Product Designer',                     discipline: 'UX Designer', seniority: 'Senior',    postedAt: '2026-06-22' },
  { id: 'frontify-creative-principal-pd-dam', firmId: 'frontify-creative', title: 'Principal Product Designer – DAM',             discipline: 'UX Designer', seniority: 'Principal', postedAt: '2026-06-22' },

  // Engineering & IT consultancies (Band C)
  { id: 'afry-stockholm-ux-ui-designer',              firmId: 'afry-stockholm',          title: 'UX/UI Designer',         discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'afry-gothenburg-ux-ui-designer',             firmId: 'afry-gothenburg',         title: 'UX/UI Designer',         discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'nexer-gothenburg-service-designer',          firmId: 'nexer-gothenburg',        title: 'Service Designer',       discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'nexer-stockholm-ux-designer',                firmId: 'nexer-stockholm',         title: 'UX Designer',            discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'knowit-stockholm-ux-designer',               firmId: 'knowit-stockholm',        title: 'UX Designer',            discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'knowit-oslo-ux-designer',                    firmId: 'knowit-oslo',             title: 'UX Designer',            discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'tietoevry-stockholm-senior-ux-ui-designer',  firmId: 'tietoevry-stockholm',     title: 'Senior UX/UI Designer',  discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'tietoevry-stockholm-ux-ui-designer',         firmId: 'tietoevry-stockholm',     title: 'UX/UI Designer',         discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'cognizant-newyork-digital-product-designer', firmId: 'cognizant-newyork',       title: 'Digital Product Designer', discipline: 'UI Designer', seniority: 'Mid',  postedAt: '2026-06-08' },
  { id: 'cognizant-newyork-ux-designer',              firmId: 'cognizant-newyork',       title: 'UX Designer',            discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'cognizant-newyork-senior-ux-ui-designer',    firmId: 'cognizant-newyork',       title: 'Senior UX/UI Designer',  discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'cognizant-newyork-lead-ux-designer',         firmId: 'cognizant-newyork',       title: 'Lead UX Designer',       discipline: 'UX Designer', seniority: 'Lead',   postedAt: '2026-06-22' },
  { id: 'infosys-wongdoody-london-ux-director',       firmId: 'infosys-wongdoody-london', title: 'UX Director',            discipline: 'UX Designer', seniority: 'Lead',   postedAt: '2026-06-22' },
  { id: 'infosys-wongdoody-london-ux-lead',           firmId: 'infosys-wongdoody-london', title: 'UX Lead',                discipline: 'UX Designer', seniority: 'Lead',   postedAt: '2026-06-22' },
  { id: 'infosys-wongdoody-london-cd-visual',         firmId: 'infosys-wongdoody-london', title: 'Creative Director – Visual Design', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'infosys-wongdoody-london-senior-ux',         firmId: 'infosys-wongdoody-london', title: 'Senior UX Designer',     discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'infosys-wongdoody-london-product-designer',  firmId: 'infosys-wongdoody-london', title: 'Product Designer',       discipline: 'UI Designer', seniority: 'Mid',    postedAt: '2026-06-22' },

  // Global enterprise consultancies (Band B)
  { id: 'accenture-song-london-senior-art-director',  firmId: 'accenture-song-london',    title: 'Droga5 Senior Art Director', discipline: 'Art Director',    seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'accenture-song-london-senior-designer',      firmId: 'accenture-song-london',    title: 'Droga5 Senior Designer',     discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'accenture-song-dublin-senior-art-director',  firmId: 'accenture-song-dublin',    title: 'Droga5 Senior Art Director', discipline: 'Art Director',    seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'accenture-song-dublin-acd-art',              firmId: 'accenture-song-dublin',    title: 'Life Sciences Associate Creative Director – Art Direction', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-22' },
  { id: 'accenture-song-stockholm-visual-design-mgr', firmId: 'accenture-song-stockholm', title: 'Visual Design Associate Manager', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-22' },
  { id: 'deloitte-digital-newyork-lead-ux-product',   firmId: 'deloitte-digital-newyork', title: 'Lead UX Product Designer',          discipline: 'UX Designer',     seniority: 'Lead',   postedAt: '2026-06-22' },
  { id: 'deloitte-digital-newyork-lead-ux-visual',    firmId: 'deloitte-digital-newyork', title: 'Lead UX Visual Designer',           discipline: 'Visual Designer', seniority: 'Lead',   postedAt: '2026-06-22' },
  { id: 'deloitte-digital-newyork-lead-ux-agentic',   firmId: 'deloitte-digital-newyork', title: 'Lead UX Designer – Agentic AI Platform', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-22' },
  { id: 'deloitte-digital-newyork-manager-ux',        firmId: 'deloitte-digital-newyork', title: 'Manager, UX Product Design',         discipline: 'UX Designer',     seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'deloitte-digital-london-lead-ux-product',    firmId: 'deloitte-digital-london',  title: 'Lead UX Product Designer',           discipline: 'UX Designer',     seniority: 'Lead',   postedAt: '2026-06-22' },
  { id: 'deloitte-digital-london-lead-ux-visual',     firmId: 'deloitte-digital-london',  title: 'Lead UX Visual Designer',            discipline: 'Visual Designer', seniority: 'Lead',   postedAt: '2026-06-22' },
  { id: 'ideo-sf-sr-visual-comm-designer',            firmId: 'ideo-sanfrancisco', title: 'Senior Visual Communication Designer', discipline: 'Visual Designer',    seniority: 'Senior', postedAt: '2026-02-01' },
  { id: 'ideo-sf-design-research-lead',               firmId: 'ideo-sanfrancisco', title: 'Design Research Lead',                discipline: 'UX Designer',        seniority: 'Lead',   postedAt: '2026-02-01' },
  { id: 'ideo-sf-software-design-director',           firmId: 'ideo-sanfrancisco', title: 'Software Design Director',            discipline: 'Creative Director',  seniority: 'Senior', postedAt: '2026-02-01' },
  { id: 'ideo-sf-senior-industrial-designer',         firmId: 'ideo-sanfrancisco', title: 'Senior Industrial Designer',          discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-02-01' },
  { id: 'mckinsey-design-newyork-design-director',    firmId: 'mckinsey-design-newyork', title: 'Design Director – McKinsey Design',          discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'mckinsey-design-newyork-assoc-design-dir',   firmId: 'mckinsey-design-newyork', title: 'Associate Design Director – McKinsey Design', discipline: 'Art Director',      seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'designit-london-sr-exp-designer-fintech',    firmId: 'designit-london', title: 'Senior Experience Designer – Fintech', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'designit-london-sr-experience-designer',     firmId: 'designit-london', title: 'Sr. Experience Designer',              discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'designit-munich-ux-ui-designer-mid',         firmId: 'designit-munich', title: 'UX/UI Designer (Mid level)',            discipline: 'UX Designer', seniority: 'Mid',       postedAt: '2026-06-22' },
  { id: 'designit-munich-experience-designer',        firmId: 'designit-munich', title: 'Experience Designer',                   discipline: 'UX Designer', seniority: 'Mid',       postedAt: '2026-06-22' },
  { id: 'designit-munich-ux-product-designer',        firmId: 'designit-munich', title: 'UX Product Designer',                   discipline: 'UX Designer', seniority: 'Mid',       postedAt: '2026-06-22' },
  { id: 'designit-munich-principal-ux-designer',      firmId: 'designit-munich', title: 'Principal UX Designer',                 discipline: 'UX Designer', seniority: 'Principal', postedAt: '2026-06-22' },
  { id: 'frog-sf-senior-visual-designer',             firmId: 'frog-sanfrancisco', title: 'Senior Visual Designer',  discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'frog-sf-lead-product-designer',              firmId: 'frog-sanfrancisco', title: 'Lead Product Designer',   discipline: 'UX Designer',     seniority: 'Lead',   postedAt: '2026-06-22' },
  { id: 'frog-sf-senior-product-designer',            firmId: 'frog-sanfrancisco', title: 'Senior Product Designer', discipline: 'UX Designer',     seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'frog-london-senior-ux-designer',             firmId: 'frog-london', title: 'Senior UX Designer',    discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'frog-london-experience-designer',            firmId: 'frog-london', title: 'Experience Designer II', discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'frog-munich-senior-service-designer',        firmId: 'frog-munich', title: 'Senior Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'ibm-ix-newyork-innovation-designer',         firmId: 'ibm-ix-newyork', title: 'Innovation Designer', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-22' },
  { id: 'publicis-sapient-newyork-cd-ux',             firmId: 'publicis-sapient-newyork', title: 'Creative Director – Experience Design (UX)',    discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'publicis-sapient-newyork-acd',               firmId: 'publicis-sapient-newyork', title: 'Associate Creative Director – Experience Design', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-22' },
  { id: 'publicis-sapient-london-senior-ux',          firmId: 'publicis-sapient-london', title: 'Senior UX Designer',               discipline: 'UX Designer',     seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'publicis-sapient-london-ux-ui-visual',       firmId: 'publicis-sapient-london', title: 'UX/UI Visual Design Working Student', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-06-22' },
  { id: 'sopra-steria-paris-ux-ui-designer',          firmId: 'sopra-steria-paris', title: 'UX/UI Designer Confirmé/e', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-22' },

  // Cinode customer roster — live listings as of 2026-06-22
  { id: 'consid-senior-ux-writer',              firmId: 'consid',    title: 'Senior UX-writer / Content Designer',  discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'consid-ux-designer',                   firmId: 'consid',    title: 'UX Designer',                          discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'hiq-ux-designer',                      firmId: 'hiq',       title: 'UX Designer',                          discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'hiq-ui-designer',                      firmId: 'hiq',       title: 'UI Designer',                          discipline: 'UI Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'telia-ux-ui-designer',                 firmId: 'telia',     title: 'UX/UI Designer',                       discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'telia-ux-designer',                    firmId: 'telia',     title: 'UX Designer',                          discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'telia-senior-ux-designer',             firmId: 'telia',     title: 'Senior UX Designer',                   discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'knightec-ux-ui-designer',              firmId: 'knightec',  title: 'UX/UI Designer',                       discipline: 'UI Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'knightec-service-designer',            firmId: 'knightec',  title: 'Service Designer',                     discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'knightec-senior-interaction-designer', firmId: 'knightec',  title: 'Senior Interaction Designer',          discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'prevas-ux-designer',                   firmId: 'prevas',    title: 'UX Designer',                          discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'hm-art-director',                      firmId: 'hm',        title: 'Art Director',                         discipline: 'Art Director', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'hm-ux-ui-designer',                    firmId: 'hm',        title: 'UX/UI Designer',                       discipline: 'UI Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'hm-digital-experience-designer',       firmId: 'hm',        title: 'Digital Experience Designer',          discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'hm-design-system-lead',                firmId: 'hm',        title: 'Design System Lead / Senior Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'castra-ux-designer',                   firmId: 'castra',    title: 'UX Designer',                          discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2025-06-17' },
  { id: 'tretton37-senior-ux-designer',         firmId: 'tretton37', title: 'Senior UX Designer',                   discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-22' },
  { id: 'advania-reykjavik-ux-ui-designer',     firmId: 'advania-reykjavik', title: 'UX/UI Designer',              discipline: 'UX Designer', seniority: 'Mid',    postedAt: '2026-06-22' },
  { id: 'softhouse-ux-ui-designer',             firmId: 'softhouse', title: 'UX/UI Designer till Softhouse Småland', discipline: 'UX Designer', seniority: 'Mid',  postedAt: '2026-06-22' },
];
