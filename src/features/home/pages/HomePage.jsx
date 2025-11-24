/**
 * HomePage Component
 * Beautiful landing page with hero section and featured movies
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants';
import { movieService } from '../../movies/services/movie.service';

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const [featured, upcoming] = await Promise.all([
        movieService.getPopular({ page: 1, limit: 6 }),
        movieService.getUpcoming({ page: 1, limit: 4 }),
      ]);
      setFeaturedMovies(featured.data || []);
      setUpcomingMovies(upcoming.data || []);
    } catch (error) {
      console.error('Failed to load movies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-900/90 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop')",
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">CineMax</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto">
            Discover the latest blockbusters and timeless classics. Book your tickets in seconds and enjoy the ultimate cinema experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to={ROUTES.MOVIES}
              className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold text-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all shadow-2xl"
            >
              🎬 Browse Movies
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-bold text-lg hover:bg-white/20 transform hover:scale-105 transition-all"
            >
              🎫 Sign Up Now
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">🔥 Now Showing</h2>
              <p className="text-gray-400">Book tickets for the hottest movies</p>
            </div>
            <Link
              to={ROUTES.MOVIES}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all font-semibold"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-800 rounded-2xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Movies */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-2">🎬 Coming Soon</h2>
            <p className="text-gray-400">Get ready for these upcoming blockbusters</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-800 rounded-2xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingMovies.map((movie) => (
                <UpcomingCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Why Choose CineMax?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎫"
              title="Easy Booking"
              description="Book your tickets in just a few clicks with our streamlined booking process"
            />
            <FeatureCard
              icon="💺"
              title="Best Seats"
              description="Choose from premium seats with our interactive seat selection system"
            />
            <FeatureCard
              icon="⚡"
              title="Instant Confirmation"
              description="Get instant booking confirmation via email and SMS"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// Movie Card Component
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`${ROUTES.MOVIES}/${movie.id}`)}
      className="group relative bg-gray-800 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
    >
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={movie.poster || 'https://via.placeholder.com/400x600?text=No+Image'}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-500 rounded-full flex items-center space-x-1">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-white font-bold text-sm">{movie.rating || '8.5'}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{movie.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{movie.description || 'Action, Adventure, Sci-Fi'}</p>
        <button className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all">
          Book Now
        </button>
      </div>
    </div>
  );
};

// Upcoming Card Component
const UpcomingCard = ({ movie }) => {
  return (
    <div className="group relative bg-gray-800 rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={movie.poster || 'https://via.placeholder.com/300x450?text=Coming+Soon'}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 px-4 py-2 bg-pink-500 rounded-full">
          <span className="text-white font-bold text-xs">COMING SOON</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white line-clamp-1">{movie.title}</h3>
        <p className="text-gray-400 text-sm">{movie.releaseDate || 'Dec 2025'}</p>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-pink-500 transition-all transform hover:scale-105">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default HomePage;
