"use client"

import React from 'react'
import { useFetchMovies } from '@/hooks/useFetchMovies';
import MovieItem from './MovieListItem';
import MovieDetails from './MovieDetails';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const MovieList: React.FC = () => {
  const { movies } = useFetchMovies();
  const { selectedMovie, loading } = useSelector((state: RootState) => state.movies);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (movies.length === 0) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-xl text-gray-600">No movies found</div>
    </div>
  )

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      <div className={`${selectedMovie ? 'md:w-1/2' : 'w-full'}`}>
        <div className="flex flex-col gap-2">
          {movies.map((movie) => (
            <MovieItem
              key={movie.episode_id}
              movie={movie}
            />
          ))}
        </div>
      </div>

      <MovieDetails />
    </div>
  )
}

export default MovieList;