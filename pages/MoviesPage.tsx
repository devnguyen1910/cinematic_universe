import React, { useState, useEffect } from 'react';
import { getNowPlayingMovies, getUpcomingMovies } from '../services/tmdbService';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Movie } from '../types';

const MoviesPage: React.FC = () => {
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-12">
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

export default MoviesPage;
