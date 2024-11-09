import { Movie, MovieSchema } from '../types/movie';

export async function fetchMovies(): Promise<Movie[]> {
  const response = await fetch('https://swapi.dev/api/films/?format=json');

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data = await response.json();
  const movies = data.results.map((movie: Movie) => {
    return MovieSchema.parse(movie);
  });

  return movies;
}
