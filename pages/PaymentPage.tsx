import React, { useState, useEffect } from 'react';
// FIX: Corrected import for react-router-dom components.
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';

const paymentMethods = [
    {
        category: 'International Card',
        methods: [
            { id: 'visa', name: 'Visa', logo: 'https://placehold.co/60x40/white/black?text=VISA' },
            { id: 'mastercard', name: 'Mastercard', logo: 'https://placehold.co/60x40/white/black?text=MC' },
            { id: 'jcb', name: 'JCB', logo: 'https://placehold.co/60x40/white/black?text=JCB' },
            { id: 'amex', name: 'American Express', logo: 'https://placehold.co/60x40/white/black?text=AMEX' },
            { id: 'unionpay', name: 'UnionPay', logo: 'https://placehold.co/60x40/white/black?text=UP' },
        ]
    },
    {
        category: 'E-Wallet',
        methods: [
            { id: 'shopeepay', name: 'ShopeePay', logo: 'https://placehold.co/60x40/white/black?text=SPay' },
        ]
    }
];

const PaymentPage: React.FC = () => {
    const navigate = useNavigate();
    const { booking } = useBooking();
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    useEffect(() => {
        if (!booking.movie) {
            navigate('/');
        }
    }, [booking.movie, navigate]);

    const handlePayment = () => {
        if (selectedMethod) {
            // In a real app, this would trigger the payment gateway integration.
            // Here, we'll just navigate to the confirmation page.
            navigate('/confirmation');
        } else {
            alert('Please select a payment method.');
        }
    };

    if (!booking.movie || !booking.cinema || !booking.showtime) {
        return null;
    }
    
    const ticketsPrice = booking.totalPrice - (booking.concessions.reduce((acc, item) => acc + item.concession.price * item.quantity, 0));

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
                <h1 className="text-3xl font-bold mb-6">Choose Payment Method</h1>
                <div className="space-y-6">
                    {paymentMethods.map(category => (
                        <div key={category.category}>
                            <h2 className="text-xl font-semibold mb-3">{category.category}</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {category.methods.map(method => (
                                    <button
                                        key={method.id}
                                        onClick={() => setSelectedMethod(method.id)}
                                        className={`p-4 bg-brand-gray/30 rounded-lg border-2 transition-colors flex flex-col items-center justify-center
                                            ${selectedMethod === method.id ? 'border-brand-red' : 'border-transparent hover:border-gray-600'}`
                                        }
                                    >
                                        <img src={method.logo} alt={method.name} className="h-10 mb-2 object-contain" />
                                        <span className="text-sm text-gray-300">{method.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:w-1/3">
                <div className="bg-brand-gray/50 p-6 rounded-lg sticky top-24">
                    <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">Final Summary</h2>
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
                            onClick={handlePayment}
                            disabled={!selectedMethod}
                            className="w-full bg-brand-red text-white font-bold py-3 px-4 rounded-md mt-6 hover:bg-red-700 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;