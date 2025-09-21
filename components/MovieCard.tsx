import React, { useState, useEffect } from 'react';
// FIX: Corrected import for react-router-dom components.
import { Link } from 'react-router-dom';
import { Movie } from '../types';
import { getImageUrl } from '../services/tmdbService';
import { getRatingForMovie } from '../services/ratingService';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [userRating, setUserRating] = useState<{ average: number; count: number } | null>(null);

  useEffect(() => {
    if (movie?.id) {
        const ratingData = getRatingForMovie(movie.id);
        setUserRating(ratingData);
    }
  }, [movie.id]);

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg bg-brand-gray">
      <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      
      {/* User Rating Badge (Top Left) */}
      {userRating && userRating.count > 0 && (
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 text-xs font-semibold" title={`${userRating.count} user votes`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="text-white">{userRating.average.toFixed(1)}</span>
        </div>
      )}

      {/* TMDb Rating Badge (Top Right) */}
      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 text-xs font-semibold" title="TMDb Rating">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="text-white">{movie.vote_average.toFixed(1)}</span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-white text-lg font-bold truncate">{movie.title}</h3>
      </div>
      <Link to={`/movie/${movie.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View details for {movie.title}</span>
      </Link>
    </div>
  );
};

export default MovieCard;
