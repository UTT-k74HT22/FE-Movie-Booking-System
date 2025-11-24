/**
 * HomePage Component
 * Beautiful landing page with hero section and featured movies
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../../../shared/components/HeroSection/HeroSection';
import MovieGrid from '../../../shared/components/MovieGrid/MovieGrid';
import MovieFilter from '../../../shared/components/MovieFilter/MovieFilter';
import Pagination from '../../../shared/components/Pagination/Pagination';
import MovieCarousel from '../../../shared/components/MovieCarousel/MovieCarousel';
import { ROUTES } from '../../../shared/constants';
import { movieService } from '../../movies/services/movie.service';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState(null);
  const moviesPerPage = 8;

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      
      // Try to load from API
      const [nowShowing, upcoming] = await Promise.all([
        movieService.getPopular({ page: 1, limit: 8 }),
        movieService.getUpcoming({ page: 1, limit: 8 }),
      ]);

      const nowShowingData = nowShowing?.data || [];
      const upcomingData = upcoming?.data || [];

      // Use API data or fallback to mock data
      if (nowShowingData.length > 0) {
        setFeaturedMovie(transformToFeaturedMovie(nowShowingData[0]));
        setNowShowingMovies(nowShowingData.map(transformToMovieCard));
      } else {
        setFeaturedMovie(getMockFeaturedMovie());
        setNowShowingMovies(getMockNowShowing());
      }

      if (upcomingData.length > 0) {
        setComingSoonMovies(upcomingData.map(transformToMovieCard));
      } else {
        setComingSoonMovies(getMockComingSoon());
      }
    } catch (error) {
      console.error('Failed to load movies:', error);
      // Set mock data on error
      setFeaturedMovie(getMockFeaturedMovie());
      setNowShowingMovies(getMockNowShowing());
      setComingSoonMovies(getMockComingSoon());
    } finally {
      setLoading(false);
    }
  };

  const transformToFeaturedMovie = (movie) => ({
    id: movie.id,
    title: movie.title || 'Avatar: The Way of Water',
    description: movie.description || 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.',
    posterUrl: movie.poster || 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop',
    backdropUrl: movie.backdrop || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
    rating: movie.rating || 5.0,
    ageRating: movie.ageRating || 'PG-13',
    duration: movie.duration || '3h 12m',
    releaseDate: movie.releaseDate || '2022-12-16',
    director: movie.director || 'James Cameron',
    genre: movie.genre || 'Sci-Fi, Action',
  });

  const transformToMovieCard = (movie) => ({
    id: movie.id,
    title: movie.title,
    posterUrl: movie.poster || 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop',
    rating: movie.rating || 4.5,
    ageRating: movie.ageRating || 'PG-13',
    duration: movie.duration || '2h 30m',
    genre: movie.genre || 'Action',
  });

  const getMockFeaturedMovie = () => ({
    id: '1',
    title: 'Avatar: The Way of Water',
    description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home.',
    posterUrl: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
    rating: 5.00,
    ageRating: 'PG-13',
    duration: '3h 12m',
    releaseDate: '2022-12-16',
    director: 'James Cameron',
    genre: 'Sci-Fi, Action',
  });

  const getMockNowShowing = () => [
    {
      id: '1',
      title: 'Ant-Man and the Wasp: Quantumania',
      posterUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop',
      rating: 5.00,
      ageRating: '3D',
      duration: '2h 5m',
      genre: 'Action, Sci-Fi',
    },
    {
      id: '2',
      title: 'Black Panther: Wakanda Forever',
      posterUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop',
      rating: 5.00,
      ageRating: '2022',
      duration: '2h 41m',
      genre: 'Action, Adventure',
    },
    {
      id: '3',
      title: 'CREED III',
      posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
      rating: 5.00,
      ageRating: '2D',
      duration: '1h 56m',
      genre: 'Drama, Action',
    },
    {
      id: '4',
      title: 'Sword Art Online: Progressive',
      posterUrl: 'https://images.unsplash.com/photo-1518298059171-e570ac2b6022?w=400&h=600&fit=crop',
      rating: 5.00,
      ageRating: 'PG-13',
      duration: '2h 0m',
      genre: 'Animation, Action',
    },
  ];

  const getMockComingSoon = () => [
    {
      id: '5',
      title: 'The Batman',
      posterUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
      rating: null,
      ageRating: 'Coming Soon',
      duration: null,
      genre: 'Action, Crime',
    },
    {
      id: '6',
      title: 'Guardians of the Galaxy Vol. 3',
      posterUrl: 'https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=400&h=600&fit=crop',
      rating: null,
      ageRating: 'Coming Soon',
      duration: null,
      genre: 'Action, Sci-Fi',
    },
    {
      id: '7',
      title: 'The Flash',
      posterUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop',
      rating: null,
      ageRating: 'Coming Soon',
      duration: null,
      genre: 'Action, Adventure',
    },
    {
      id: '8',
      title: 'Transformers: Rise of the Beasts',
      posterUrl: 'https://images.unsplash.com/photo-1615986201152-7686a4867f30?w=400&h=600&fit=crop',
      rating: null,
      ageRating: 'Coming Soon',
      duration: null,
      genre: 'Action, Sci-Fi',
    },
  ];

  const handleGetTicket = () => {
    if (featuredMovie) {
      navigate(`${ROUTES.MOVIES}/${featuredMovie.id}`);
    }
  };

  const handleWatchTrailer = () => {
    console.log('Watch trailer clicked');
  };

  const handleMovieClick = (movie) => {
    navigate(`${ROUTES.MOVIES}/${movie.id}`);
  };

  const handleViewAllNowShowing = () => {
    navigate(ROUTES.MOVIES);
  };

  const handleViewAllComingSoon = () => {
    navigate(ROUTES.MOVIES);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    // In a real app, you would fetch filtered data from API
    console.log('Filters changed:', newFilters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // In a real app, you would fetch data for this page
  };

  // Pagination logic
  const totalPages = Math.ceil(nowShowingMovies.length / moviesPerPage);
  const paginatedMovies = nowShowingMovies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection
        movie={featuredMovie}
        onGetTicket={handleGetTicket}
        onWatchTrailer={handleWatchTrailer}
      />

      {/* Now Showing Section */}
      <section className="now-showing-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">🔥 Now Showing</h2>
              <p className="section-subtitle">Book tickets for the hottest movies</p>
            </div>
            <div className="section-actions">
              <MovieFilter onFilterChange={handleFilterChange} />
              <button onClick={handleViewAllNowShowing} className="view-all-btn">
                View All
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
          
          <MovieGrid
            movies={paginatedMovies}
            onMovieClick={handleMovieClick}
            loading={loading}
          />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      {/* Coming Soon Section - Carousel */}
      <section className="coming-soon-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">🎬 Coming Soon</h2>
              <p className="section-subtitle">Get ready for these upcoming blockbusters</p>
            </div>
            <button onClick={handleViewAllComingSoon} className="view-all-btn">
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
          
          <MovieCarousel
            movies={comingSoonMovies}
            onMovieClick={handleMovieClick}
            autoPlay={true}
            interval={5000}
          />
        </div>
      </section>

      {/* Why Choose CineMax Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="features-title">Why Choose CineMax?</h2>
          <div className="features-grid">
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

/**
 * FeatureCard Component
 */
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

export default HomePage;
