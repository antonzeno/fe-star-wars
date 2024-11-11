import { OMDBDetailsSchema } from '@/types/movie';
import { NextResponse } from 'next/server';
import { cacheService } from '@/utils/cache';

const OMDB_API_URL = 'https://www.omdbapi.com';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    const episode = searchParams.get('episode');
    const year = searchParams.get('year');

    if (!title || !episode || !year) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const cacheKey = `movie-ratings-${title}-${episode}-${year}`;
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    const response = await fetch(
      `${OMDB_API_URL}/?t=${encodeURIComponent(title)}&Episode=${episode}&y=${year}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
    );

    const data = await response.json();
    
    if (data.Error) {
      return NextResponse.json(
        { error: data.Error },
        { status: 404 }
      );
    }

    const ratings = OMDBDetailsSchema.parse(data);
    
    cacheService.set(cacheKey, ratings);
    return NextResponse.json(ratings);
    
  } catch (error) {
    console.error('OMDB API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie ratings' },
      { status: 500 }
    );
  }
} 