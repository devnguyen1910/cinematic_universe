import { Movie, MovieVideo } from '../types';
import { mockMovies } from '../data/mockData';

// IMPORTANT: The TMDb API key is expected to be provided via the TMDB_API_KEY environment variable.
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

interface FetchOptions {
  [key: string]: string | number | boolean;
}

// Internal fetch function. Throws error on network/API failure.
const fetchFromTMDb = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
  const params = new URLSearchParams({
    api_key: TMDB_API_KEY!, // Assumes TMDB_API_KEY is present, checked by wrapper
    language: 'en-US',
    ...options,
  });

  const url = `${BASE_URL}${endpoint}?${params}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.status_message || 'Failed to fetch data from TMDb');
  }
  return response.json();
};

interface TMDbListResponse {
  results: Movie[];
}

interface VideoListResponse {
  id: number;
  results: MovieVideo[];
}

// A wrapper to handle API calls gracefully.
// It checks for the API key and catches any errors from the fetch call.
const handleApiCall = async <T>(apiCall: () => Promise<T>, defaultValue: T): Promise<T> => {
    if (!TMDB_API_KEY) {
        console.warn('TMDb API key is missing. Falling back to mock data. Please set the TMDB_API_KEY environment variable for live data.');
        return defaultValue;
    }
    try {
        return await apiCall();
    } catch (error) {
        console.error("TMDb API call failed. Falling back to mock data:", error);
        return defaultValue;
    }
};

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
    return handleApiCall(async () => {
        const data = await fetchFromTMDb<TMDbListResponse>('/movie/now_playing', { page: 1 });
        return data.results;
    }, mockMovies.filter(m => m.status === 'NOW_SHOWING'));
};

export const getUpcomingMovies = async (): Promise<Movie[]> => {
    return handleApiCall(async () => {
        const data = await fetchFromTMDb<TMDbListResponse>('/movie/upcoming', { page: 1 });
        return data.results;
    }, mockMovies.filter(m => m.status === 'COMING_SOON'));
};

export const getMovieDetails = async (movieId: number): Promise<Movie | null> => {
    return handleApiCall(async () => {
        return await fetchFromTMDb<Movie>(`/movie/${movieId}`);
    }, mockMovies.find(m => m.id === movieId) || null);
};

export const getMovieVideos = async (movieId: number): Promise<MovieVideo[]> => {
    return handleApiCall(async () => {
        const data = await fetchFromTMDb<VideoListResponse>(`/movie/${movieId}/videos`);
        return data.results;
    }, []); // Return empty array as fallback
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
    return handleApiCall(async () => {
        const data = await fetchFromTMDb<TMDbListResponse>('/search/movie', { query });
        return data.results;
    }, []); // Fallback to empty array as mock search isn't feasible
};


export const getImageUrl = (path: string | null | undefined, size: string = 'w500'): string => {
  if (!path) {
    // Return a placeholder image if no path is available
    return 'https://via.placeholder.com/500x750?text=No+Image';
  }
  return `${IMAGE_BASE_URL}${size}${path}`;
};