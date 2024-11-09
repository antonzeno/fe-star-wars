import { useState, useEffect } from "react";
import { fetchMovieRatings } from "@/services/omdb";
import { MovieWithRatings } from "@/types/movie";
import { fetchMovies } from "@/services/swapi";
import { normalizeTitle, calculateAverageRating } from "@/utils";

const fetchMovieWithRatings = async (movie: MovieWithRatings) => {
  const ratings = await fetchMovieRatings(movie.title, movie.release_date.split('-')[0]);
  return {
    ...ratings,
    averageRating: calculateAverageRating(ratings.Ratings),
    movieTitle: normalizeTitle(movie.title)
  };
};

export const useFetchMovies = () => {
  const [movies, setMovies] = useState<MovieWithRatings[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);

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

        setMovies(updatedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return {
    movies,
    loading,
  };
};
