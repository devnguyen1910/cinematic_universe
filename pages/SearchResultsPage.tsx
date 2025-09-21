import React, { useState, useEffect, useMemo } from 'react';
// FIX: Corrected import for react-router-dom components.
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../services/tmdbService';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Movie } from '../types';

const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;

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
    setCurrentPage(1);
  }, [query]);

  const filteredAndSortedMovies = useMemo(() => {
    let filtered = [...movies];

    // Filter by rating
    if (filterBy === 'high-rated') {
      filtered = filtered.filter(movie => movie.vote_average >= 7);
    } else if (filterBy === 'recent') {
      const currentYear = new Date().getFullYear();
      filtered = filtered.filter(movie => {
        const releaseYear = new Date(movie.release_date).getFullYear();
        return releaseYear >= currentYear - 3;
      });
    }

    // Sort movies
    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === 'year') {
      filtered.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [movies, sortBy, filterBy]);

  const totalPages = Math.ceil(filteredAndSortedMovies.length / moviesPerPage);
  const paginatedMovies = filteredAndSortedMovies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-4">
            Kết quả tìm kiếm cho "{query}"
          </h1>
          
          {movies.length > 0 && (
            <div className="text-gray-600 dark:text-gray-400">
              {filteredAndSortedMovies.length} phim
            </div>
          )}
        </div>

        {/* Filters and Sorting */}
        {movies.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Sắp xếp:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
              >
                <option value="relevance">Liên quan</option>
                <option value="rating">Đánh giá</option>
                <option value="year">Năm phát hành</option>
                <option value="title">Tên phim</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Lọc:</label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="high-rated">Đánh giá cao (7+)</option>
                <option value="recent">Phim mới (3 năm gần đây)</option>
              </select>
            </div>
          </div>
        )}
        
        {loading ? (
          <LoadingSpinner />
        ) : paginatedMovies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {paginatedMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Trước
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded ${
                          currentPage === page
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Sau
                </button>
              </div>
            )}
          </>
        ) : query ? (
          <div className="text-center py-20 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Không tìm thấy phim nào
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Thử tìm kiếm với từ khóa khác
            </p>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Nhập từ khóa để tìm kiếm phim
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
