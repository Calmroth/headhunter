/**
 * Map from topojson numeric IDs (ISO 3166-1 numeric, as strings, padded if needed)
 * to ISO 3166-1 alpha-2 codes — only for countries present in FIRMS. Extend as needed.
 */
export const NUMERIC_TO_ALPHA2: Record<string, string> = {
  '036': 'AU', '36': 'AU',
  '040': 'AT', '40': 'AT',
  '056': 'BE', '56': 'BE',
  '124': 'CA',
  '208': 'DK',
  '246': 'FI',
  '250': 'FR',
  '276': 'DE',
  '352': 'IS',
  '372': 'IE',
  '380': 'IT',
  '392': 'JP',
  '528': 'NL',
  '578': 'NO',
  '724': 'ES',
  '752': 'SE',
  '756': 'CH',
  '826': 'GB',
  '840': 'US',
};

export const ALPHA2_TO_NUMERIC: Record<string, string> = Object.entries(NUMERIC_TO_ALPHA2)
  .reduce<Record<string, string>>((acc, [num, a2]) => {
    if (!acc[a2]) acc[a2] = num;
    return acc;
  }, {});
