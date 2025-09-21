import React, { useState, useEffect, memo } from 'react';
// FIX: Corrected import for react-router-dom components.
import { Link } from 'react-router-dom';
import { Movie } from '../types';
import { getImageUrl } from '../services/tmdbService';
import { getRatingForMovie } from '../services/ratingService';
import { useWishlist } from '../contexts/WishlistContext';
import { useNotification } from '../contexts/NotificationContext';
import LazyImage from './LazyImage';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [userRating, setUserRating] = useState<{ average: number; count: number } | null>(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addNotification } = useNotification();
  const inWishlist = isInWishlist(movie.id);

  useEffect(() => {
    if (movie?.id) {
        const ratingData = getRatingForMovie(movie.id);
        setUserRating(ratingData);
    }
  }, [movie.id]);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(movie.id);
      addNotification({
        type: 'info',
        message: `Đã xóa "${movie.title}" khỏi danh sách yêu thích`
      });
    } else {
      addToWishlist(movie);
      addNotification({
        type: 'success',
        message: `Đã thêm "${movie.title}" vào danh sách yêu thích`
      });
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg bg-gray-800 hover:shadow-xl transition-all duration-300 aspect-[2/3]">
      <LazyImage
        src={getImageUrl(movie.poster_path)} 
        alt={movie.title} 
        className="w-full h-full transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 z-20 ${
          inWishlist 
            ? 'bg-red-500/80 text-white transform scale-110' 
            : 'bg-black/50 text-gray-300 hover:bg-red-500/80 hover:text-white hover:scale-110'
        }`}
        title={inWishlist ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d={inWishlist 
            ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            : "M16.5 3C14.76 3 13.09 3.81 12 5.09 10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
          } />
        </svg>
      </button>
      
      {/* User Rating Badge (Top Left) */}
      {userRating && userRating.count > 0 && (
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 text-xs font-semibold" title={`${userRating.count} đánh giá từ người dùng`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="text-white">{userRating.average.toFixed(1)}</span>
        </div>
      )}

      {/* TMDb Rating Badge */}
      <div className="absolute bottom-16 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 text-xs font-semibold" title="Đánh giá TMDb">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="text-white">{movie.vote_average.toFixed(1)}</span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-white text-base font-bold line-clamp-2 leading-tight mb-1">{movie.title}</h3>
        <p className="text-gray-300 text-sm">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
        </p>
      </div>
      <Link to={`/movie/${movie.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">Xem chi tiết {movie.title}</span>
      </Link>
    </div>
  );
};

export default memo(MovieCard);
