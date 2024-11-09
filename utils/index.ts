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

export const calculateAverageRating = (ratings: { Value: string }[] | undefined): number => {
  const normalizedRatings = ratings?.map(r => normalizeRating(r.Value)) || [];
  if (normalizedRatings.length === 0) return 0;

  const sum = normalizedRatings.reduce((a, b) => a + b, 0);
  return Number((sum / normalizedRatings.length).toFixed(2));
};

export const normalizeTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
};