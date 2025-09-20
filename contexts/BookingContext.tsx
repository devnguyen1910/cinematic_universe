import React, { createContext, useState, useContext, ReactNode } from 'react';
// FIX: Import `SeatStatus` from `../types` to resolve 'Cannot find name' errors in the `TICKET_PRICES` constant.
import { Booking, Movie, Cinema, Showtime, Seat, SelectedConcession, SeatStatus } from '../types';

interface BookingContextType {
  booking: Booking;
  startBooking: (movie: Movie, cinema: Cinema, showtime: Showtime) => void;
  updateSeats: (seats: Seat[], seatsPrice: number) => void;
  updateConcessions: (concessions: SelectedConcession[], concessionsPrice: number) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialState: Booking = {
  movie: null,
  cinema: null,
  showtime: null,
  seats: [],
  concessions: [],
  totalPrice: 0,
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [booking, setBooking] = useState<Booking>(initialState);

  const startBooking = (movie: Movie, cinema: Cinema, showtime: Showtime) => {
    setBooking({
      ...initialState,
      movie,
      cinema,
      showtime,
    });
  };

  const updateSeats = (seats: Seat[], seatsPrice: number) => {
    setBooking(prev => {
      const concessionsPrice = prev.concessions.reduce((total, item) => total + item.concession.price * item.quantity, 0);
      return { ...prev, seats, totalPrice: seatsPrice + concessionsPrice };
    });
  };
  
  const updateConcessions = (concessions: SelectedConcession[], concessionsPrice: number) => {
    setBooking(prev => {
      const seatsPrice = prev.seats.reduce((total, seat) => total + (TICKET_PRICES[seat.status] || 0), 0);
      return { ...prev, concessions, totalPrice: seatsPrice + concessionsPrice };
    });
  };
  
  const clearBooking = () => {
    setBooking(initialState);
  };

  return (
    <BookingContext.Provider value={{ booking, startBooking, updateSeats, updateConcessions, clearBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

// This needs to be accessible by both BookingPage and BookingContext, so defining it here.
// In a real app, this might come from an API.
export const TICKET_PRICES = {
  [SeatStatus.Available]: 75000,
  [SeatStatus.VIP]: 110000,
  [SeatStatus.Couple]: 250000,
  [SeatStatus.Occupied]: 0,
  [SeatStatus.Selected]: 0 // This shouldn't be used for pricing
};