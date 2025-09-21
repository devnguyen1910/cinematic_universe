import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Review } from '../types';

interface ReviewContextType {
  reviews: { [movieId: number]: Review[] };
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  getMovieReviews: (movieId: number) => Review[];
  getAverageRating: (movieId: number) => number;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<{ [movieId: number]: Review[] }>(() => {
    const savedReviews = localStorage.getItem('cinematic-reviews');
    return savedReviews ? JSON.parse(savedReviews) : {};
  });

  // Save reviews to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('cinematic-reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };

    setReviews(prev => ({
      ...prev,
      [review.movieId]: [...(prev[review.movieId] || []), newReview]
    }));
  };

  const getMovieReviews = (movieId: number): Review[] => {
    return reviews[movieId] || [];
  };

  const getAverageRating = (movieId: number): number => {
    const movieReviews = reviews[movieId] || [];
    if (movieReviews.length === 0) return 0;
    
    const sum = movieReviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / movieReviews.length) * 10) / 10;
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      addReview,
      getMovieReviews,
      getAverageRating
    }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
};