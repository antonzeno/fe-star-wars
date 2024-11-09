import { z } from 'zod';

export const MovieSchema = z.object({
  title: z.string(),
  episode_id: z.number(),
  release_date: z.string(),
  opening_crawl: z.string(),
});

export const RatingSchema = z.object({
  Ratings: z.array(z.object({
    Source: z.string(),
    Value: z.string(),
  })),
  Poster: z.string(),
  Director: z.string(),
  averageRating: z.number().optional(),
});

export type Movie = z.infer<typeof MovieSchema>;
export type Rating = z.infer<typeof RatingSchema>;

export type MovieWithRatings = Movie & Partial<Rating>;
