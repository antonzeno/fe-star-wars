import { Movie } from '@/types/movie';

export async function fetchMovies(searchTerm?: string): Promise<Movie[]> {
  const params = new URLSearchParams();
  if (searchTerm) {
    params.append('search', searchTerm);
  }

  const response = await fetch(`/api/movies?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  return response.json();
}
