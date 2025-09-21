interface MovieRatings {
  [movieId: number]: number[];
}

const RATINGS_STORAGE_KEY = 'movie_ratings';
const USER_RATED_STORAGE_KEY = 'user_rated_movies';

// Helper to safely get data from localStorage
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key “${key}”:`, error);
    return defaultValue;
  }
};

// Helper to safely set data to localStorage
const setInStorage = <T>(key: string, value: T): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key “${key}”:`, error);
  }
};

/**
 * Retrieves the average rating and vote count for a specific movie.
 * @param movieId The ID of the movie.
 * @returns An object with average and count, or null if no ratings exist.
 */
export const getRatingForMovie = (movieId: number): { average: number; count: number } | null => {
  const allRatings = getFromStorage<MovieRatings>(RATINGS_STORAGE_KEY, {});
  const movieRatings = allRatings[movieId];

  if (!movieRatings || movieRatings.length === 0) {
    return null;
  }

  const sum = movieRatings.reduce((acc, rating) => acc + rating, 0);
  const average = sum / movieRatings.length;
  
  return {
    average: parseFloat(average.toFixed(1)),
    count: movieRatings.length,
  };
};

/**
 * Submits a new rating for a movie.
 * @param movieId The ID of the movie.
 * @param rating The rating value (e.g., 1-10).
 */
export const submitRating = (movieId: number, rating: number): void => {
  const allRatings = getFromStorage<MovieRatings>(RATINGS_STORAGE_KEY, {});
  const userRatedMovies = getFromStorage<number[]>(USER_RATED_STORAGE_KEY, []);

  // Add the new rating
  if (!allRatings[movieId]) {
    allRatings[movieId] = [];
  }
  allRatings[movieId].push(rating);

  // Mark this movie as rated by the user
  if (!userRatedMovies.includes(movieId)) {
    userRatedMovies.push(movieId);
  }
  
  setInStorage(RATINGS_STORAGE_KEY, allRatings);
  setInStorage(USER_RATED_STORAGE_KEY, userRatedMovies);
};

/**
 * Checks if the current user has already rated a specific movie.
 * @param movieId The ID of the movie.
 * @returns True if the user has rated the movie, false otherwise.
 */
export const hasUserRated = (movieId: number): boolean => {
  const userRatedMovies = getFromStorage<number[]>(USER_RATED_STORAGE_KEY, []);
  return userRatedMovies.includes(movieId);
};

/**
 * Retrieves the user's submitted rating for a movie.
 * NOTE: This is a simplified implementation. In a real app, you'd store ratings per user.
 * Here, we'll just grab the last rating submitted for a movie if the user has rated it.
 * @param movieId The ID of the movie.
 * @returns The user's rating, or null.
 */
export const getUserRatingForMovie = (movieId: number): number | null => {
    if (!hasUserRated(movieId)) {
        return null;
    }
    const allRatings = getFromStorage<MovieRatings>(RATINGS_STORAGE_KEY, {});
    const movieRatings = allRatings[movieId];
    return movieRatings && movieRatings.length > 0 ? movieRatings[movieRatings.length - 1] : null;
}
