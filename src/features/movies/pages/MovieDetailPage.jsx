/**
 * MovieDetailPage Component
 * Detailed movie view with showtime booking
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants';
import { movieService } from '../services/movie.service';
import { useAuth } from '../../auth';
import { toast } from 'react-toastify';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  useEffect(() => {
    loadMovie();
  }, [id]);

  const loadMovie = async () => {
    setLoading(true);
    try {
      const data = await movieService.getById(id);
      setMovie(data);
      
      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      setSelectedDate(today);
    } catch (error) {
      console.error('Failed to load movie:', error);
      toast.error('Movie not found');
      navigate(ROUTES.MOVIES);
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.info('Please login to book tickets');
      navigate(ROUTES.LOGIN);
      return;
    }

    if (!selectedShowtime) {
      toast.warning('Please select a showtime');
      return;
    }

    // Navigate to booking page with showtime info
    navigate(`/booking/${movie.id}/showtime/${selectedShowtime.id}`);
  };

  // Mock showtimes (replace with real API data)
  const mockShowtimes = [
    { id: 1, time: '10:00 AM', available: true, price: 150000 },
    { id: 2, time: '13:00 PM', available: true, price: 150000 },
    { id: 3, time: '16:00 PM', available: true, price: 180000 },
    { id: 4, time: '19:00 PM', available: false, price: 180000 },
    { id: 5, time: '22:00 PM', available: true, price: 200000 },
  ];

  const mockDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading movie...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${movie.backdrop || movie.poster || 'https://via.placeholder.com/1920x1080'})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Poster */}
            <div className="w-64 flex-shrink-0">
              <img
                src={movie.poster || 'https://via.placeholder.com/300x450'}
                alt={movie.title}
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 pb-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center space-x-1 bg-yellow-500 px-3 py-1 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white font-bold">{movie.rating || '8.5'}/10</span>
                </div>
                <span className="text-gray-300">{movie.duration || '120'} min</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">{movie.genre || 'Action, Adventure'}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">{movie.releaseDate || '2025'}</span>
              </div>
              <p className="text-lg text-gray-300 max-w-3xl line-clamp-3">
                {movie.description || 'An epic adventure awaits...'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Synopsis */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">📖 Synopsis</h2>
              <p className="text-gray-300 leading-relaxed">
                {movie.description || 'No description available.'}
              </p>
            </section>

            {/* Cast & Crew */}
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">🎭 Cast & Crew</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Director</p>
                  <p className="text-white font-semibold">{movie.director || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Cast</p>
                  <p className="text-white font-semibold">{movie.cast || 'Unknown'}</p>
                </div>
              </div>
            </section>

            {/* Trailer */}
            {movie.trailer && (
              <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">🎥 Trailer</h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-900">
                  <iframe
                    src={movie.trailer}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              </section>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">🎫 Book Tickets</h2>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">Select Date</label>
                <div className="grid grid-cols-7 gap-2">
                  {mockDates.map((date) => {
                    const dateObj = new Date(date);
                    const isSelected = selectedDate === date;
                    return (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-2 rounded-lg text-center transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        <div className="text-xs">{dateObj.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div className="text-lg font-bold">{dateObj.getDate()}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Showtime Selection */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">Select Showtime</label>
                <div className="grid grid-cols-2 gap-3">
                  {mockShowtimes.map((showtime) => (
                    <button
                      key={showtime.id}
                      onClick={() => showtime.available && setSelectedShowtime(showtime)}
                      disabled={!showtime.available}
                      className={`p-3 rounded-lg text-center transition-all ${
                        selectedShowtime?.id === showtime.id
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white ring-2 ring-pink-400'
                          : showtime.available
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <div className="font-bold">{showtime.time}</div>
                      <div className="text-xs">{showtime.price.toLocaleString()} VND</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBookNow}
                disabled={!selectedShowtime}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-pink-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transform hover:scale-105 transition-all shadow-xl"
              >
                {selectedShowtime ? `Book Now - ${selectedShowtime.price.toLocaleString()} VND` : 'Select Showtime'}
              </button>

              {!isAuthenticated && (
                <p className="text-center text-gray-300 text-sm mt-4">
                  <Link to={ROUTES.LOGIN} className="text-pink-400 hover:underline">
                    Login
                  </Link>{' '}
                  to book tickets
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
