import { Movie, MovieSchema } from '../types/movie';

const SWAPI_API_URL = 'https://swapi.dev/api';

export async function fetchMovies(search?: string): Promise<Movie[]> {
  const url = search
    ? `${SWAPI_API_URL}/films/?format=json&search=${encodeURIComponent(search)}`
    : `${SWAPI_API_URL}/films/?format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data = await response.json();
  const movies = data.results.map((movie: Movie) => {
    return MovieSchema.parse(movie);
  });

  return movies;
}
