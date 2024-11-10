import { Movie, MovieSchema } from '@/types/movie';
import { cacheService } from '@/utils/cache';

const SWAPI_API_URL = 'https://swapi.dev/api/films';

export async function fetchMovies(searchTerm?: string) {
  const cacheKey = `swapi-movies-${searchTerm || 'all'}`;
  
  const cachedData = cacheService.get(cacheKey);
  if (cachedData) {
    return MovieSchema.array().parse(cachedData);
  }

  const response = await fetch(
    `${SWAPI_API_URL}/${searchTerm ? `?search=${searchTerm}` : ''}`
  );
  const data = await response.json();
  const movies = data.results.map((movie: Movie) => MovieSchema.parse(movie));
  
  cacheService.set(cacheKey, movies);
  return movies;
}
