/**
 * Firm roster.
 *
 * Coordinates are city-precision on purpose. A firm's dot sits on its city's
 * coordinate, and MapView spreads firms that share a city with a deterministic
 * sunflower layout at street zoom. Earlier revisions stored a distinct
 * hand-written lat/lng per firm, which read as a real street position but was
 * not sourced from anything — the roster now only claims the precision it can
 * actually cite. `address`, where present, is the street address a public
 * source states; it is displayed as text and is not what places the dot.
 *
 * Verification pass: 2026-08-19 (see FIRMS_LAST_VERIFIED).
 */

export type Firm = {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2
  lat: number;
  lng: number;
  /**
   * How the coordinate was derived. 'city' = the city's coordinate, with
   * co-located firms spread by the map. 'address' = geocoded from a cited
   * street address. Nothing is stored as 'address' until it is geocoded from
   * a real source.
   */
  precision: 'city' | 'address';
  /** Street address from a public source, when one is on record. */
  address?: string;
  /** Standing note: ownership, rename, merger, or a correction worth keeping. */
  note?: string;
};

/** ISO date of the last roster verification pass. Surfaced next to the map. */
export const FIRMS_LAST_VERIFIED = '2026-08-19';

/**
 * City coordinates used for every firm in that city. Keyed `alpha2|city`.
 * Single source of truth: a firm never carries its own hand-set coordinate.
 */
export const CITY_COORDS: Record<string, readonly [number, number]> = {
  'SE|Stockholm': [59.3293, 18.0686],
  'SE|Gothenburg': [57.7089, 11.9746],
  'SE|Jönköping': [57.7815, 14.1562],
  'SE|Västerås': [59.6099, 16.5448],
  'SE|Lund': [55.7047, 13.191],
  'SE|Malmö': [55.605, 13.0038],
  'FI|Helsinki': [60.1699, 24.9384],
  'FI|Espoo': [60.2055, 24.6559],
  'FI|Tampere': [61.4978, 23.761],
  'NO|Oslo': [59.9139, 10.7522],
  'DK|Copenhagen': [55.6761, 12.5683],
  'DK|Herning': [56.1394, 8.9743],
  'GB|London': [51.5074, -0.1278],
  'DE|Munich': [48.1351, 11.582],
  'DE|Hamburg': [53.5511, 9.9937],
  'DE|Berlin': [52.52, 13.405],
  'NL|Rotterdam': [51.9244, 4.4777],
  'NL|Amsterdam': [52.3676, 4.9041],
  'IT|Milan': [45.4642, 9.19],
  'US|New York': [40.7128, -74.006],
  'US|Portland': [45.5152, -122.6784],
  'US|San Francisco': [37.7749, -122.4194],
  'CA|Victoria': [48.4284, -123.3656],
  'CA|Montreal': [45.5019, -73.5674],
  'AU|Sydney': [-33.8688, 151.2093],
  'IS|Reykjavík': [64.1466, -21.9426],
  'IE|Dublin': [53.3498, -6.2603],
  'FR|Paris': [48.8566, 2.3522],
  'JP|Tokyo': [35.6762, 139.6503],
};

