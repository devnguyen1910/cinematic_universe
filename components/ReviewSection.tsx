import React, { useState } from 'react';
import { useReview } from '../contexts/ReviewContext';
import { useNotification } from '../contexts/NotificationContext';
import StarRating from './StarRating';
import { Review } from '../types';

interface ReviewSectionProps {
  movieId: number;
  movieTitle: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ movieId, movieTitle }) => {
  const { getMovieReviews, addReview, getAverageRating } = useReview();
  const { addNotification } = useNotification();
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    userName: 'Người dùng ẩn danh'
  });

  const reviews = getMovieReviews(movieId);
  const averageRating = getAverageRating(movieId);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newReview.rating === 0) {
      addNotification({
        type: 'error',
        message: 'Vui lòng chọn số sao đánh giá!'
      });
      return;
    }

    if (newReview.comment.trim().length < 10) {
      addNotification({
        type: 'error',
        message: 'Vui lòng viết nhận xét ít nhất 10 ký tự!'
      });
      return;
    }

    addReview({
      movieId,
      userId: 'user-' + Date.now(),
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment.trim()
    });

    addNotification({
      type: 'success',
      message: 'Đã thêm đánh giá thành công!'
    });

    setNewReview({ rating: 0, comment: '', userName: 'Người dùng ẩn danh' });
    setIsWritingReview(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Đánh Giá & Nhận Xét</h3>
        <button
          onClick={() => setIsWritingReview(!isWritingReview)}
          className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-lg transition-all duration-300"
        >
          {isWritingReview ? 'Hủy' : 'Viết Đánh Giá'}
        </button>
      </div>

      {reviews.length > 0 && (
        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{averageRating}</div>
              <StarRating rating={averageRating} readOnly />
              <div className="text-sm text-gray-400 mt-1">
                {reviews.length} đánh giá
              </div>
            </div>
          </div>
        </div>
      )}

      {isWritingReview && (
        <form onSubmit={handleSubmitReview} className="mb-8 p-4 bg-gray-700 rounded-lg">
          <h4 className="text-lg font-semibold text-white mb-4">Viết đánh giá cho "{movieTitle}"</h4>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Tên của bạn:</label>
            <input
              type="text"
              value={newReview.userName}
              onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-red-500 focus:outline-none"
              placeholder="Nhập tên của bạn"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Đánh giá:</label>
            <StarRating
              rating={newReview.rating}
              onRatingChange={(rating) => setNewReview(prev => ({ ...prev, rating }))}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Nhận xét:</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-600 text-white rounded-lg border border-gray-500 focus:border-red-500 focus:outline-none resize-none"
              rows={4}
              placeholder="Chia sẻ cảm nhận của bạn về bộ phim..."
            />
            <div className="text-sm text-gray-400 mt-1">
              {newReview.comment.length}/500 ký tự
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
            >
              Gửi Đánh Giá
            </button>
            <button
              type="button"
              onClick={() => setIsWritingReview(false)}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
            >
              Hủy
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p>Chưa có đánh giá nào. Hãy là người đầu tiên viết đánh giá!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h5 className="font-semibold text-white">{review.userName}</h5>
                  <div className="flex items-center space-x-2">
                    <StarRating rating={review.rating} readOnly size="sm" />
                    <span className="text-sm text-gray-400">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;