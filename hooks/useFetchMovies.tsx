import { useState, useEffect, useMemo } from "react";
import { fetchMovieRatings } from "@/services/omdb";
import { MovieWithRatings } from "@/types/movie";
import { fetchMovies } from "@/services/swapi";
import { normalizeTitle, calculateAverageRating } from "@/utils";
import { useSearchParams } from 'next/navigation';

const fetchMovieWithRatings = async (movie: MovieWithRatings) => {
  const ratings = await fetchMovieRatings(movie.title, movie.release_date.split('-')[0]);
  return {
    ...ratings,
    averageRating: calculateAverageRating(ratings.Ratings),
    movieTitle: normalizeTitle(movie.title)
  };
};

export const useFetchMovies = () => {
  const [rawMovies, setRawMovies] = useState<MovieWithRatings[]>([]);
  const [movies, setMovies] = useState<MovieWithRatings[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const searchTerm = useMemo(() => searchParams.get('search') || '', [searchParams]);
  const orderBy = useMemo(() => searchParams.get('orderBy'), [searchParams]);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const moviesData = await fetchMovies(searchTerm);
        const ratingsResults = await Promise.allSettled(
          moviesData.map(fetchMovieWithRatings)
        );

        const ratingsMap = ratingsResults.reduce((acc, result) => {
          if (result.status === 'fulfilled') {
            const { movieTitle, ...ratings } = result.value;
            acc[movieTitle] = ratings;
          }
          return acc;
        }, {} as Record<string, Partial<MovieWithRatings>>);

        const updatedMovies = moviesData.map(movie => ({
          ...movie,
          ...ratingsMap[normalizeTitle(movie.title)]
        }));

        setRawMovies(updatedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [searchTerm]);

  useEffect(() => {
    const sortedMovies = [...rawMovies].sort((a, b) => {
      switch (orderBy) {
        case 'year':
          return a.release_date.localeCompare(b.release_date);
        case 'rating':
          const ratingA = a.averageRating || 0;
          const ratingB = b.averageRating || 0;
          return ratingB - ratingA;
        case 'episode':
        default:
          return a.episode_id - b.episode_id;
      }
    });

    setMovies(sortedMovies);
  }, [orderBy, rawMovies]);

  return { movies, loading };
};
