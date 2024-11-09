/**
 * Normalizes rating value to either a decimal or percentage format
 * @param value - Rating string in format "X/Y" or "Z%"
 * @param format - Output format: 'percentage' (0-100) or 'decimal' (0-10)
 * @returns Normalized number value
 * @example
 * normalizeRating("4/5") // returns 8.0 (decimal format)
 * normalizeRating("80%", "percentage") // returns 80.0
 */
export const normalizeRating = (
  value: string,
  format: 'percentage' | 'decimal' = 'decimal'
): number => {
  let result = 0;

  if (value.includes('/')) {
    const [numerator, denominator] = value.split('/').map(Number);
    result = numerator / denominator;
  } else if (value.endsWith('%')) {
    result = parseInt(value.replace('%', ''));
  }

  if (format === 'percentage') {
    return Number((value.endsWith('%') ? result : result * 100).toFixed(2));
  }
  return Number((value.endsWith('%') ? result / 10 : result * 10).toFixed(2));
};

/**
 * Calculates the average rating from an array of rating values
 * @param ratings - Array of rating objects containing Value property
 * @returns Average rating as a decimal number (0-10), rounded to 2 decimal places
 * @example
 * calculateAverageRating([{ Value: "4/5" }, { Value: "90%" }]) // returns 8.50
 */
export const calculateAverageRating = (ratings: { Value: string }[] | undefined): number => {
  const normalizedRatings = ratings?.map(r => normalizeRating(r.Value)) || [];
  if (normalizedRatings.length === 0) return 0;

  const sum = normalizedRatings.reduce((a, b) => a + b, 0);
  return Number((sum / normalizedRatings.length).toFixed(2));
};

/**
 * Normalizes a title string by converting to lowercase and removing special characters
 * @param title - Input title string
 * @returns Normalized title string containing only lowercase alphanumeric characters
 * @example
 * normalizeTitle("Hello World!") // returns "helloworld"
 */
export const normalizeTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
};