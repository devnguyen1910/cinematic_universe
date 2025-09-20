import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking, TICKET_PRICES } from '../contexts/BookingContext';
import { Seat } from '../types';
import SeatMap from '../components/SeatMap';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { booking, updateSeats } = useBooking();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  
  useEffect(() => {
    // If there's no booking info (e.g., user refreshed the page), redirect to home
    if (!booking.movie || !booking.showtime) {
      navigate('/');
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking.movie, booking.showtime, navigate]);

  const handleSeatSelectionChange = (seats: Seat[]) => {
    setSelectedSeats(seats);
    const totalPrice = seats.reduce((total, seat) => total + (TICKET_PRICES[seat.status] || 0), 0);
    updateSeats(seats, totalPrice);
  };
  
  const handleConfirm = () => {
    if (selectedSeats.length > 0) {
      navigate('/concessions');
    } else {
      alert("Please select at least one seat.");
    }
  };

  if (!booking.movie || !booking.cinema || !booking.showtime) {
    return null; // or a loading spinner, but redirect should handle it
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-4">Select Your Seats</h1>
        <div className="bg-brand-gray/50 p-4 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold">{booking.movie.title}</h2>
          <p className="text-gray-400">{booking.cinema.name} - {booking.showtime.date} at {booking.showtime.time}</p>
        </div>
        <SeatMap occupiedSeats={booking.showtime.occupiedSeats} onSeatSelectionChange={handleSeatSelectionChange} />
      </div>
      <div className="lg:w-1/3">
        <div className="bg-brand-gray/50 p-6 rounded-lg sticky top-24">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">Booking Summary</h2>
          <div className="space-y-2 mb-4">
            <p><span className="font-semibold">Movie:</span> {booking.movie.title}</p>
            <p><span className="font-semibold">Cinema:</span> {booking.cinema.name}</p>
            <p><span className="font-semibold">Showtime:</span> {booking.showtime.time} - {booking.showtime.format}</p>
          </div>
          <div className="border-t border-gray-600 pt-4">
            <h3 className="font-semibold text-lg mb-2">Selected Seats ({booking.seats.length})</h3>
            {booking.seats.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-4">
                {booking.seats.map(seat => (
                  <span key={seat.id} className="bg-brand-red text-white text-sm font-bold px-3 py-1 rounded-full">{seat.id}</span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 mb-4">Please select your seats from the map.</p>
            )}
            <div className="text-2xl font-bold mt-4">
              Ticket Total: {(booking.totalPrice - booking.concessions.reduce((acc, item) => acc + item.concession.price * item.quantity, 0)).toLocaleString('vi-VN')} VND
            </div>
            <button
              onClick={handleConfirm}
              disabled={booking.seats.length === 0}
              className="w-full bg-brand-red text-white font-bold py-3 px-4 rounded-md mt-6 hover:bg-red-700 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Select Concessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;