

import React, { useState } from 'react';
// FIX: Corrected import for react-router-dom components.
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const navLinkClasses = ({ isActive }: { isActive: boolean }): string => 
    `hover:text-white transition-colors duration-300 ${isActive ? 'text-brand-red font-semibold' : 'text-gray-300'}`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery(''); // Clear input after search
    }
  };

  return (
    <header className="bg-brand-dark bg-opacity-80 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-brand-red/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-brand-red tracking-wider">
          CINEMATIC
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={navLinkClasses} end>Home</NavLink>
          <NavLink to="/movies" className={navLinkClasses}>Movies</NavLink>
          <NavLink to="/cinemas" className={navLinkClasses}>Cinemas</NavLink>
          <NavLink to="/promotions" className={navLinkClasses}>Promotions</NavLink>
        </nav>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className="bg-brand-gray/50 border border-gray-600 text-white rounded-full px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-red w-40 md:w-56 transition-all"
            />
          </form>
          <Link to="/login" className="bg-transparent border border-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300 hidden sm:block">
            Login
          </Link>
          <Link to="/signup" className="bg-brand-red text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 hidden sm:block">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
