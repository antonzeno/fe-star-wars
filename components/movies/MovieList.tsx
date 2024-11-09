"use client"

import { useFetchMovies } from '@/hooks/useFetchMovies';
import { MovieWithRatings } from '@/types/movie';
import React, { useState, useEffect } from 'react'
import MovieItem from './MovieListItem';
import MovieDetails from './MovieDetails';


const MovieList: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieWithRatings | null>(null)

  const { movies, loading } = useFetchMovies();

  useEffect(() => {
    if (loading) {
      setSelectedMovie(null);
    }
  }, [loading]);

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
            <MovieItem key={`${movie.title}-${movie.release_date}`} movie={movie} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
          ))}
        </div>
      </div>

      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} />
      ) : (
        <div className="hidden md:block md:w-1/2 p-4 text-gray-500 text-center">
          Select a movie to view its details
        </div>
      )}
    </div>
  )
}

export default MovieList;