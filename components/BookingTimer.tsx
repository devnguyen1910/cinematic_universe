import React, { useState, useEffect } from 'react';

interface BookingTimerProps {
  duration: number; // in minutes
  onExpired: () => void;
}

const BookingTimer: React.FC<BookingTimerProps> = ({ duration, onExpired }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // convert to seconds
  const [isExpiring, setIsExpiring] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpired();
      return;
    }

    // Set expiring state when less than 2 minutes left
    if (timeLeft <= 120 && !isExpiring) {
      setIsExpiring(true);
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onExpired, isExpiring]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercent = () => {
    return ((duration * 60 - timeLeft) / (duration * 60)) * 100;
  };

  return (
    <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
      isExpiring 
        ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-600' 
        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <svg className={`w-5 h-5 transition-colors duration-300 ${
            isExpiring ? 'text-red-500' : 'text-blue-500'
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className={`font-semibold transition-colors duration-300 ${
            isExpiring ? 'text-red-700 dark:text-red-300' : 'text-blue-700 dark:text-blue-300'
          }`}>
            Thời gian đặt vé
          </span>
        </div>
        <span className={`text-xl font-bold font-mono transition-colors duration-300 ${
          isExpiring ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'
        }`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-linear ${
            isExpiring 
              ? 'bg-gradient-to-r from-red-400 to-red-600' 
              : 'bg-gradient-to-r from-blue-400 to-blue-600'
          }`}
          style={{ width: `${getProgressPercent()}%` }}
        />
      </div>
      
      <p className={`text-sm mt-2 transition-colors duration-300 ${
        isExpiring 
          ? 'text-red-600 dark:text-red-400' 
          : 'text-blue-600 dark:text-blue-400'
      }`}>
        {isExpiring 
          ? '⚠️ Phiên đặt vé sắp hết hạn!' 
          : 'Vui lòng hoàn tất đặt vé trong thời gian quy định'
        }
      </p>
    </div>
  );
};

export default BookingTimer;