import { calculateAverageRating, normalizeTitle } from '@/utils';
import { MovieWithRatings, OMDBDetails } from '../types/movie';

export const fetchMovieDetails = async (movie: MovieWithRatings): Promise<OMDBDetails> => {
  const response = await fetch(
    `/api/movies/ratings?title=${encodeURIComponent(movie.title)}&episode=${movie.episode_id}&year=${movie.release_date.split('-')[0]}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }

  return response.json();
};

export const getMovieRatings = async (movie: MovieWithRatings) => {
  const details = await fetchMovieDetails(movie);
  return {
    ...details,
    averageRating: calculateAverageRating(details.Ratings),
    movieTitle: normalizeTitle(movie.title)
  };
};
