import { normalizeRating } from '@/utils';
import Image from 'next/image';
import ReactStars from 'react-stars';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const MovieDetails: React.FC = () => {
  const movie = useSelector((state: RootState) => state.movies.selectedMovie);

  if (!movie) return (
    <div className=" md:w-1/2 p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
        <p className="text-lg font-medium text-gray-500">Select a movie to view its details</p>
        <p className="text-sm text-gray-400">Click on any movie from the list to see more information</p>
      </div>
    </div>
  );

  return (
    <div className="md:w-1/2">
      <div className="p-4 bg-gray-50 rounded">
        <h2 className="text-center lg:text-left text-xl font-bold mb-4">{movie.title}</h2>

        <div className="flex flex-col sm:flex-row gap-4">
          {movie.Poster && (
            <Image
              loading='lazy'
              src={movie.Poster}
              alt={`${movie.title} image`}
              width={160}
              height={240}
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
              <span key={rating.Source} className="text-xs rounded-xl border-2 border-blue-300 text-blue-300 p-1">
                {rating.Source}: {normalizeRating(rating.Value, 'percentage')}%
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 