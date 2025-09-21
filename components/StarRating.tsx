import React, { useState } from 'react';

interface StarRatingProps {
  count?: number; // Number of stars
  rating: number; // Current rating value (0-10)
  onRatingChange: (rating: number) => void;
  disabled?: boolean;
  size?: number; // Size of the star icon
}

const StarRating: React.FC<StarRatingProps> = ({
  count = 5,
  rating,
  onRatingChange,
  disabled = false,
  size = 32,
}) => {
  const [hover, setHover] = useState(0);

  const stars = Array.from({ length: count }, (_, i) => i + 1);

  const starValue = rating / 2; // Convert 10-point scale to 5-star scale

  const handleClick = (value: number) => {
    if (!disabled) {
      onRatingChange(value * 2); // Convert back to 10-point scale
    }
  };

  const handleMouseEnter = (value: number) => {
    if (!disabled) {
      setHover(value);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHover(0);
    }
  };

  return (
    <div className="flex items-center space-x-1" onMouseLeave={handleMouseLeave}>
      {stars.map((star) => (
        <svg
          key={star}
          className={`cursor-pointer transition-colors duration-200 ${
            (hover || starValue) >= star
              ? 'text-yellow-400'
              : 'text-gray-600'
          } ${!disabled ? 'hover:text-yellow-300' : 'cursor-default'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          width={size}
          height={size}
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
