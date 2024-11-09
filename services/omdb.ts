import { RatingSchema, Rating } from '../types/movie';

export async function fetchMovieRatings(title: string, year: string): Promise<Rating> {
  console.log({ title, year });
  const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`);
  const data = await response.json();

  const ratings = RatingSchema.parse(data);
  return ratings;
}
