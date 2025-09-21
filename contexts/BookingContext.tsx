import React, { createContext, useState, useContext, ReactNode } from 'react';
// FIX: Import `SeatStatus` from `../types` to resolve 'Cannot find name' errors in the `TICKET_PRICES` constant.
import { Booking, Movie, Cinema, Showtime, Seat, SelectedConcession, SeatStatus } from '../types';

interface BookingContextType {
  booking: Booking;
  startBooking: (movie: Movie, cinema: Cinema, showtime: Showtime) => void;
  updateTicketQuantity: (quantity: number) => void;
  updateConcessions: (concessions: SelectedConcession[], concessionsPrice: number) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialState: Booking = {
  movie: null,
  cinema: null,
  showtime: null,
  ticketQuantity: 0,
  concessions: [],
  totalPrice: 0,
};

// In a real app, this might come from an API based on showtime, format, etc.
export const STANDARD_TICKET_PRICE = 75000;

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [booking, setBooking] = useState<Booking>(initialState);

  const startBooking = (movie: Movie, cinema: Cinema, showtime: Showtime) => {
    setBooking({
      ...initialState,
      movie,
      cinema,
      showtime,
      ticketQuantity: 1, // Start with 1 ticket selected
      totalPrice: STANDARD_TICKET_PRICE,
    });
  };

  const updateTicketQuantity = (quantity: number) => {
    setBooking(prev => {
      const ticketsPrice = quantity * STANDARD_TICKET_PRICE;
      const concessionsPrice = prev.concessions.reduce((total, item) => total + item.concession.price * item.quantity, 0);
      return { ...prev, ticketQuantity: quantity, totalPrice: ticketsPrice + concessionsPrice };
    });
  };
  
  const updateConcessions = (concessions: SelectedConcession[], concessionsPrice: number) => {
    setBooking(prev => {
      const ticketsPrice = prev.ticketQuantity * STANDARD_TICKET_PRICE;
      return { ...prev, concessions, totalPrice: ticketsPrice + concessionsPrice };
    });
  };
  
  const clearBooking = () => {
    setBooking(initialState);
  };

  return (
    <BookingContext.Provider value={{ booking, startBooking, updateTicketQuantity, updateConcessions, clearBooking }}>
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

// This is kept for the SeatMap component, which is not part of the main booking flow anymore but could be reused.
export const TICKET_PRICES = {
  [SeatStatus.Available]: 75000,
  [SeatStatus.VIP]: 110000,
  [SeatStatus.Couple]: 250000,
  [SeatStatus.Occupied]: 0,
  [SeatStatus.Selected]: 0 // This shouldn't be used for pricing
};