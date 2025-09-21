import React from 'react';
// FIX: Corrected import for react-router-dom components.
import { HashRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './contexts/BookingContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ReviewProvider } from './contexts/ReviewContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import BookingPage from './pages/BookingPage';
import ConcessionsPage from './pages/ConcessionsPage';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';
import MoviesPage from './pages/MoviesPage';
import CinemasPage from './pages/CinemasPage';
import PromotionsPage from './pages/PromotionsPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SearchResultsPage from './pages/SearchResultsPage';
import WishlistPage from './pages/WishlistPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <WishlistProvider>
          <ReviewProvider>
            <BookingProvider>
              <HashRouter>
                <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
                  <Header />
                  <main className="flex-grow container mx-auto px-4 py-8">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/movies" element={<MoviesPage />} />
                      <Route path="/cinemas" element={<CinemasPage />} />
                      <Route path="/promotions" element={<PromotionsPage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/signup" element={<SignUpPage />} />
                      <Route path="/movie/:id" element={<MovieDetailPage />} />
                      <Route path="/book/:showtimeId" element={<BookingPage />} />
                      <Route path="/concessions" element={<ConcessionsPage />} />
                      <Route path="/payment" element={<PaymentPage />} />
                      <Route path="/confirmation" element={<ConfirmationPage />} />
                      <Route path="/search" element={<SearchResultsPage />} />
                    </Routes>
                  </main>
                  <Footer />
                  <Toast />
                </div>
              </HashRouter>
            </BookingProvider>
          </ReviewProvider>
        </WishlistProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
