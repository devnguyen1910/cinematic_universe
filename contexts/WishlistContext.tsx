import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Movie, WishlistItem } from '../types';

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (movie: Movie) => void;
  removeFromWishlist: (movieId: number) => void;
  isInWishlist: (movieId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('cinematic-wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cinematic-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (movie: Movie) => {
    setWishlist(prev => {
      if (prev.some(item => item.movie.id === movie.id)) {
        return prev; // Movie already in wishlist
      }
      return [...prev, { movie, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromWishlist = (movieId: number) => {
    setWishlist(prev => prev.filter(item => item.movie.id !== movieId));
  };

  const isInWishlist = (movieId: number) => {
    return wishlist.some(item => item.movie.id === movieId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};