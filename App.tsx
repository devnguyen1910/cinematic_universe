import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './contexts/BookingContext';
import Header from './components/Header';
import Footer from './components/Footer';
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

const App: React.FC = () => {
  return (
    <BookingProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/cinemas" element={<CinemasPage />} />
              <Route path="/promotions" element={<PromotionsPage />} />
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
        </div>
      </HashRouter>
    </BookingProvider>
  );
};

export default App;