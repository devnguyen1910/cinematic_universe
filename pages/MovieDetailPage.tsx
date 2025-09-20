import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { cinemas, showtimes } from '../data/mockData';
import { useBooking } from '../contexts/BookingContext';
import { generateSynopsis } from '../services/geminiService';
import { getMovieDetails, getMovieVideos, getImageUrl } from '../services/tmdbService';
import LoadingSpinner from '../components/LoadingSpinner';
import { Movie, Showtime } from '../types';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { startBooking } = useBooking();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  const [aiSynopsis, setAiSynopsis] = useState('');
  const [isLoadingSynopsis, setIsLoadingSynopsis] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const movieId = parseInt(id);
      const [movieData, videosData] = await Promise.all([
        getMovieDetails(movieId),
        getMovieVideos(movieId)
      ]);
      
      setMovie(movieData);

      if (videosData && videosData.length > 0) {
        // Prioritize official trailers, but fall back to any trailer
        const officialTrailer = videosData.find(video => video.type === 'Trailer' && video.site === 'YouTube' && video.official);
        const anyTrailer = videosData.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        setTrailerKey(officialTrailer?.key || anyTrailer?.key || null);
      }

      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  const handleGenerateSynopsis = async () => {
    if (!movie) return;
    setIsLoadingSynopsis(true);
    setAiSynopsis('');
    const generated = await generateSynopsis(movie.title);
    setAiSynopsis(generated);
    setIsLoadingSynopsis(false);
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!movie) {
    return <div className="text-center text-2xl text-gray-400">Movie details could not be loaded or the movie was not found.</div>;
  }
  
  const movieShowtimes = showtimes.filter(st => st.movieId === movie.id);

  const showtimesByCinema = movieShowtimes.reduce((acc, st) => {
    const cinema = cinemas.find(c => c.id === st.cinemaId);
    if (cinema) {
      if (!acc[cinema.id]) {
        acc[cinema.id] = { ...cinema, showtimes: [] };
      }
      acc[cinema.id].showtimes.push(st);
    }
    return acc;
  }, {} as Record<string, { id: string; name: string; location: string; showtimes: Showtime[] }>);

  return (
    <div className="space-y-8">
      {/* Movie Details */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="md:w-2/3 space-y-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <div className="flex items-center space-x-4 text-gray-400">
            <span className="border border-yellow-500 px-2 py-1 rounded text-sm font-bold text-yellow-500">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <span>{movie.runtime || ''} minutes</span>
            <span>{movie.genres?.map(g => g.name).join(', ')}</span>
          </div>
          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          
          <div className="border-t border-gray-700 pt-4">
            <h3 className="font-semibold text-lg mb-2">Release Date</h3>
            <p className="text-gray-400">{movie.release_date}</p>
          </div>
          
          <button
              onClick={handleGenerateSynopsis}
              disabled={isLoadingSynopsis}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✨ Generate AI Synopsis
          </button>
          
          {isLoadingSynopsis && <LoadingSpinner />}
          {aiSynopsis && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-purple-500">
                  <h3 className="font-semibold text-lg mb-2 text-purple-300">AI Generated Synopsis</h3>
                  <p className="text-gray-300">{aiSynopsis}</p>
              </div>
          )}
        </div>
      </div>
      
      {/* Trailer Section */}
      {trailerKey && (
        <div className="space-y-4">
           <h2 className="text-3xl font-bold border-l-4 border-brand-red pl-4">Trailer</h2>
           <div className="relative h-0" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
           </div>
        </div>
      )}


      {/* Showtimes */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-brand-red pl-4">Showtimes</h2>
        {Object.values(showtimesByCinema).length > 0 ? (
          Object.values(showtimesByCinema).map(cinema => (
            <div key={cinema.id} className="bg-brand-gray/50 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold">{cinema.name}</h3>
              <p className="text-gray-400 mb-4">{cinema.location}</p>
              <div className="flex flex-wrap gap-3">
                {cinema.showtimes.map(st => {
                  const cinemaDetails = cinemas.find(c => c.id === st.cinemaId);
                  if (!cinemaDetails) return null;
                  return (
                    <Link
                      key={st.id}
                      to={`/book/${st.id}`}
                      onClick={() => startBooking(movie, cinemaDetails, st)}
                      className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-brand-red transition-colors duration-300"
                    >
                      <span className="font-bold">{st.time}</span>
                      <span className="ml-2 text-sm text-gray-300 bg-gray-600 px-2 py-0.5 rounded-full">{st.format}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No showtimes available for this movie yet.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;