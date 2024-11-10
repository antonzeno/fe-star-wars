import { createAsyncThunk } from '@reduxjs/toolkit';
import { MovieWithRatings } from '@/types/movie';
import { fetchMovies } from '@/services/swapi';
import { normalizeTitle } from '@/utils';
import { getMovieRatings } from '@/services/omdb';

export const fetchMoviesWithRatings = createAsyncThunk(
  'movies/fetchMoviesWithRatings',
  async (searchTerm: string) => {
    const moviesData = await fetchMovies(searchTerm);
    const movieDetailsResult = await Promise.allSettled(
      moviesData.map(getMovieRatings)
    );

    const ratingsMap = movieDetailsResult.reduce((acc, result) => {
      if (result.status === 'fulfilled') {
        const { movieTitle, ...ratings } = result.value;
        acc[movieTitle] = ratings;
      }
      return acc;
    }, {} as Record<string, Partial<MovieWithRatings>>);

    return moviesData.map((movie: MovieWithRatings) => ({
      ...movie,
      ...ratingsMap[normalizeTitle(movie.title)]
    }));
  }
); 