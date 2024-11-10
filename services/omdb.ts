import { normalizeTitle } from '@/utils';
import { calculateAverageRating } from '@/utils';
import { MovieWithRatings, OMDBDetailsSchema, OMDBDetails } from '../types/movie';

const OMDB_API_URL = 'https://www.omdbapi.com';

export async function fetchMovieDetails(title: string, episode_id: number, year: string): Promise<OMDBDetails> {
  const response = await fetch(
    `${OMDB_API_URL}/?t=${encodeURIComponent(title)}&Episode=${episode_id}&y=${year}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
  );
  const data = await response.json();

  const ratings = OMDBDetailsSchema.parse(data);
  return ratings;
}

export const getMovieRatings = async (movie: MovieWithRatings) => {
  const details = await fetchMovieDetails(movie.title, movie.episode_id, movie.release_date.split('-')[0]);
  return {
    ...details,
    averageRating: calculateAverageRating(details.Ratings),
    movieTitle: normalizeTitle(movie.title)
  };
};
