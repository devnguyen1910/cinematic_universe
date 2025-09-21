import React, { useState } from 'react';

interface StarRatingProps {
  count?: number; // Number of stars
  rating: number; // Current rating value (0-10)
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating: React.FC<StarRatingProps> = ({
  count = 5,
  rating,
  onRatingChange,
  readOnly = false,
  size = 'md',
}) => {
  const [hover, setHover] = useState(0);

  const stars = Array.from({ length: count }, (_, i) => i + 1);
  const starValue = rating / 2; // Convert 10-point scale to 5-star scale

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const handleClick = (value: number) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(value * 2); // Convert back to 10-point scale
    }
  };

  const handleMouseEnter = (value: number) => {
    if (!readOnly) {
      setHover(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHover(0);
    }
  };

  return (
    <div className="flex items-center space-x-1" onMouseLeave={handleMouseLeave}>
      {stars.map((star) => (
        <svg
          key={star}
          className={`${sizeClasses[size]} transition-colors duration-200 ${
            (hover || starValue) >= star
              ? 'text-yellow-400'
              : 'text-gray-400 dark:text-gray-600'
          } ${!readOnly ? 'cursor-pointer hover:text-yellow-300' : 'cursor-default'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
