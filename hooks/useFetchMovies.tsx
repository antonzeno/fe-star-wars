import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { fetchMoviesWithRatings, setOrderBy, setSelectedMovie } from '@/redux/slices/moviesSlice';
import { RootState } from '@/redux/store';
import { UnknownAction } from '@reduxjs/toolkit';

export const useFetchMovies = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { movies, loading } = useSelector((state: RootState) => state.movies);

  const searchTerm = searchParams.get('search') || '';
  const orderBy = searchParams.get('orderBy') || '';

  useEffect(() => {
    dispatch(fetchMoviesWithRatings(searchTerm) as unknown as UnknownAction);
    dispatch(setSelectedMovie(null));
  }, [dispatch, searchTerm]);

  useEffect(() => {
    if (!loading && orderBy) {
      dispatch(setOrderBy(orderBy));
    }
  }, [dispatch, loading, orderBy]);

  return { movies, loading };
};
