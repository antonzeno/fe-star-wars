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
        flex flex-row items-center gap-4 flex-wrap md:flex-nowrap`}
    >
      <span className="text-sm text-gray-500 whitespace-nowrap">Episode {movie.episode_id}</span>
      <span className="font-medium flex-1">{movie.title}</span>
      <div className="flex items-center gap-4 ml-auto whitespace-nowrap">
        {movie.averageRating && (
          <div className="flex items-center gap-1">
            <ReactStars
              edit={false}
              count={10}
              value={movie.averageRating}
              size={24}
              color2={'#ffd700'}
              color1={'#D1D5DB'}
            />
            <span className="text-sm text-gray-600">{movie.averageRating}</span>
          </div>
        )}
        <span className="text-sm text-gray-600">{movie.release_date}</span>
      </div>
    </div>
  );
};

export default MovieItem;