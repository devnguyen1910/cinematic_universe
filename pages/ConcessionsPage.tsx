import React, { useState, useEffect } from 'react';
// FIX: Corrected import for react-router-dom components.
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import { mockConcessions } from '../data/mockData';
import { Concession } from '../types';

const ConcessionCard: React.FC<{
  concession: Concession;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}> = ({ concession, quantity, onQuantityChange }) => {
  return (
    <div className="bg-brand-gray/30 rounded-lg overflow-hidden flex flex-col md:flex-row gap-4 p-4 items-center">
      <img src={concession.imageUrl} alt={concession.name} className="w-full md:w-32 h-24 object-cover rounded" />
      <div className="flex-grow">
        <h3 className="text-xl font-bold">{concession.name}</h3>
        <p className="text-sm text-gray-400">{concession.description}</p>
        <p className="text-lg font-semibold text-brand-red mt-2">{concession.price.toLocaleString('vi-VN')} VND</p>
      </div>
      <div className="flex items-center gap-3 bg-brand-dark rounded-full p-1">
        <button onClick={() => onQuantityChange(Math.max(0, quantity - 1))} className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">-</button>
        <span className="font-bold text-lg w-8 text-center">{quantity}</span>
        <button onClick={() => onQuantityChange(quantity + 1)} className="w-8 h-8 rounded-full bg-brand-red hover:bg-red-700 transition-colors">+</button>
      </div>
    </div>
  );
};

const ConcessionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { booking, updateConcessions } = useBooking();
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    booking.concessions.forEach(item => {
      initial[item.concession.id] = item.quantity;
    });
    return initial;
  });

  useEffect(() => {
    if (!booking.movie) {
      navigate('/');
    }
  }, [booking.movie, navigate]);

  useEffect(() => {
    const selected = mockConcessions
      .filter(c => quantities[c.id] > 0)
      .map(c => ({ concession: c, quantity: quantities[c.id] }));
    const concessionsPrice = selected.reduce((total, item) => total + item.concession.price * item.quantity, 0);
    updateConcessions(selected, concessionsPrice);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantities]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setQuantities(prev => ({ ...prev, [id]: newQuantity }));
  };
  
  const handleConfirm = () => {
      navigate('/payment');
  };

  if (!booking.movie || !booking.cinema || !booking.showtime) {
    return null;
  }
  
  const ticketsPrice = booking.totalPrice - (booking.concessions.reduce((acc, item) => acc + item.concession.price * item.quantity, 0));

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Add Concessions</h1>
          <button
            onClick={handleConfirm}
            className="text-gray-400 hover:text-white transition-colors text-sm font-semibold"
          >
            Skip to Payment &rarr;
          </button>
        </div>
        <div className="space-y-4">
          {mockConcessions.map(concession => (
            <ConcessionCard
              key={concession.id}
              concession={concession}
              quantity={quantities[concession.id] || 0}
              onQuantityChange={(newQuantity) => handleQuantityChange(concession.id, newQuantity)}
            />
          ))}
        </div>
      </div>
      <div className="lg:w-1/3">
        <div className="bg-brand-gray/50 p-6 rounded-lg sticky top-24">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">Booking Summary</h2>
          <div className="space-y-2 mb-4">
            <p><span className="font-semibold">Movie:</span> {booking.movie.title}</p>
            <p><span className="font-semibold">Cinema:</span> {booking.cinema.name}</p>
          </div>
          <div className="border-t border-gray-600 pt-4">
            <h3 className="font-semibold text-lg mb-2">Ticket Details</h3>
            <div className="flex justify-between text-sm">
                <span>{booking.ticketQuantity} Ticket(s)</span>
                <span>{ticketsPrice.toLocaleString('vi-VN')} VND</span>
            </div>
            
            {booking.concessions.length > 0 && (
                <>
                <h3 className="font-semibold text-lg mb-2 mt-4">Concessions</h3>
                {booking.concessions.map(item => (
                    <div key={item.concession.id} className="flex justify-between text-sm mb-1">
                        <span>{item.quantity} x {item.concession.name}</span>
                        <span>{(item.concession.price * item.quantity).toLocaleString('vi-VN')} VND</span>
                    </div>
                ))}
                </>
            )}

            <div className="text-2xl font-bold mt-6 border-t border-gray-600 pt-4">
              Total: {booking.totalPrice.toLocaleString('vi-VN')} VND
            </div>
            <button
              onClick={handleConfirm}
              className="w-full bg-brand-red text-white font-bold py-3 px-4 rounded-md mt-6 hover:bg-red-700 transition-colors duration-300"
            >
              {booking.concessions.length > 0 ? 'Proceed to Payment' : 'Continue without Concessions'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcessionsPage;