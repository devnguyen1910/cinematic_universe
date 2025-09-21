import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useNotification } from '../contexts/NotificationContext';
import MovieCard from '../components/MovieCard';

const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { addNotification } = useNotification();

  const handleClearWishlist = () => {
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ danh sách yêu thích không?')) {
      clearWishlist();
      addNotification({
        type: 'success',
        message: 'Đã xóa toàn bộ danh sách yêu thích!'
      });
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Danh Sách Yêu Thích
          </h1>
          
          <div className="text-center py-16">
            <div className="mb-8">
              <svg className="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-300 mb-4">
                Danh sách yêu thích trống
              </h2>
              <p className="text-gray-500 mb-8">
                Hãy thêm những bộ phim yêu thích của bạn để xem lại sau!
              </p>
            </div>
            
            <Link 
              to="/movies" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Khám Phá Phim
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Danh Sách Yêu Thích
          </h1>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">
              {wishlist.length} phim
            </span>
            <button
              onClick={handleClearWishlist}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
            >
              Xóa Tất Cả
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {wishlist.map((item) => (
            <div key={item.movie.id} className="relative">
              <MovieCard movie={item.movie} />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;