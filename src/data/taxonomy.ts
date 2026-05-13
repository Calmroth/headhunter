export const DISCIPLINES = [
  '3D Artist',
  'Art Director',
  'Brand Designer',
  'CG Generalist',
  'Concept Artist',
  'Creative Director',
  'Industrial Designer',
  'Motion Designer',
  'Type Designer',
  'UI Designer',
  'UX Designer',
  'Visual Designer',
] as const;

export type Discipline = (typeof DISCIPLINES)[number];

export const SENIORITIES = ['Junior', 'Mid', 'Senior', 'Lead', 'Principal', 'Head of'] as const;
export type Seniority = (typeof SENIORITIES)[number];

export const INDUSTRIES = [
  'Brand & Identity',
  'Motion & Film',
  'Product Design',
  'Creative Leadership',
] as const;
export type Industry = (typeof INDUSTRIES)[number];

/** Maps each discipline to the industry bucket a firm gets credited for. */
export const DISCIPLINE_INDUSTRY: Record<Discipline, Industry> = {
  '3D Artist': 'Motion & Film',
  'Art Director': 'Brand & Identity',
  'Brand Designer': 'Brand & Identity',
  'CG Generalist': 'Motion & Film',
  'Concept Artist': 'Motion & Film',
  'Creative Director': 'Creative Leadership',
  'Industrial Designer': 'Product Design',
  'Motion Designer': 'Motion & Film',
  'Type Designer': 'Brand & Identity',
  'UI Designer': 'Product Design',
  'UX Designer': 'Product Design',
  'Visual Designer': 'Brand & Identity',
};

export const DISCIPLINE_SHORT: Record<Discipline, string> = {
  '3D Artist': '3D',
  'Art Director': 'AD',
  'Brand Designer': 'BRAND',
  'CG Generalist': 'CG',
  'Concept Artist': 'CONCEPT',
  'Creative Director': 'CD',
  'Industrial Designer': 'INDUSTRIAL',
  'Motion Designer': 'MOTION',
  'Type Designer': 'TYPE',
  'UI Designer': 'UI',
  'UX Designer': 'UX',
  'Visual Designer': 'VISUAL',
};
