/**
 * Three-letter atlas-style code from a city name. Diacritics stripped,
 * non-letters dropped, first three letters uppercased.
 *
 * Reykjavík → REY, Zürich → ZUR, São Paulo → SAO, New York → NEW.
 *
 * Known collisions (San Francisco vs San Diego, both SAN) are accepted in v1.
 * Add overrides here when the data layer carries a real city code.
 */
const OVERRIDES: Record<string, string> = {
  'San Francisco': 'SFO',
  'San Diego': 'SAN',
  'New York': 'NYC',
  'Los Angeles': 'LAX',
};

export function cityCode(city: string): string {
  if (OVERRIDES[city]) return OVERRIDES[city];
  const stripped = city
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z]/g, '');
  return stripped.slice(0, 3).toUpperCase() || '···';
}
