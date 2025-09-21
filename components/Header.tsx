

import React, { useState } from 'react';
// FIX: Corrected import for react-router-dom components.
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

  const navLinkClasses = ({ isActive }: { isActive: boolean }): string => 
    `hover:text-white transition-colors duration-300 ${isActive ? 'text-red-500 font-semibold' : 'text-gray-300 dark:text-gray-300'}`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      setQuery(''); // Clear input after search
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-gray-900 dark:bg-gray-800 bg-opacity-95 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-red-500 tracking-wider">
            CINEMATIC
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <NavLink to="/" className={navLinkClasses} end>Trang Chủ</NavLink>
            <NavLink to="/movies" className={navLinkClasses}>Phim</NavLink>
            <NavLink to="/cinemas" className={navLinkClasses}>Rạp</NavLink>
            <NavLink to="/promotions" className={navLinkClasses}>Khuyến Mãi</NavLink>
            <NavLink to="/wishlist" className={navLinkClasses}>
              <div className="flex items-center space-x-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>Yêu Thích</span>
                {wishlist.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-5 text-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
            </NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm phim..."
                className="bg-gray-700 dark:bg-gray-600 border border-gray-600 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 w-56 transition-all"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {/* Search Icon */}
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            <ThemeToggle />
            <Link to="/login" className="bg-transparent border border-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300">
              Đăng Nhập
            </Link>
            <Link to="/signup" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300">
              Đăng Ký
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-2 mt-4">
              <NavLink to="/" className={navLinkClasses} end onClick={() => setIsMobileMenuOpen(false)}>
                Trang Chủ
              </NavLink>
              <NavLink to="/movies" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
                Phim
              </NavLink>
              <NavLink to="/cinemas" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
                Rạp
              </NavLink>
              <NavLink to="/promotions" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
                Khuyến Mãi
              </NavLink>
              <NavLink to="/wishlist" className={navLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span>Yêu Thích ({wishlist.length})</span>
                </div>
              </NavLink>
            </nav>
            
            <form onSubmit={handleSearch} className="mt-4">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm phim..."
                className="w-full bg-gray-700 dark:bg-gray-600 border border-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </form>

            <div className="flex items-center justify-between mt-4">
              <ThemeToggle />
              <div className="flex space-x-2">
                <Link to="/login" className="bg-transparent border border-gray-500 text-white px-3 py-1.5 rounded text-sm hover:bg-gray-700 transition-colors duration-300" onClick={() => setIsMobileMenuOpen(false)}>
                  Đăng Nhập
                </Link>
                <Link to="/signup" className="bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 transition-colors duration-300" onClick={() => setIsMobileMenuOpen(false)}>
                  Đăng Ký
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
