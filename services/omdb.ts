import { normalizeTitle } from '@/utils';
import { calculateAverageRating } from '@/utils';
import { MovieWithRatings, OMDBDetailsSchema, OMDBDetails } from '../types/movie';

export async function fetchMovieDetails(title: string, year: string): Promise<OMDBDetails> {
  console.log({ title, year });
  const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`);
  const data = await response.json();

  const ratings = OMDBDetailsSchema.parse(data);
  return ratings;
}

export const getMovieRatings = async (movie: MovieWithRatings) => {
  const details = await fetchMovieDetails(movie.title, movie.release_date.split('-')[0]);
  return {
    ...details,
    averageRating: calculateAverageRating(details.Ratings),
    movieTitle: normalizeTitle(movie.title)
  };
};
