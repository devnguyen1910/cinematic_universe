
import React from 'react';

const PromotionsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 border-l-4 border-brand-red pl-4">Promotions</h1>
      <div className="bg-brand-gray/50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold">Coming Soon!</h2>
        <p className="text-gray-400 mt-4">We're working on exciting new promotions. Check back later for amazing deals on movie tickets and combos!</p>
      </div>
    </div>
  );
};

export default PromotionsPage;
