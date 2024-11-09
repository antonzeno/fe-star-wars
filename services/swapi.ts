import { Movie, MovieSchema } from '../types/movie';

export async function fetchMovies(search?: string): Promise<Movie[]> {
  const baseUrl = 'https://swapi.dev/api/films/?format=json';
  const url = search ? `${baseUrl}&search=${encodeURIComponent(search)}` : baseUrl;

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