export const FIRMS: Firm[] = [
  { id: 'north-kingdom', name: 'North Kingdom', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'acne', name: 'Acne', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city', note: 'Stockholm creative agency, part of Deloitte Digital since 2017. Not to be confused with the Acne Studios fashion label.' },
  { id: 'snask', name: 'Snask', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city', address: 'Skånegatan 61, Stockholm' },
  { id: 'bvd', name: 'BVD', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city', address: 'Åsögatan 115, 116 24 Stockholm' },
  { id: 'kurppa-hosk', name: 'Kurppa Hosk', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city', address: 'Grev Turegatan 11, 114 46 Stockholm' },
  { id: 'goodbye-kansas', name: 'Goodbye Kansas Studios', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city', address: 'Hammarbyterrassen 3, 120 30 Stockholm' },
  { id: 'bond', name: 'Bond Agency', city: 'Helsinki', country: 'Finland', countryCode: 'FI', lat: 60.1699, lng: 24.9384, precision: 'city', address: 'Siltasaarenkatu 8–10, 00530 Helsinki' },
  { id: 'bakken-baeck', name: 'Bakken & Bæck', city: 'Oslo', country: 'Norway', countryCode: 'NO', lat: 59.9139, lng: 10.7522, precision: 'city', address: 'Trondheimsveien 135, 0570 Oslo' },
  { id: 'heydays', name: 'Heydays', city: 'Oslo', country: 'Norway', countryCode: 'NO', lat: 59.9139, lng: 10.7522, precision: 'city', address: 'Kjølberggata 21, Oslo' },
  { id: 'e-types', name: 'e-Types', city: 'Copenhagen', country: 'Denmark', countryCode: 'DK', lat: 55.6761, lng: 12.5683, precision: 'city' },
  { id: 'kontrapunkt', name: 'Kontrapunkt', city: 'Copenhagen', country: 'Denmark', countryCode: 'DK', lat: 55.6761, lng: 12.5683, precision: 'city', address: 'Nikolaj Plads 2, 4th floor, 1067 Copenhagen K' },
  { id: 'pentagram', name: 'Pentagram', city: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, precision: 'city' },
  { id: 'wolff-olins', name: 'Wolff Olins', city: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, precision: 'city' },
  { id: 'dn-co', name: 'DN&Co', city: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, precision: 'city' },
  { id: 'moving-brands', name: 'Moving Brands', city: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, precision: 'city' },
  { id: 'the-mill', name: 'The Mill', city: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, precision: 'city', note: 'Relaunched Oct 2025 under TransPerfect after the Technicolor collapse; London studio active, MPC folded in.' },
  { id: 'bureau-borsche', name: 'Bureau Borsche', city: 'Munich', country: 'Germany', countryCode: 'DE', lat: 48.1351, lng: 11.582, precision: 'city' },
  { id: 'mutabor', name: 'Mutabor', city: 'Hamburg', country: 'Germany', countryCode: 'DE', lat: 53.5511, lng: 9.9937, precision: 'city' },
  { id: 'edenspiekermann', name: 'Edenspiekermann', city: 'Berlin', country: 'Germany', countryCode: 'DE', lat: 52.52, lng: 13.405, precision: 'city' },
  { id: 'hort', name: 'HORT', city: 'Berlin', country: 'Germany', countryCode: 'DE', lat: 52.52, lng: 13.405, precision: 'city', address: 'Hagelberger Str. 52, Berlin' },
  { id: 'studio-dumbar', name: 'Studio Dumbar', city: 'Rotterdam', country: 'Netherlands', countryCode: 'NL', lat: 51.9244, lng: 4.4777, precision: 'city', note: 'Trades as Studio Dumbar/DEPT®; part of DEPT since 2016.' },
  { id: 'random-studio', name: 'Random Studio', city: 'Amsterdam', country: 'Netherlands', countryCode: 'NL', lat: 52.3676, lng: 4.9041, precision: 'city' },
  { id: 'la-tigre', name: 'La Tigre', city: 'Milan', country: 'Italy', countryCode: 'IT', lat: 45.4642, lng: 9.19, precision: 'city' },
  { id: 'collins', name: 'Collins', city: 'New York', country: 'United States', countryCode: 'US', lat: 40.7128, lng: -74.006, precision: 'city' },
  { id: 'mother-design', name: 'Mother Design', city: 'New York', country: 'United States', countryCode: 'US', lat: 40.7128, lng: -74.006, precision: 'city' },
  { id: 'gretel', name: 'Gretel', city: 'New York', country: 'United States', countryCode: 'US', lat: 40.7128, lng: -74.006, precision: 'city' },
  { id: 'instrument', name: 'Instrument', city: 'Portland', country: 'United States', countryCode: 'US', lat: 45.5152, lng: -122.6784, precision: 'city' },
  { id: 'manual', name: 'Manual', city: 'San Francisco', country: 'United States', countryCode: 'US', lat: 37.7749, lng: -122.4194, precision: 'city' },
  { id: 'character-sf', name: 'Character', city: 'San Francisco', country: 'United States', countryCode: 'US', lat: 37.7749, lng: -122.4194, precision: 'city' },
  { id: 'metalab', name: 'MetaLab', city: 'Victoria', country: 'Canada', countryCode: 'CA', lat: 48.4284, lng: -123.3656, precision: 'city' },
  { id: 'sid-lee', name: 'Sid Lee', city: 'Montreal', country: 'Canada', countryCode: 'CA', lat: 45.5019, lng: -73.5674, precision: 'city' },
  { id: 'method', name: 'Method', city: 'New York', country: 'United States', countryCode: 'US', lat: 40.7128, lng: -74.006, precision: 'city', note: 'Offices are New York (HQ), Charlotte, Atlanta, Denver and London. There is no Sydney studio.' },
  { id: 'for-the-people', name: 'For The People', city: 'Sydney', country: 'Australia', countryCode: 'AU', lat: -33.8688, lng: 151.2093, precision: 'city' },
  { id: 'ueno', name: 'Ueno', city: 'Reykjavík', country: 'Iceland', countryCode: 'IS', lat: 64.1466, lng: -21.9426, precision: 'city', note: 'Reopened in 2025 as a boutique studio after the Twitter acqui-hire wound the original down.' },
  { id: 'afry-stockholm', name: 'Afry', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'afry-gothenburg', name: 'Afry', city: 'Gothenburg', country: 'Sweden', countryCode: 'SE', lat: 57.7089, lng: 11.9746, precision: 'city' },
  { id: 'nexer-gothenburg', name: 'Nexer Group', city: 'Gothenburg', country: 'Sweden', countryCode: 'SE', lat: 57.7089, lng: 11.9746, precision: 'city', address: 'Lindholmspiren 9, Gothenburg' },
  { id: 'nexer-stockholm', name: 'Nexer Group', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'knowit-stockholm', name: 'Knowit', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'knowit-oslo', name: 'Knowit', city: 'Oslo', country: 'Norway', countryCode: 'NO', lat: 59.9139, lng: 10.7522, precision: 'city' },
  { id: 'knowit-helsinki', name: 'Knowit', city: 'Helsinki', country: 'Finland', countryCode: 'FI', lat: 60.1699, lng: 24.9384, precision: 'city' },
  { id: 'tietoevry-helsinki', name: 'Tietoevry', city: 'Espoo', country: 'Finland', countryCode: 'FI', lat: 60.2055, lng: 24.6559, precision: 'city', address: 'Keilalahdentie 2–4, 02150 Espoo' },
  { id: 'tietoevry-stockholm', name: 'Tietoevry', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'visma-oslo', name: 'Visma', city: 'Oslo', country: 'Norway', countryCode: 'NO', lat: 59.9139, lng: 10.7522, precision: 'city' },
  { id: 'cognizant-london', name: 'Cognizant', city: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, precision: 'city' },
  { id: 'cognizant-newyork', name: 'Cognizant', city: 'New York', country: 'United States', countryCode: 'US', lat: 40.7128, lng: -74.006, precision: 'city' },
  { id: 'tcs-interactive-london', name: 'TCS Interactive', city: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, precision: 'city' },
  { id: 'infosys-wongdoody-london', name: 'Infosys Wongdoody', city: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, precision: 'city' },
  { id: 'accenture-song-london', name: 'Accenture Song', city: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, precision: 'city' },
  { id: 'accenture-song-dublin', name: 'Accenture Song', city: 'Dublin', country: 'Ireland', countryCode: 'IE', lat: 53.3498, lng: -6.2603, precision: 'city' },
  { id: 'accenture-song-stockholm', name: 'Accenture Song', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'deloitte-digital-newyork', name: 'Deloitte Digital', city: 'New York', country: 'United States', countryCode: 'US', lat: 40.7128, lng: -74.006, precision: 'city' },
  { id: 'deloitte-digital-london', name: 'Deloitte Digital', city: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, precision: 'city' },
  { id: 'deloitte-digital-stockholm', name: 'Deloitte Digital', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'ideo-sanfrancisco', name: 'IDEO', city: 'San Francisco', country: 'United States', countryCode: 'US', lat: 37.7749, lng: -122.4194, precision: 'city' },
  { id: 'ideo-london', name: 'IDEO', city: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, precision: 'city' },
  { id: 'ideo-tokyo', name: 'IDEO', city: 'Tokyo', country: 'Japan', countryCode: 'JP', lat: 35.6762, lng: 139.6503, precision: 'city' },
  { id: 'mckinsey-design-newyork', name: 'McKinsey Design', city: 'New York', country: 'United States', countryCode: 'US', lat: 40.7128, lng: -74.006, precision: 'city' },
  { id: 'designit-copenhagen', name: 'Designit', city: 'Copenhagen', country: 'Denmark', countryCode: 'DK', lat: 55.6761, lng: 12.5683, precision: 'city' },
  { id: 'designit-london', name: 'Designit', city: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, precision: 'city' },
  { id: 'designit-munich', name: 'Designit', city: 'Munich', country: 'Germany', countryCode: 'DE', lat: 48.1351, lng: 11.582, precision: 'city' },
  { id: 'frog-sanfrancisco', name: 'Frog', city: 'San Francisco', country: 'United States', countryCode: 'US', lat: 37.7749, lng: -122.4194, precision: 'city' },
  { id: 'frog-london', name: 'Frog', city: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, precision: 'city' },
  { id: 'frog-munich', name: 'Frog', city: 'Munich', country: 'Germany', countryCode: 'DE', lat: 48.1351, lng: 11.582, precision: 'city' },
  { id: 'ibm-ix-newyork', name: 'IBM iX', city: 'New York', country: 'United States', countryCode: 'US', lat: 40.7128, lng: -74.006, precision: 'city' },
  { id: 'publicis-sapient-newyork', name: 'Publicis Sapient', city: 'New York', country: 'United States', countryCode: 'US', lat: 40.7128, lng: -74.006, precision: 'city' },
  { id: 'publicis-sapient-london', name: 'Publicis Sapient', city: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278, precision: 'city' },
  { id: 'ey-doberman-stockholm', name: 'EY Doberman', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'ey-doberman-newyork', name: 'EY Doberman', city: 'New York', country: 'United States', countryCode: 'US', lat: 40.7128, lng: -74.006, precision: 'city' },
  { id: 'capgemini-invent-paris', name: 'Capgemini Invent', city: 'Paris', country: 'France', countryCode: 'FR', lat: 48.8566, lng: 2.3522, precision: 'city' },
  { id: 'sopra-steria-paris', name: 'Sopra Steria', city: 'Paris', country: 'France', countryCode: 'FR', lat: 48.8566, lng: 2.3522, precision: 'city' },
  { id: 'rejlers', name: 'Rejlers', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'consid', name: 'Consid', city: 'Jönköping', country: 'Sweden', countryCode: 'SE', lat: 57.7815, lng: 14.1562, precision: 'city', address: 'Lillsjöraden 22, 553 20 Jönköping' },
  { id: 'hiq', name: 'HiQ', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city', address: 'Katarinavägen 15, Stockholm' },
  { id: 'vincit', name: 'Vincit', city: 'Tampere', country: 'Finland', countryCode: 'FI', lat: 61.4978, lng: 23.761, precision: 'city' },
  { id: 'itm8', name: 'itm8', city: 'Herning', country: 'Denmark', countryCode: 'DK', lat: 56.1394, lng: 8.9743, precision: 'city', note: 'Headquartered in Herning, not Aarhus.' },
  { id: 'silo-ai', name: 'Silo AI', city: 'Helsinki', country: 'Finland', countryCode: 'FI', lat: 60.1699, lng: 24.9384, precision: 'city', note: 'Part of AMD since Aug 2024; Helsinki team intact.' },
  { id: 'qestit', name: 'Qestit', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'twoday', name: 'twoday', city: 'Oslo', country: 'Norway', countryCode: 'NO', lat: 59.9139, lng: 10.7522, precision: 'city' },
  { id: 'nitor', name: 'Nitor', city: 'Helsinki', country: 'Finland', countryCode: 'FI', lat: 60.1699, lng: 24.9384, precision: 'city' },
  { id: 'telia', name: 'Telia', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'knightec', name: 'Knightec Group', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city', note: 'Knightec and Semcon merged into Knightec Group; merger completed 2025. HQ in Solna, Stockholm.' },
  { id: 'fujitsu-tokyo', name: 'Fujitsu', city: 'Tokyo', country: 'Japan', countryCode: 'JP', lat: 35.6762, lng: 139.6503, precision: 'city' },
  { id: 'prevas', name: 'Prevas', city: 'Västerås', country: 'Sweden', countryCode: 'SE', lat: 59.6099, lng: 16.5448, precision: 'city' },
  { id: 'b3', name: 'B3 Consulting', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'omegapoint', name: 'Omegapoint', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'softronic', name: 'Softronic', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'kvadrat', name: 'Kvadrat', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'nektab', name: 'Nektab', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'xlent', name: 'Xlent', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'time-people-group', name: 'Time People Group', city: 'Oslo', country: 'Norway', countryCode: 'NO', lat: 59.9139, lng: 10.7522, precision: 'city' },
  { id: 'cag', name: 'CAG Group', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'co-native', name: 'Co-native', city: 'Oslo', country: 'Norway', countryCode: 'NO', lat: 59.9139, lng: 10.7522, precision: 'city' },
  { id: 'hm', name: 'H&M', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'centigo', name: 'Centigo', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'bybrick', name: 'byBrick', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'forefront', name: 'Forefront Consulting', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'human-it', name: 'Human IT', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'accigo', name: 'Accigo', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'system-verification', name: 'System Verification', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'techseed', name: 'TechSeed', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'dynabyte', name: 'Dynabyte', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'influence', name: 'Influence', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'ddp', name: 'DDP', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'precio-fishbone', name: 'Precio Fishbone', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'castra', name: 'Castra', city: 'Gothenburg', country: 'Sweden', countryCode: 'SE', lat: 57.7089, lng: 11.9746, precision: 'city' },
  { id: 'agreat', name: 'Agreat', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'tretton37', name: 'tretton37', city: 'Lund', country: 'Sweden', countryCode: 'SE', lat: 55.7047, lng: 13.191, precision: 'city' },
  { id: 'plantvision', name: 'Plantvision', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'togethertech', name: 'TogetherTech', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'addpro', name: 'AddPro', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'm4', name: 'M4', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'digitalent', name: 'Digitalent', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'advania-reykjavik', name: 'Advania', city: 'Reykjavík', country: 'Iceland', countryCode: 'IS', lat: 64.1466, lng: -21.9426, precision: 'city' },
  { id: 'aqc', name: 'AQC', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'softhouse', name: 'Softhouse', city: 'Malmö', country: 'Sweden', countryCode: 'SE', lat: 55.605, lng: 13.0038, precision: 'city' },
  { id: 'sylog', name: 'Sylog', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'cygate', name: 'Cygate', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'conoa', name: 'Conoa', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },
  { id: 'accelerate', name: 'Accelerate', city: 'Stockholm', country: 'Sweden', countryCode: 'SE', lat: 59.3293, lng: 18.0686, precision: 'city' },];

/**
 * Entries dropped by the 2026-08-19 verification pass, with the reason. Kept in
 * source so a later refresh cannot quietly reintroduce a firm that was checked
 * and found not to exist (or to have been merged away).
 */
export const RETIRED_FIRMS: Record<string, string> = {
  'frontify-creative':
    'No such firm. Frontify AG is a brand-management SaaS headquartered in St. Gallen (offices: St. Gallen, New York, London) — there is no Frontify design studio in Zürich.',
  'kurppa':
    'No such firm. Conflated with Kurppa Hosk, which is a Stockholm agency (further studios in Oslo, New York, Chicago) — not a Helsinki studio.',
  'mpc':
    'Folded into The Mill. Technicolor collapsed in Feb 2025; TransPerfect bought both studios and consolidated them under The Mill brand in 2026.',
  'mckinsey-design-stockholm':
    'McKinsey closed the Stockholm design studio (ex-Veryday) in 2024. McKinsey Design continues elsewhere — the New York entry stays.',
};

export const FIRMS_BY_ID = Object.fromEntries(FIRMS.map((f) => [f.id, f] as const));
