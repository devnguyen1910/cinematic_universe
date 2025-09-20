import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';
import { getImageUrl } from '../services/tmdbService';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg bg-brand-gray">
      <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-white text-lg font-bold truncate">{movie.title}</h3>
        {/* Genre information is not displayed on the card to avoid extra API calls for genre mapping */}
      </div>
      <Link to={`/movie/${movie.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View details for {movie.title}</span>
      </Link>
    </div>
  );
};

export default MovieCard;