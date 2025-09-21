import React, { useState, useEffect } from 'react';
// FIX: Corrected import for react-router-dom components.
import { Link } from 'react-router-dom';
import { getNowPlayingMovies, getUpcomingMovies, getImageUrl } from '../services/tmdbService';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Movie } from '../types';

const HomePage: React.FC = () => {
  const [nowShowing, setNowShowing] = useState<Movie[]>([]);
  const [comingSoon, setComingSoon] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const [nowShowingData, comingSoonData] = await Promise.all([
        getNowPlayingMovies(),
        getUpcomingMovies()
      ]);
      setNowShowing(nowShowingData);
      setComingSoon(comingSoonData);
      setLoading(false);
    };

    fetchMovies();
  }, []);
  
  const featuredMovie = nowShowing[0];

  if (loading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="space-y-16">
      {/* Hero Banner */}
      {featuredMovie ? (
         <div className="relative w-full h-[60vh] rounded-lg overflow-hidden">
          <img src={getImageUrl(featuredMovie.backdrop_path, 'original')} alt={featuredMovie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{featuredMovie.title}</h1>
            <p className="max-w-xl mb-6 line-clamp-3">{featuredMovie.overview}</p>
            <Link 
              to={`/movie/${featuredMovie.id}`} 
              className="bg-brand-red text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              Book Now
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-brand-gray/30 rounded-lg">
            <h1 className="text-4xl font-bold">Welcome to Cinematic Universe</h1>
            <p className="text-gray-400 mt-4">Movie information is currently unavailable. Please check back later.</p>
        </div>
      )}

      {/* Now Showing Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-l-4 border-brand-red pl-4">Now Showing</h2>
        {nowShowing.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {nowShowing.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Could not load movies at this time.</p>
        )}
      </section>

      {/* Coming Soon Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-l-4 border-brand-red pl-4">Coming Soon</h2>
         {comingSoon.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {comingSoon.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
           <p className="text-gray-400">Could not load upcoming movies at this time.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
