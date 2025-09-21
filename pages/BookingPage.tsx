import React, { useEffect } from 'react';
// FIX: Corrected import for react-router-dom components.
import { useNavigate } from 'react-router-dom';
import { useBooking, STANDARD_TICKET_PRICE } from '../contexts/BookingContext';
import { useNotification } from '../contexts/NotificationContext';
import BookingTimer from '../components/BookingTimer';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { booking, updateTicketQuantity } = useBooking();
  const { addNotification } = useNotification();
  
  useEffect(() => {
    // If there's no booking info (e.g., user refreshed the page), redirect to home
    if (!booking.movie || !booking.showtime) {
      navigate('/');
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking.movie, booking.showtime, navigate]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 8) {
        updateTicketQuantity(newQuantity);
    }
  };
  
  const handleConfirm = () => {
    if (booking.ticketQuantity > 0) {
      navigate('/concessions');
    } else {
      addNotification({
        type: 'error',
        message: 'Vui lòng chọn ít nhất một vé!'
      });
    }
  };

  const handleTimerExpired = () => {
    addNotification({
      type: 'error',
      message: 'Phiên đặt vé đã hết hạn. Vui lòng thử lại!'
    });
    navigate('/');
  };

  if (!booking.movie || !booking.cinema || !booking.showtime) {
    return null; // or a loading spinner, but redirect should handle it
  }

  const ticketTotal = booking.totalPrice - booking.concessions.reduce((acc, item) => acc + item.concession.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Booking Timer */}
        <div className="mb-6">
          <BookingTimer duration={15} onExpired={handleTimerExpired} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-4 text-red-500">Chọn Vé Của Bạn</h1>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold">{booking.movie.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{booking.cinema.name} - {booking.showtime.date} lúc {booking.showtime.time}</p>
              <div className="mt-2 flex items-center space-x-4 text-sm">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                  {booking.showtime.format}
                </span>
              </div>
            </div>
        
            <div className="p-4 bg-black rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-4 text-white">How many tickets?</h3>
                <div className="flex items-center justify-center gap-4 my-8">
                    <button 
                        onClick={() => handleQuantityChange(booking.ticketQuantity - 1)} 
                        className="w-16 h-16 text-4xl font-bold rounded-full bg-gray-700 hover:bg-gray-600 transition-colors disabled:opacity-50"
                        disabled={booking.ticketQuantity <= 1}
                        aria-label="Decrease ticket quantity"
                    >
                        -
                    </button>
                    <span className="text-5xl font-bold w-24 text-center" aria-live="polite">{booking.ticketQuantity}</span>
                    <button 
                        onClick={() => handleQuantityChange(booking.ticketQuantity + 1)} 
                        className="w-16 h-16 text-4xl font-bold rounded-full bg-brand-red hover:bg-red-700 transition-colors"
                        aria-label="Increase ticket quantity"
                    >
                        +
                    </button>
                </div>
                <p className="text-gray-400">Standard price: {STANDARD_TICKET_PRICE.toLocaleString('vi-VN')} VND per ticket</p>
            </div>
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
                <h3 className="font-semibold text-lg mb-2">Tickets ({booking.ticketQuantity})</h3>
                
                <div className="text-2xl font-bold mt-4">
                  Ticket Total: {ticketTotal.toLocaleString('vi-VN')} VND
                </div>
                <button
                  onClick={handleConfirm}
                  disabled={booking.ticketQuantity === 0}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md mt-6 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                  Chọn Đồ Ăn & Thức Uống
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;