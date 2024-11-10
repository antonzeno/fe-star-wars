"use client"

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMovie } from '@/redux/slices/moviesSlice';
import { RootState } from '@/redux/store';
import ReactStars from 'react-stars';
import { MovieWithRatings } from '@/types/movie';

const MovieItem: React.FC<{ movie: MovieWithRatings }> = ({ movie }) => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state: RootState) => state.movies.selectedMovie);

  const isSelected = selectedMovie?.episode_id === movie.episode_id;

  const handleClick = () => {
    dispatch(setSelectedMovie(isSelected ? null : movie));
  };

  return (
    <div
      onClick={handleClick}
      className={`p-3 cursor-pointer rounded hover:bg-gray-100 transition-colors w-full
        ${isSelected ? 'bg-gray-100' : ''}
        flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4`}
    >
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <span className="text-sm text-gray-500">Episode {movie.episode_id}</span>
        <span className="font-medium">{movie.title}</span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto sm:ml-auto">
        {movie.averageRating && (
          <div className="flex items-center gap-1">
            <ReactStars
              edit={false}
              count={10}
              value={movie.averageRating}
              size={20}
              color2={'#ffd700'}
              color1={'#D1D5DB'}
            />
          </div>
        )}
        <span className="text-sm text-gray-600">{movie.release_date}</span>
      </div>
    </div>
  );
};

export default MovieItem;