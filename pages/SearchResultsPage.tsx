import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/tmdbService';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Movie } from '../types';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        setLoading(true);
        const results = await searchMovies(query);
        setMovies(results);
        setLoading(false);
      };
      fetchMovies();
    } else {
      setMovies([]);
    }
  }, [query]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold border-l-4 border-brand-red pl-4">
        Search Results for "{query}"
      </h1>
      
      {loading ? (
        <LoadingSpinner />
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-brand-gray/30 rounded-lg">
            <h2 className="text-2xl font-semibold">No movies found.</h2>
            <p className="text-gray-400 mt-2">Try searching for a different title.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
