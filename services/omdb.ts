import { normalizeTitle, calculateAverageRating } from '@/utils';
import { MovieWithRatings, OMDBDetailsSchema, OMDBDetails } from '../types/movie';
import { cacheService } from '@/utils/cache';

const OMDB_API_URL = 'https://www.omdbapi.com';

export async function fetchMovieDetails(
  title: string, 
  episode_id: number, 
  year: string
): Promise<OMDBDetails> {
  const cacheKey = `omdb-${title}-${episode_id}-${year}`;
  
  const cachedData = cacheService.get(cacheKey);
  if (cachedData) {
    return cachedData as OMDBDetails;
  }

  const response = await fetch(
    `${OMDB_API_URL}/?t=${encodeURIComponent(title)}&Episode=${episode_id}&y=${year}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
  );

  const data = await response.json();
  const ratings = OMDBDetailsSchema.parse(data);
  
  cacheService.set(cacheKey, ratings);
  return ratings;
}

export const getMovieRatings = async (movie: MovieWithRatings) => {
  const cacheKey = `ratings-${movie.episode_id}`;
  
  const cachedRatings = cacheService.get(cacheKey);
  if (cachedRatings) {
    return cachedRatings as MovieWithRatings;
  }

  const details = await fetchMovieDetails(
    movie.title, 
    movie.episode_id, 
    movie.release_date.split('-')[0]
  );

  const result = {
    ...details,
    averageRating: calculateAverageRating(details.Ratings),
    movieTitle: normalizeTitle(movie.title)
  };

  cacheService.set(cacheKey, result);
  return result;
};
