/**
 * Mock design/talent/HR contacts per firm. Names are placeholder initials, NOT real people.
 * Emails follow firm-domain pattern (e.g. careers@northkingdom.com).
 * Real data will land here from the contact-researcher agent.
 */
export type Contact = {
  firmId: string;
  name: string;
  role: string;
  email?: string;
  linkedin?: string;
};

export const CONTACTS: Contact[] = [
  // Stockholm
  { firmId: 'north-kingdom', name: 'A. Lindberg', role: 'Head of Talent', email: 'careers@northkingdom.com' },
  { firmId: 'north-kingdom', name: 'M. Bergström', role: 'Studio Director' },
  { firmId: 'snask', name: 'J. Sjöberg', role: 'Studio Manager', email: 'jobs@snask.com' },
  { firmId: 'bvd', name: 'P. Eklund', role: 'People & Culture Lead', email: 'careers@bvd.se' },
  { firmId: 'goodbye-kansas', name: 'L. Ahlin', role: 'Talent Acquisition', email: 'careers@goodbyekansas.com' },

  // London
  { firmId: 'pentagram', name: 'R. Holloway', role: 'Studio Director', email: 'careers@pentagram.com' },
  { firmId: 'wolff-olins', name: 'S. Patel', role: 'Head of Talent, EMEA', email: 'careers@wolffolins.com' },
  { firmId: 'the-mill', name: 'K. O\'Brien', role: 'Senior Recruiter, VFX', email: 'careers@themill.com' },
  { firmId: 'moving-brands', name: 'D. Thompson', role: 'Creative Director' },

  // New York
  { firmId: 'collins', name: 'B. Carter', role: 'Director of Talent', email: 'careers@wearecollins.com' },
  { firmId: 'mother-design', name: 'E. Nguyen', role: 'Studio Director' },
  { firmId: 'gretel', name: 'T. Marsden', role: 'Head of People', email: 'jobs@gretelny.com' },

  // West coast US
  { firmId: 'instrument', name: 'C. Yamamoto', role: 'Design Hiring Lead', email: 'careers@instrument.com' },
  { firmId: 'manual', name: 'V. Reyes', role: 'Creative Director' },

  // Engineering / IT consultancies (Cinode roster)
  { firmId: 'afry-stockholm', name: 'H. Karlsson', role: 'Head of Industrial Design', email: 'design@afry.com' },
  { firmId: 'afry-stockholm', name: 'I. Söderqvist', role: 'Talent Partner', email: 'careers@afry.com' },
  { firmId: 'nexer-stockholm', name: 'F. Berg', role: 'Head of Experience Design', email: 'careers@nexergroup.com' },
  { firmId: 'knowit-stockholm', name: 'O. Lundgren', role: 'Creative Director, Brand', email: 'careers@knowit.se' },
  { firmId: 'consid', name: 'N. Hellström', role: 'Design Practice Lead', email: 'jobs@consid.se' },
  { firmId: 'hiq', name: 'M. Olsson', role: 'Head of Design', email: 'careers@hiq.se' },
  { firmId: 'tretton37', name: 'P. Ek', role: 'Studio Lead', email: 'careers@tretton37.com' },
  { firmId: 'tietoevry-helsinki', name: 'R. Virtanen', role: 'Head of Service Design', email: 'careers@tietoevry.com' },
  { firmId: 'nitor', name: 'A. Mäkelä', role: 'Design Lead', email: 'careers@nitor.com' },
  { firmId: 'vincit', name: 'T. Salo', role: 'Lead Designer', email: 'jobs@vincit.com' },
  { firmId: 'b3', name: 'E. Sjögren', role: 'Head of Design Practice', email: 'careers@b3.se' },
  { firmId: 'centigo', name: 'L. Westin', role: 'People Lead', email: 'careers@centigo.com' },
  { firmId: 'omegapoint', name: 'J. Friberg', role: 'Lead Designer', email: 'careers@omegapoint.se' },

  // Global enterprise consultancies (Band B)
  { firmId: 'accenture-song-stockholm', name: 'V. Strand', role: 'Design Director, Nordics', email: 'careers@accenturesong.com' },
  { firmId: 'deloitte-digital-stockholm', name: 'K. Holm', role: 'Head of Studio, Stockholm', email: 'creativecareers@deloitte.se' },
  { firmId: 'ey-doberman-stockholm', name: 'M. Forsberg', role: 'Talent Lead', email: 'careers@dobermandesign.com' },
  { firmId: 'ideo-sanfrancisco', name: 'S. Park', role: 'Head of Design Recruiting', email: 'careers@ideo.com' },
  { firmId: 'ideo-london', name: 'A. Rahman', role: 'Recruiter, Design', email: 'careers@ideo.com' },
  { firmId: 'frog-london', name: 'C. Marin', role: 'Talent Lead, EMEA', email: 'careers@frog.co' },
  { firmId: 'frog-sanfrancisco', name: 'P. Walsh', role: 'Director of Talent', email: 'careers@frog.co' },
  { firmId: 'mckinsey-design-stockholm', name: 'A. Ekberg', role: 'Senior Recruiter, Design' },
  { firmId: 'designit-copenhagen', name: 'H. Møller', role: 'Studio Director', email: 'careers@designit.com' },
  { firmId: 'designit-london', name: 'D. Khan', role: 'Head of Talent, EMEA', email: 'careers@designit.com' },
  { firmId: 'publicis-sapient-london', name: 'R. Williams', role: 'Talent Director, Experience', email: 'careers@publicissapient.com' },
];

export function contactsFor(firmId: string): Contact[] {
  return CONTACTS.filter((c) => c.firmId === firmId);
}
