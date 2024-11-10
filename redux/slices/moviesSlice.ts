import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

    return moviesData.map(movie => ({
      ...movie,
      ...ratingsMap[normalizeTitle(movie.title)]
    }));
  }
);

interface MoviesState {
  movies: MovieWithRatings[];
  loading: boolean;
  error: string | null;
  orderBy: string;
  selectedMovie: MovieWithRatings | null;
}

const initialState: MoviesState = {
  movies: [],
  loading: true,
  error: null,
  orderBy: '',
  selectedMovie: null
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setOrderBy: (state, action) => {
      state.orderBy = action.payload;
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.set('orderBy', action.payload)
      window.history.replaceState({}, '', currentUrl.toString())
      state.movies = [...state.movies].sort((a, b) => {
        switch (action.payload) {
          case 'year':
            return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
          case 'rating':
            return (b.averageRating || 0) - (a.averageRating || 0);
          case 'episode':
          default:
            return a.episode_id - b.episode_id;
        }
      });
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesWithRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesWithRatings.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
      })
      .addCase(fetchMoviesWithRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      });
  }
});

export const { setOrderBy, setSelectedMovie, clearSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer; 