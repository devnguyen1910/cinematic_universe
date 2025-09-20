
import React from 'react';
import { cinemas } from '../data/mockData';

const CinemasPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 border-l-4 border-brand-red pl-4">Our Cinemas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cinemas.map(cinema => (
          <div key={cinema.id} className="bg-brand-gray/50 p-6 rounded-lg shadow-lg hover:shadow-brand-red/20 transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-white">{cinema.name}</h2>
            <p className="text-gray-400 mt-2">{cinema.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemasPage;
