import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';

const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { booking, clearBooking } = useBooking();

  useEffect(() => {
    if (!booking.movie) {
      navigate('/');
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking.movie, navigate]);

  const handleGoHome = () => {
    clearBooking();
    navigate('/');
  };

  if (!booking.movie || !booking.cinema || !booking.showtime) {
    return null;
  }

  const { movie, cinema, showtime, seats, concessions, totalPrice } = booking;

  return (
    <div className="max-w-3xl mx-auto bg-brand-gray/50 p-8 rounded-lg text-center shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
      <p className="text-gray-300 mb-8">Your e-ticket has been sent to your email.</p>

      <div className="text-left bg-black p-6 rounded-lg border border-gray-700 space-y-4 mb-8">
        <h2 className="text-xl font-bold text-brand-red">{movie.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-700 pb-4">
          <div>
            <p className="font-semibold text-gray-400">Cinema</p>
            <p>{cinema.name}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-400">Date & Time</p>
            <p>{showtime.date} at {showtime.time}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-400">Seats</p>
            <p className="flex flex-wrap gap-2">
              {seats.map(s => <span key={s.id} className="font-mono bg-gray-700 px-2 py-1 rounded text-sm">{s.id}</span>)}
            </p>
          </div>
        </div>

        {concessions.length > 0 && (
          <div className="pt-4 border-b border-gray-700 pb-4">
            <h3 className="font-semibold text-gray-400 mb-2">Concessions</h3>
            <div className="space-y-2">
            {concessions.map(item => (
              <div key={item.concession.id} className="flex justify-between items-center text-sm">
                <span>{item.quantity} x {item.concession.name}</span>
                <span className="font-mono">{(item.concession.price * item.quantity).toLocaleString('vi-VN')} VND</span>
              </div>
            ))}
            </div>
          </div>
        )}
        
        <div className="pt-4 flex justify-between items-center text-lg">
           <p className="font-bold text-gray-400">Total Price</p>
           <p className="font-bold text-xl text-white">{totalPrice.toLocaleString('vi-VN')} VND</p>
        </div>
      </div>
      
      <div className="flex justify-center mb-8">
         <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=showtime-${showtime.id}-seats-${seats.map(s=>s.id).join(',')}`} alt="QR Code" className="bg-white p-2 rounded-lg" />
      </div>

      <button
        onClick={handleGoHome}
        className="bg-brand-red text-white font-bold py-3 px-8 rounded-md hover:bg-red-700 transition-colors duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ConfirmationPage;