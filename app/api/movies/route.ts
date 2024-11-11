import { Movie, MovieSchema } from '@/types/movie';
import { NextResponse } from 'next/server';
import { cacheService } from '@/utils/cache';

const SWAPI_API_URL = 'https://swapi.dev/api/films';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('search');

    const cacheKey = `movies-${searchTerm || 'all'}`;
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    const response = await fetch(
      `${SWAPI_API_URL}/${searchTerm ? `?search=${searchTerm}` : ''}`
    );
    
    const data = await response.json();
    const movies = data.results.map((movie: Movie) => MovieSchema.parse(movie));
    
    cacheService.set(cacheKey, movies);
    return NextResponse.json(movies);
    
  } catch (error) {
    console.error('SWAPI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    );
  }
} 