import type { Discipline, Seniority } from './taxonomy';

export type Profile = {
  name: string;
  initials: string;
  disciplines: Discipline[];
  seniorities: Seniority[];
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
};

// Mock signed-in profile for the prototype. Toggle via the top-bar avatar/sign-in.
export const MOCK_PROFILE: Profile & { lat: number; lng: number } = {
  name: 'Christian Almroth',
  initials: 'CA',
  disciplines: ['Art Director', '3D Artist', 'Creative Director', 'Visual Designer'],
  seniorities: ['Senior', 'Lead', 'Head of'],
  city: 'Stockholm',
  country: 'Sweden',
  countryCode: 'SE',
  lat: 59.33,
  lng: 18.06,
};
