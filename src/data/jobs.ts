import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-06-18';

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
  { id: 'north-kingdom-designer', firmId: 'north-kingdom', title: 'Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'j-3', firmId: 'acne', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(2) },
  { id: 'bvd-3d-motion-designer', firmId: 'bvd', title: '3D & Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'bvd-motion-designer', firmId: 'bvd', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'goodbye-kansas-realtime-fx-artist', firmId: 'goodbye-kansas', title: 'Realtime FX Artist', discipline: 'CG Generalist', seniority: 'Mid', postedAt: '2026-06-18' },

  // Helsinki
  { id: 'bond-freelancer-brand-consulting', firmId: 'bond', title: 'Freelancer (Brand Consulting / Creative Strategy / Design)', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'j-11', firmId: 'kurppa', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(5) },

  // Oslo
  { id: 'bakken-baeck-lead-product-designer', firmId: 'bakken-baeck', title: 'Lead Product Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'bakken-baeck-senior-brand-designer', firmId: 'bakken-baeck', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'bakken-baeck-digital-design-lead', firmId: 'bakken-baeck', title: 'Digital Design Lead', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'bakken-baeck-creative-lead', firmId: 'bakken-baeck', title: 'Creative Lead', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-18' },

  // Copenhagen
  { id: 'j-15', firmId: 'e-types', title: 'Type Designer', discipline: 'Type Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'kontrapunkt-concept-designer', firmId: 'kontrapunkt', title: 'Concept Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'kontrapunkt-motion-designer', firmId: 'kontrapunkt', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-18' },

  // London
  { id: 'pentagram-mid-weight-designer', firmId: 'pentagram', title: 'Mid-weight Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-01-26' },
  { id: 'pentagram-senior-graphic-designer', firmId: 'pentagram', title: 'Senior Graphic Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'wolff-olins-senior-motion-designer', firmId: 'wolff-olins', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'wolff-olins-design-director', firmId: 'wolff-olins', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'dn-co-senior-brand-and-motion-designer', firmId: 'dn-co', title: 'Senior Brand and Motion Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'dn-co-senior-brand-designer', firmId: 'dn-co', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'moving-brands-designer', firmId: 'moving-brands', title: 'Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'moving-brands-freelance-motion-designer', firmId: 'moving-brands', title: 'Freelance Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'j-23', firmId: 'the-mill', title: 'Senior 3D Artist', discipline: '3D Artist', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-24', firmId: 'the-mill', title: 'CG Lead, Commercials', discipline: 'CG Generalist', seniority: 'Lead', postedAt: daysAgo(8) },
  { id: 'j-25', firmId: 'mpc', title: 'Concept Artist', discipline: 'Concept Artist', seniority: 'Senior', postedAt: daysAgo(2) },

  // Germany
  { id: 'mutabor-art-director-design', firmId: 'mutabor', title: 'Art Director Design', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'mutabor-art-director-corporate-identity', firmId: 'mutabor', title: 'Art Director Corporate Identity', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'mutabor-art-director-interior-design', firmId: 'mutabor', title: 'Art Director Interior Design / Retail Design', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'mutabor-design-director', firmId: 'mutabor', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'mutabor-senior-motion-designer', firmId: 'mutabor', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'mutabor-ux-designer', firmId: 'mutabor', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'edenspiekermann-design-director', firmId: 'edenspiekermann', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'edenspiekermann-senior-designer', firmId: 'edenspiekermann', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'edenspiekermann-ui-ux-designer', firmId: 'edenspiekermann', title: 'UI/UX Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'edenspiekermann-senior-ui-ux-designer', firmId: 'edenspiekermann', title: 'Senior UI/UX Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-18' },

  // Netherlands
  { id: 'random-studio-creative-lead', firmId: 'random-studio', title: 'Creative Lead', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'random-studio-senior-spatial-designer', firmId: 'random-studio', title: 'Senior Spatial Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'random-studio-medior-graphic-designer', firmId: 'random-studio', title: 'Medior Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-18' },

  // Italy
  { id: 'j-32', firmId: 'la-tigre', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(4) },

  // United States (all unreachable — network egress blocked)
  { id: 'j-33', firmId: 'collins', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(1) },
  { id: 'j-34', firmId: 'collins', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: hoursAgo(14), agentFound: true },
  { id: 'j-35', firmId: 'mother-design', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-36', firmId: 'gretel', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: daysAgo(6) },
  { id: 'j-37', firmId: 'instrument', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(2) },
  { id: 'j-38', firmId: 'instrument', title: 'Lead 3D Artist', discipline: '3D Artist', seniority: 'Lead', postedAt: daysAgo(5) },
  { id: 'j-39', firmId: 'manual', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(8) },
  { id: 'j-40', firmId: 'character-sf', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(4) },

  // Canada (unreachable)
  { id: 'j-41', firmId: 'metalab', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(3) },
  { id: 'j-42', firmId: 'sid-lee', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: daysAgo(7) },

  // Australia (unreachable)
  { id: 'j-43', firmId: 'method', title: 'Lead Visual Designer', discipline: 'Visual Designer', seniority: 'Lead', postedAt: daysAgo(2) },
  { id: 'j-44', firmId: 'for-the-people', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: daysAgo(5) },

  // Iceland, Switzerland (unreachable)
  { id: 'j-45', firmId: 'ueno', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  { id: 'j-46', firmId: 'frontify-creative', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(3) },

  // Engineering & IT consultancies (Band C)
  { id: 'afry-stockholm-ux-ui-designer', firmId: 'afry-stockholm', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'afry-gothenburg-visualization-graphical-designer-lead', firmId: 'afry-gothenburg', title: 'Visualization and Graphical Designer Lead', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'nexer-gothenburg-erfaren-service-designer', firmId: 'nexer-gothenburg', title: 'Erfaren Service Designer (Nexer Maverick)', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-04-07' },
  { id: 'nexer-stockholm-ux-lead', firmId: 'nexer-stockholm', title: 'UX Lead (försvarskund)', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'knowit-stockholm-ux-designer', firmId: 'knowit-stockholm', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'knowit-stockholm-service-designer', firmId: 'knowit-stockholm', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'j-54', firmId: 'knowit-oslo', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  { id: 'knowit-oslo-ux-designer', firmId: 'knowit-oslo', title: 'UX Designer (innovasjonsprosjekter)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'j-55', firmId: 'knowit-helsinki', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: daysAgo(2) },
  { id: 'tietoevry-helsinki-ux-designer-transform', firmId: 'tietoevry-helsinki', title: 'UX Designer – Tietoevry Transform', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'tietoevry-helsinki-ux-designer-care', firmId: 'tietoevry-helsinki', title: 'UX Designer – Tietoevry Care', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'tietoevry-stockholm-ux-ui-designer-banktech', firmId: 'tietoevry-stockholm', title: 'UX/UI Designer – Tieto Banktech', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'tietoevry-stockholm-senior-ux-ui-designer', firmId: 'tietoevry-stockholm', title: 'Senior UX/UI Designer – Tietoevry Tech Services Sweden', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'visma-oslo-product-designer', firmId: 'visma-oslo', title: 'Product Designer – Visma Enterprise AS', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'cognizant-london-senior-product-designer', firmId: 'cognizant-london', title: 'Senior Product Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'cognizant-newyork-digital-product-designer', firmId: 'cognizant-newyork', title: 'Digital Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-08' },
  { id: 'cognizant-newyork-ux-designer', firmId: 'cognizant-newyork', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'j-61', firmId: 'tcs-interactive-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(5) },
  { id: 'infosys-wongdoody-london-creative-director-visual-design', firmId: 'infosys-wongdoody-london', title: 'Creative Director – Visual Design', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'infosys-wongdoody-london-ux-director', firmId: 'infosys-wongdoody-london', title: 'UX Director', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'infosys-wongdoody-london-ux-lead', firmId: 'infosys-wongdoody-london', title: 'UX Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'infosys-wongdoody-london-senior-ux-designer', firmId: 'infosys-wongdoody-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'infosys-wongdoody-london-senior-digital-art-director', firmId: 'infosys-wongdoody-london', title: 'Senior Digital Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-18' },

  // Global enterprise consultancies (Band B)
  { id: 'accenture-song-london-droga5-senior-art-director', firmId: 'accenture-song-london', title: 'Droga5 Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'accenture-song-london-droga5-senior-designer', firmId: 'accenture-song-london', title: 'Droga5 Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'accenture-song-london-droga5-creative-director', firmId: 'accenture-song-london', title: 'Droga5 Creative Director', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'accenture-song-dublin-droga5-art-director', firmId: 'accenture-song-dublin', title: 'Droga5 Art Director', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'accenture-song-dublin-droga5-group-design-director', firmId: 'accenture-song-dublin', title: 'Droga5 Group Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'accenture-song-stockholm-droga5-senior-art-director', firmId: 'accenture-song-stockholm', title: 'Droga5 Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'deloitte-digital-newyork-creative-director-ux', firmId: 'deloitte-digital-newyork', title: 'Creative Director, UX', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'deloitte-digital-newyork-lead-ux-product-designer', firmId: 'deloitte-digital-newyork', title: 'Lead UX Product Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'deloitte-digital-newyork-ui-ux-designer', firmId: 'deloitte-digital-newyork', title: 'UI/UX Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'deloitte-digital-london-ux-designer-junior', firmId: 'deloitte-digital-london', title: 'User Experience Designer (Analyst to Consultant)', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-18' },
  { id: 'deloitte-digital-london-ux-designer-senior', firmId: 'deloitte-digital-london', title: 'User Experience Designer, Consultant or Senior Consultant', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'j-69', firmId: 'deloitte-digital-stockholm', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: hoursAgo(12), agentFound: true },
  { id: 'ideo-sanfrancisco-senior-visual-communication-designer', firmId: 'ideo-sanfrancisco', title: 'Senior Visual Communication Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'ideo-london-senior-visual-communication-designer', firmId: 'ideo-london', title: 'Senior Visual Communication Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'ideo-tokyo-senior-visual-communication-designer', firmId: 'ideo-tokyo', title: 'Senior Visual Communication Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'mckinsey-design-newyork-senior-experience-designer', firmId: 'mckinsey-design-newyork', title: 'Senior Experience Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'mckinsey-design-newyork-senior-user-experience-designer', firmId: 'mckinsey-design-newyork', title: 'Senior User Experience Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'mckinsey-design-stockholm-senior-service-designer', firmId: 'mckinsey-design-stockholm', title: 'Senior Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'designit-copenhagen-experience-designer', firmId: 'designit-copenhagen', title: 'Experience Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'designit-london-experience-designer', firmId: 'designit-london', title: 'Experience Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'designit-london-ux-ui-designer', firmId: 'designit-london', title: 'UX/UI Designer (Mid level)', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'designit-munich-graphic-designer', firmId: 'designit-munich', title: 'Graphic Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'designit-munich-ui-ux-designer', firmId: 'designit-munich', title: 'UI/UX Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'frog-sanfrancisco-brand-designer', firmId: 'frog-sanfrancisco', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'frog-sanfrancisco-midweight-product-designer', firmId: 'frog-sanfrancisco', title: 'Midweight Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'frog-sanfrancisco-design-director-interaction', firmId: 'frog-sanfrancisco', title: 'Design Director, Interaction Design', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'frog-london-midweight-service-designer', firmId: 'frog-london', title: 'Midweight Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'frog-london-lead-service-designer', firmId: 'frog-london', title: 'Lead Service Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'frog-london-lead-product-designer', firmId: 'frog-london', title: 'Lead Product Designer', discipline: 'UI Designer', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'frog-munich-senior-service-designer', firmId: 'frog-munich', title: 'frog Impact Senior Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'frog-munich-strategic-design-manager', firmId: 'frog-munich', title: 'Strategic Design Manager', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'ibm-ix-newyork-ux-designer', firmId: 'ibm-ix-newyork', title: 'UX Designer, iX Studios', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'ibm-ix-newyork-senior-ux-designer', firmId: 'ibm-ix-newyork', title: 'Senior UX Designer, IBM iX', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'ibm-ix-newyork-entry-level-designer', firmId: 'ibm-ix-newyork', title: 'Entry Level Designer 2026', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-06-18' },
  { id: 'publicis-sapient-newyork-ux-ui-designer', firmId: 'publicis-sapient-newyork', title: 'UX/UI Designer - SaaS', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'publicis-sapient-newyork-freelance-senior-ux-designer', firmId: 'publicis-sapient-newyork', title: 'Freelance Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'publicis-sapient-london-creative-director-visual-design', firmId: 'publicis-sapient-london', title: 'Associate Creative Director, Visual Design', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'publicis-sapient-london-visual-design-student', firmId: 'publicis-sapient-london', title: 'UX/UI Visual Design Working Student', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-06-18' },
  { id: 'ey-doberman-stockholm-product-designer', firmId: 'ey-doberman-stockholm', title: 'Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'ey-doberman-stockholm-senior-ux-designer', firmId: 'ey-doberman-stockholm', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'j-85', firmId: 'ey-doberman-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: daysAgo(4) },
  { id: 'capgemini-invent-paris-ux-designer', firmId: 'capgemini-invent-paris', title: 'User Experience Designer (Consultant / Senior Consultant)', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'capgemini-invent-paris-graduate-ux-designer', firmId: 'capgemini-invent-paris', title: 'Graduate UX Design & Research 2026', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-18' },
  { id: 'sopra-steria-paris-ux-ui-designer', firmId: 'sopra-steria-paris', title: 'UX/UI Designer confirmé/e – Ile-de-France', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'sopra-steria-paris-lead-ux-designer', firmId: 'sopra-steria-paris', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-18' },

  // Cinode customer roster
  { id: 'consid-senior-ux-writer', firmId: 'consid', title: 'Senior UX-writer / Content Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-03-31' },
  { id: 'consid-ux-designer', firmId: 'consid', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'hiq-ui-designer', firmId: 'hiq', title: 'UI-Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'hiq-ux-designer-stockholm', firmId: 'hiq', title: 'UX-Designer (Stockholm)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'hiq-ux-designer-malmo', firmId: 'hiq', title: 'UX-Designer (Malmö)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'twoday-senior-ux-designer', firmId: 'twoday', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-01-11' },
  { id: 'j-94', firmId: 'nitor', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: daysAgo(6) },
  { id: 'knightec-senior-interaktionsdesigner', firmId: 'knightec', title: 'Senior Interaktionsdesigner', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'knightec-service-designer', firmId: 'knightec', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'j-106', firmId: 'silo-ai', title: 'Visual Designer, ML Tooling', discipline: 'Visual Designer', seniority: 'Mid', postedAt: daysAgo(3) },
  { id: 'telia-ux-ui-designer', firmId: 'telia', title: 'UX/UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'telia-senior-ux-designer', firmId: 'telia', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'fujitsu-tokyo-visual-designer', firmId: 'fujitsu-tokyo', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'hm-digital-experience-designer', firmId: 'hm', title: 'Digital Experience Designer (UX)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'hm-design-system-manager', firmId: 'hm', title: 'Design System Manager', discipline: 'UI Designer', seniority: 'Lead', postedAt: '2026-06-18' },
  { id: 'techseed-ux-ui-designer', firmId: 'techseed', title: 'UX/UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'castra-erfaren-ux-designer', firmId: 'castra', title: 'Erfaren UX-designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-18' },
  { id: 'castra-ux-ui-designer-konsult', firmId: 'castra', title: 'UX/UI Designer - Konsult till bankkund', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-18' },
  { id: 'softhouse-ux-ui-designer', firmId: 'softhouse', title: 'UX/UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-18' },
];
