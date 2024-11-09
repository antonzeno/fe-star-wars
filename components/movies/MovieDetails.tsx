import { MovieWithRatings } from '@/types/movie';
import { normalizeRating } from '@/utils';
import Image from 'next/image';
import ReactStars from 'react-stars';

interface MovieDetailsProps {
  movie: MovieWithRatings;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  return (
    <div className="md:w-1/2">
      <div className="p-4 bg-gray-50 rounded">
        <h2 className="text-xl font-bold mb-4">{movie.title}</h2>

        <div className="flex flex-col sm:flex-row gap-4">
          {movie.Poster && (
            <Image
              loading='lazy'
              src={movie.Poster}
              alt={`${movie.title} image`}
              width={128}
              height={192}
              className="object-cover rounded mx-auto sm:mx-0"
            />
          )}
          <p className="text-gray-700 mb-4">{movie.opening_crawl}</p>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          {movie.Director && (
            <div>
              Directed by: {movie.Director}
            </div>
          )}
          {movie.averageRating && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Average Rating:</span>
              <ReactStars
                edit={false}
                count={10}
                value={movie.averageRating}
                size={24}
                color2={'#ffd700'}
                color1={'#D1D5DB'}
              />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {movie.Ratings && movie.Ratings.map((rating) => (
              <span key={rating.Source} className="text-xs rounded-xl border-2 border-blue-300 text-blue-300 p-1">{rating.Source}: {normalizeRating(rating.Value, 'percentage')}%</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 