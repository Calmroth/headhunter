/**
 * Editorial monogram for a firm name. 1-2 chars, uppercase.
 * Cases handled: digit-bearing names ("B3" → "B3"), multi-word ("Accenture Song" → "AS"),
 * single words ("Knowit" → "KN"), ampersand ("H&M" → "HM"), articles dropped ("The Mill" → "MI").
 */
export function monogram(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9& ]/g, '').replace(/&/g, '');
  const tokens = cleaned
    .split(/\s+/)
    .filter(Boolean)
    .filter((t) => t.toLowerCase() !== 'the');
  if (!tokens.length) return '·';
  const first = tokens[0];
  if (/\d/.test(first)) {
    const letters = first.replace(/[^A-Za-z]/g, '');
    const digits = first.replace(/[^0-9]/g, '');
    if (letters && digits) return (letters[0] + digits[0]).toUpperCase();
  }
  if (tokens.length >= 2) return (first[0] + tokens[1][0]).toUpperCase();
  return first.slice(0, 2).toUpperCase();
}
