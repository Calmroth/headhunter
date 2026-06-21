import type { Discipline, Seniority } from './taxonomy';

/** ISO date stamped by the jobs-refresher pipeline on each successful run.
 *  Surfaced in the app footer so users can see how fresh the listings are.
 *  Rewritten in-place by the refresh script; do not edit by hand. */
export const JOBS_LAST_UPDATED = '2026-06-21';

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
  // Stockholm — BVD (live: 2x Motion Designer confirmed via bvd.se)
  { id: 'bvd-3d-motion-designer', firmId: 'bvd', title: '3D & Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'bvd-motion-designer', firmId: 'bvd', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-21' },

  // Stockholm — Kurppa Hosk (live: Packaging/Industrial Designer via Teamtailor)
  { id: 'kurppa-hosk-packaging-industrial-designer', firmId: 'kurppa-hosk', title: 'Packaging/Industrial Designer', discipline: 'Industrial Designer', seniority: 'Mid', postedAt: '2026-06-21' },

  // Oslo — Bakken & Bæck (live: 6 roles confirmed via bakkenbaeck.com/join)
  { id: 'bakken-baeck-lead-product-designer', firmId: 'bakken-baeck', title: 'Lead Product Designer', discipline: 'UI Designer', seniority: 'Lead', postedAt: '2026-06-21' },
  { id: 'bakken-baeck-senior-brand-designer', firmId: 'bakken-baeck', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'bakken-baeck-digital-design-lead', firmId: 'bakken-baeck', title: 'Digital Design Lead', discipline: 'Visual Designer', seniority: 'Lead', postedAt: '2026-06-21' },
  { id: 'bakken-baeck-creative-lead', firmId: 'bakken-baeck', title: 'Creative Lead', discipline: 'Art Director', seniority: 'Lead', postedAt: '2026-06-21' },
  { id: 'bakken-baeck-brand-designer', firmId: 'bakken-baeck', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'bakken-baeck-product-designer', firmId: 'bakken-baeck', title: 'Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-21' },

  // Copenhagen — Kontrapunkt (live: Concept Designer via Elvium)
  { id: 'kontrapunkt-concept-designer', firmId: 'kontrapunkt', title: 'Concept Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-21' },

  // London — Wolff Olins (live: 4 roles via wolffolins.com/jobs + Workable)
  { id: 'wolff-olins-senior-motion-designer', firmId: 'wolff-olins', title: 'Senior Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'wolff-olins-design-director', firmId: 'wolff-olins', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-21' },
  { id: 'wolff-olins-senior-designer', firmId: 'wolff-olins', title: 'Senior Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'wolff-olins-designer', firmId: 'wolff-olins', title: 'Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-21' },

  // London — DN&Co (live: 2 roles confirmed via dnco.com/jobs)
  { id: 'dn-co-senior-brand-and-motion-designer', firmId: 'dn-co', title: 'Senior Brand and Motion Designer', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'dn-co-senior-brand-designer', firmId: 'dn-co', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-21' },

  // London — Moving Brands (live: Designer role via Workable)
  { id: 'moving-brands-designer', firmId: 'moving-brands', title: 'Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-21' },

  // Germany — Mutabor (live: 7 roles via mutabor.jobs.personio.de)
  { id: 'mutabor-art-director-design', firmId: 'mutabor', title: 'Art Director Design (f/m/d)', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'mutabor-art-director-corporate-identity', firmId: 'mutabor', title: 'Art Director - Corporate Identity (f/m/d)', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'mutabor-art-director-interior-retail', firmId: 'mutabor', title: 'Art Director Interior Design / Retail Design (f/m/d)', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'mutabor-senior-motion-designer', firmId: 'mutabor', title: 'Senior Motion Designer (f/m/d)', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'mutabor-junior-art-director-digital', firmId: 'mutabor', title: 'Junior Art Director Digital (f/m/d)', discipline: 'Art Director', seniority: 'Junior', postedAt: '2026-06-21' },
  { id: 'mutabor-creative-director-fmcg', firmId: 'mutabor', title: 'Creative Director (m/w/d) – Schwerpunkt FMCG', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'mutabor-design-director', firmId: 'mutabor', title: 'Design Director (f/m/d)', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-21' },

  // Canada — MetaLab (live: 8 roles via Greenhouse job-boards.greenhouse.io/metalab)
  { id: 'metalab-ai-native-sr-product-designer', firmId: 'metalab', title: 'AI Native Sr. Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'metalab-product-designer', firmId: 'metalab', title: 'Product Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'metalab-senior-product-designer', firmId: 'metalab', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'metalab-design-director', firmId: 'metalab', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-21' },
  { id: 'metalab-executive-design-director', firmId: 'metalab', title: 'Executive Design Director (Brand, Product & Experience)', discipline: 'Creative Director', seniority: 'Head of', postedAt: '2026-06-21' },
  { id: 'metalab-brand-director', firmId: 'metalab', title: 'Brand Director', discipline: 'Brand Designer', seniority: 'Head of', postedAt: '2026-06-21' },
  { id: 'metalab-brand-designer', firmId: 'metalab', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'metalab-senior-brand-designer-marketing', firmId: 'metalab', title: 'Senior Brand Designer (Marketing)', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-21' },

  // Canada — Sid Lee (live: 7 roles via Greenhouse on sidlee.com)
  { id: 'sid-lee-directeur-artistique-senior', firmId: 'sid-lee', title: 'Directeur.trice Artistique Senior - Senior Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-04-27' },
  { id: 'sid-lee-art-director', firmId: 'sid-lee', title: 'Art Director', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'sid-lee-directeur-artistique', firmId: 'sid-lee', title: 'Directeur.trice artistique - Art Director', discipline: 'Art Director', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'sid-lee-senior-art-director-mat-leave', firmId: 'sid-lee', title: 'Senior Art Director (Mat Leave Contract, 1 year)', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'sid-lee-designer-ui', firmId: 'sid-lee', title: 'Designer UI - UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'sid-lee-creative-director-ny', firmId: 'sid-lee', title: 'Creative Director, NY', discipline: 'Creative Director', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'sid-lee-design-director-global', firmId: 'sid-lee', title: 'Design Director - Global Task Force', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-21' },

  // Australia — Method (live: Senior Product Designer via Greenhouse)
  { id: 'method-senior-product-designer', firmId: 'method', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },

  // Australia — For The People (live: Design Director)
  { id: 'for-the-people-design-director', firmId: 'for-the-people', title: 'Design Director', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-21' },

  // Switzerland — Frontify (live: 4 roles via jobs.lever.co/frontify)
  { id: 'frontify-creative-principal-product-designer-guidelines', firmId: 'frontify-creative', title: 'Principal Product Designer - Group Guidelines & Finder', discipline: 'UX Designer', seniority: 'Principal', postedAt: '2026-06-21' },
  { id: 'frontify-creative-principal-product-designer-design-systems', firmId: 'frontify-creative', title: 'Principal Product Designer - Design Systems', discipline: 'UX Designer', seniority: 'Principal', postedAt: '2026-06-21' },
  { id: 'frontify-creative-senior-product-designer', firmId: 'frontify-creative', title: 'Senior Product Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'frontify-creative-senior-designer', firmId: 'frontify-creative', title: 'Senior Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-21' },

  // Engineering & IT consultancies (Band C) — AFRY (live: UX/UI Designer roles found via search)
  { id: 'afry-stockholm-ux-ui-designer', firmId: 'afry-stockholm', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'afry-gothenburg-ux-ui-designer', firmId: 'afry-gothenburg', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },

  // Nexer Group (live: UX Designer roles confirmed)
  { id: 'nexer-gothenburg-ux-designer-samhallsviktigt', firmId: 'nexer-gothenburg', title: 'UX Designer till samhällsviktigt inhouse-uppdrag', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'nexer-gothenburg-erfaren-service-designer', firmId: 'nexer-gothenburg', title: 'Erfaren Service Designer till Nexer Maverick', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-04-07' },
  { id: 'nexer-stockholm-ux-designer-samhallsviktigt', firmId: 'nexer-stockholm', title: 'UX Designer till samhällsviktigt inhouse-uppdrag', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },

  // Knowit (live: UX Designer roles confirmed via knowit.se and knowit.no)
  { id: 'knowit-stockholm-ux-designer', firmId: 'knowit-stockholm', title: 'UX-designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'knowit-oslo-ux-designere-innovasjon', firmId: 'knowit-oslo', title: 'Engasjerte UX-designere til givende og samfunnsnyttige innovasjonsprosjekter', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'knowit-oslo-senior-ux-designere', firmId: 'knowit-oslo', title: 'Senior UX-Designere til innovative og samfunnsnyttige løsninger', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },

  // Tietoevry (live: UX/UI Designer in Solna/Stockholm area)
  { id: 'tietoevry-stockholm-ux-ui-designer-banktech', firmId: 'tietoevry-stockholm', title: 'UX/UI Designer - Tieto Banktech (m/f/d)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },

  // Visma Oslo (live: Product Designer via finn.no, Dec 2025)
  { id: 'visma-oslo-product-designer', firmId: 'visma-oslo', title: 'Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2025-12-29' },

  // Cognizant New York (live: Digital Product Designer, June 2026)
  { id: 'cognizant-newyork-digital-product-designer', firmId: 'cognizant-newyork', title: 'Digital Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-08' },

  // Infosys WongDoody London (live: 4 roles via Greenhouse)
  { id: 'infosys-wongdoody-london-ux-lead', firmId: 'infosys-wongdoody-london', title: 'UX Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2025-11-12' },
  { id: 'infosys-wongdoody-london-design-lead', firmId: 'infosys-wongdoody-london', title: 'Design Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-21' },
  { id: 'infosys-wongdoody-london-creative-director-visual-design', firmId: 'infosys-wongdoody-london', title: 'Creative Director - Visual Design', discipline: 'Creative Director', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'infosys-wongdoody-london-creative-lead-motion', firmId: 'infosys-wongdoody-london', title: 'Creative Lead, Motion Design', discipline: 'Motion Designer', seniority: 'Lead', postedAt: '2026-06-21' },

  // Global enterprise consultancies (Band B)

  // Accenture Song London (live: 3 roles confirmed)
  { id: 'accenture-song-london-digital-product-designer', firmId: 'accenture-song-london', title: 'Digital Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-05-01' },
  { id: 'accenture-song-london-brand-campaign-midweight-product-designer', firmId: 'accenture-song-london', title: 'Brand Campaign Midweight Product Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-04-30' },
  { id: 'accenture-song-london-junior-product-designer', firmId: 'accenture-song-london', title: 'Junior Product Designer', discipline: 'UI Designer', seniority: 'Junior', postedAt: '2026-05-19' },

  // Accenture Song Dublin (live: 1 role confirmed)
  { id: 'accenture-song-dublin-design-system-specialist', firmId: 'accenture-song-dublin', title: 'Design System Specialist- UX/UI', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-05-06' },

  // Accenture Song Stockholm (live: UX Designer SONG confirmed Jan 2026)
  { id: 'accenture-song-stockholm-ux-designer-song', firmId: 'accenture-song-stockholm', title: 'UX Designer - SONG', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-01-28' },

  // Deloitte Digital (live roles confirmed)
  { id: 'deloitte-digital-newyork-senior-ux-designer', firmId: 'deloitte-digital-newyork', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'deloitte-digital-london-ux-designer-consultant', firmId: 'deloitte-digital-london', title: 'Deloitte Digital UX Designer – Consultant', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'deloitte-digital-london-ux-designer-analyst', firmId: 'deloitte-digital-london', title: 'User Experience Designer, Analyst to Consultant', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-21' },
  { id: 'deloitte-digital-stockholm-ux-designer', firmId: 'deloitte-digital-stockholm', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-02-20' },

  // IDEO (live roles via Greenhouse)
  { id: 'ideo-sanfrancisco-industrial-designer', firmId: 'ideo-sanfrancisco', title: 'Industrial Designer', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-02-09' },
  { id: 'ideo-sanfrancisco-design-research-lead', firmId: 'ideo-sanfrancisco', title: 'Design Research Lead', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-02-09' },
  { id: 'ideo-london-senior-communications-designer', firmId: 'ideo-london', title: 'Senior Communications Designer (Individual Contributor)', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'ideo-london-interaction-designer', firmId: 'ideo-london', title: 'Interaction Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'ideo-tokyo-senior-designer-visual-interaction', firmId: 'ideo-tokyo', title: 'Senior Designer, Visual Interaction Design', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-21' },

  // Frog (live roles confirmed: SF 3, London 2, Munich 2)
  { id: 'frog-sanfrancisco-sr-design-technologist', firmId: 'frog-sanfrancisco', title: 'Sr. Design Technologist', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'frog-sanfrancisco-senior-visual-designer', firmId: 'frog-sanfrancisco', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'frog-sanfrancisco-senior-service-designer', firmId: 'frog-sanfrancisco', title: 'Senior Service Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'frog-london-midweight-public-sector-service-designer', firmId: 'frog-london', title: 'Midweight Public Sector Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'frog-london-senior-service-designer-public-sector', firmId: 'frog-london', title: 'Senior Service Designer (Public Sector)', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'frog-munich-experience-design-intern', firmId: 'frog-munich', title: 'Experience Design Intern', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-21' },
  { id: 'frog-munich-service-design-intern', firmId: 'frog-munich', title: 'Service Design Intern', discipline: 'UX Designer', seniority: 'Junior', postedAt: '2026-06-21' },

  // Publicis Sapient (live roles confirmed)
  { id: 'publicis-sapient-newyork-ui-designer', firmId: 'publicis-sapient-newyork', title: 'UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'publicis-sapient-newyork-associate-design-director-ui', firmId: 'publicis-sapient-newyork', title: 'Associate Design Director - UI', discipline: 'Art Director', seniority: 'Lead', postedAt: '2026-06-21' },
  { id: 'publicis-sapient-london-ux-ui-designer-saas', firmId: 'publicis-sapient-london', title: 'UX/UI Designer - SaaS', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'publicis-sapient-london-senior-ux-designer', firmId: 'publicis-sapient-london', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'publicis-sapient-london-associate-creative-director-visual', firmId: 'publicis-sapient-london', title: 'Associate Creative Director_Visual Design', discipline: 'Creative Director', seniority: 'Lead', postedAt: '2026-06-21' },
  { id: 'publicis-sapient-london-ux-ui-visual-working-student', firmId: 'publicis-sapient-london', title: 'UX UI Visual Design - working student 20 hours per week, 6-month contract', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-06-21' },

  // Capgemini Invent Paris / frog Paris (live: 2 roles via jobs.capgemini.com)
  { id: 'capgemini-invent-paris-frog-ui-designer', firmId: 'capgemini-invent-paris', title: 'frog - UI Designer F/H', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'capgemini-invent-paris-frog-senior-ux-designer', firmId: 'capgemini-invent-paris', title: 'frog - Senior UX Designer F/H', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },

  // Sopra Steria Paris (live: 3 UX roles confirmed via SmartRecruiters/careers portal)
  { id: 'sopra-steria-paris-ux-ui-designer-confirme-editeur', firmId: 'sopra-steria-paris', title: 'UX/UI Designer confirmé/e – Editeur de logiciels – Ile-de-France', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'sopra-steria-paris-ux-ui-designer-experimente-solutions', firmId: 'sopra-steria-paris', title: 'UX/UI Designer expérimenté(e) - BL Solutions & Expertises - Île-de-France', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-06-21' },
  { id: 'sopra-steria-paris-ux-designer-confirme-defense', firmId: 'sopra-steria-paris', title: 'UX Designer confirmé - Défense & Sécurité - Île-de-France', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },

  // Cinode customer roster — live findings

  // Consid (live: 2 UX roles confirmed)
  { id: 'consid-senior-ux-writer-content-designer', firmId: 'consid', title: 'Senior UX-writer / Content Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-03-31' },
  { id: 'consid-ux-ui-designer', firmId: 'consid', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },

  // HiQ (live: 2 roles confirmed via career.hiq.se)
  { id: 'hiq-ui-designer', firmId: 'hiq', title: 'UI-Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'hiq-ux-designer', firmId: 'hiq', title: 'UX-Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },

  // twoday (live: 2 UX roles confirmed)
  { id: 'twoday-ux-designer', firmId: 'twoday', title: 'UX designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'twoday-senior-ux-designer', firmId: 'twoday', title: 'Senior UX Designer', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-01-11' },

  // Telia (live: 2 UX roles confirmed via teliacompany.com)
  { id: 'telia-ux-ui-designer', firmId: 'telia', title: 'UX/UI Designer', discipline: 'UI Designer', seniority: 'Mid', postedAt: '2026-06-21' },
  { id: 'telia-ux-designer', firmId: 'telia', title: 'UX Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },

  // Knightec (live: 3 roles confirmed via career.knightecgroup.com)
  { id: 'knightec-ux-ui-designer', firmId: 'knightec', title: 'UX/UI Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-03-11' },
  { id: 'knightec-service-designer', firmId: 'knightec', title: 'Service Designer', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-03-11' },
  { id: 'knightec-senior-interaktionsdesigner', firmId: 'knightec', title: 'Senior Interaktionsdesigner', discipline: 'UX Designer', seniority: 'Senior', postedAt: '2026-04-08' },

  // H&M (live: 2 design roles confirmed via career.hm.com)
  { id: 'hm-design-system-manager', firmId: 'hm', title: 'Design System Manager', discipline: 'UI Designer', seniority: 'Lead', postedAt: '2026-06-21' },
  { id: 'hm-digital-experience-designer-ux', firmId: 'hm', title: 'Digital Experience Designer (UX)', discipline: 'UX Designer', seniority: 'Mid', postedAt: '2026-06-21' },

  // H&M batch already above

  // Firms whose careers pages were unreachable (403/DNS/network block) — existing entries preserved per refresh rules
  // e-types: HTTP 403, no current listings found
  { id: 'j-15', firmId: 'e-types', title: 'Type Designer', discipline: 'Type Designer', seniority: 'Senior', postedAt: '2026-06-15' },
  // edenspiekermann: host not in network egress allowlist
  { id: 'j-28', firmId: 'edenspiekermann', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-15' },
  // hort: host not in network egress allowlist
  { id: 'j-29', firmId: 'hort', title: 'Junior Visual Designer', discipline: 'Visual Designer', seniority: 'Junior', postedAt: '2026-06-15' },
  // studio-dumbar: host not in network egress allowlist
  { id: 'j-30', firmId: 'studio-dumbar', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-15' },
  // random-studio: host not in network egress allowlist
  { id: 'j-31', firmId: 'random-studio', title: 'Creative Technologist', discipline: 'Motion Designer', seniority: 'Senior', postedAt: '2026-06-15' },
  // la-tigre: host not in network egress allowlist
  { id: 'j-32', firmId: 'la-tigre', title: 'Visual Designer', discipline: 'Visual Designer', seniority: 'Mid', postedAt: '2026-06-15' },
  // collins: host not in network egress allowlist
  { id: 'j-33', firmId: 'collins', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-15' },
  { id: 'j-34', firmId: 'collins', title: 'Art Director', discipline: 'Art Director', seniority: 'Senior', postedAt: '2026-06-15' },
  // mother-design: host not in network egress allowlist
  { id: 'j-35', firmId: 'mother-design', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-15' },
  // gretel: host not in network egress allowlist
  { id: 'j-36', firmId: 'gretel', title: 'Motion Designer', discipline: 'Motion Designer', seniority: 'Mid', postedAt: '2026-06-15' },
  // instrument: host not in network egress allowlist
  { id: 'j-37', firmId: 'instrument', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-15' },
  { id: 'j-38', firmId: 'instrument', title: 'Lead 3D Artist', discipline: '3D Artist', seniority: 'Lead', postedAt: '2026-06-15' },
  // manual: host not in network egress allowlist
  { id: 'j-39', firmId: 'manual', title: 'Brand Designer', discipline: 'Brand Designer', seniority: 'Mid', postedAt: '2026-06-15' },
  // character-sf: HTTP 403, no current 2026 listings in search index
  { id: 'j-40', firmId: 'character-sf', title: 'Senior Brand Designer', discipline: 'Brand Designer', seniority: 'Senior', postedAt: '2026-06-15' },
  // ueno: appears retired/closed; careers page unreachable
  { id: 'j-45', firmId: 'ueno', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-15' },
  // forefront: HTTP 403
  { id: 'j-99', firmId: 'forefront', title: 'Lead UX Designer', discipline: 'UX Designer', seniority: 'Lead', postedAt: '2026-06-15' },
  // tretton37: HTTP 403
  { id: 'j-102', firmId: 'tretton37', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-15' },
  // plantvision: HTTP 403
  { id: 'j-103', firmId: 'plantvision', title: 'Industrial Designer, Pharma', discipline: 'Industrial Designer', seniority: 'Senior', postedAt: '2026-06-15' },
  // advania-reykjavik: HTTP 403
  { id: 'j-104', firmId: 'advania-reykjavik', title: 'Senior UI Designer', discipline: 'UI Designer', seniority: 'Senior', postedAt: '2026-06-15' },
  // softhouse: HTTP 403
  { id: 'j-105', firmId: 'softhouse', title: 'Senior Visual Designer', discipline: 'Visual Designer', seniority: 'Senior', postedAt: '2026-06-15' },
];
