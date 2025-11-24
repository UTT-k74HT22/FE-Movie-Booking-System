/**
 * HomePage Component
 * Beautiful landing page with hero section and featured movies
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../../../shared/components/HeroSection/HeroSection';
import MovieGrid from '../../../shared/components/MovieGrid/MovieGrid';
import { ROUTES } from '../../../shared/constants';
import { movieService } from '../../movies/services/movie.service';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      
      // Load movies from API
      const [nowShowing, upcoming] = await Promise.all([
        movieService.getPopular({ page: 1, limit: 8 }),
        movieService.getUpcoming({ page: 1, limit: 8 }),
      ]);

      const nowShowingData = nowShowing?.data || [];
      const upcomingData = upcoming?.data || [];

      // Set featured movie (first from now showing)
      if (nowShowingData.length > 0) {
        setFeaturedMovie({
          id: nowShowingData[0].id,
          title: nowShowingData[0].title || 'Avatar: The Way of Water',
          description: nowShowingData[0].description || 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home.',
          posterUrl: nowShowingData[0].poster || 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop',
          backdropUrl: nowShowingData[0].backdrop || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
          rating: nowShowingData[0].rating || 5.0,
          ageRating: nowShowingData[0].ageRating || 'PG-13',
          duration: nowShowingData[0].duration || '3h 12m',
          releaseDate: nowShowingData[0].releaseDate || '2022-12-16',
          director: nowShowingData[0].director || 'James Cameron',
          genre: nowShowingData[0].genre || 'Sci-Fi, Action',
        });
      }

      // Transform data for movie cards
      setNowShowingMovies(
        nowShowingData.map((movie) => ({
          id: movie.id,
          title: movie.title,
          posterUrl: movie.poster || 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop',
          rating: movie.rating || 4.5,
          ageRating: movie.ageRating || 'PG-13',
          duration: movie.duration || '2h 30m',
          genre: movie.genre || 'Action',
        }))
      );

      setComingSoonMovies(
        upcomingData.map((movie) => ({
          id: movie.id,
          title: movie.title,
          posterUrl: movie.poster || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
          rating: movie.rating,
          ageRating: movie.ageRating,
          duration: movie.duration,
          genre: movie.genre || 'Coming Soon',
        }))
      );
    } catch (error) {
      console.error('Failed to load movies:', error);
      
      // Set demo data as fallback
      setFeaturedMovie({
        id: '1',
        title: 'Avatar: The Way of Water',
        description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home.',
        posterUrl: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop',
        backdropUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&h=1080&fit=crop',
        rating: 5.0,
        ageRating: 'PG-13',
        duration: '3h 12m',
        releaseDate: '2022-12-16',
        director: 'James Cameron',
        genre: 'Sci-Fi, Action',
      });

      setNowShowingMovies(generateDemoMovies(8, 'now-showing'));
      setComingSoonMovies(generateDemoMovies(8, 'coming-soon'));
    } finally {
      setLoading(false);
    }
  };

  const generateDemoMovies = (count, type) => {
    const titles = type === 'now-showing' 
      ? ['Ant-Man and the Wasp: Quantumania', 'Black Panther: Wakanda Forever', 'Creed III', 'Sword Art Online: Progressive']
      : ['The Batman', 'Guardian of the Galaxy 3', 'The Flash', 'Transformers: Rise of the Beasts'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: `${type}-${i + 1}`,
      title: titles[i % titles.length] || `Movie ${i + 1}`,
      posterUrl: `https://images.unsplash.com/photo-${1598899134739 + i}?w=400&h=600&fit=crop`,
      rating: 4 + Math.random(),
      ageRating: i % 2 === 0 ? 'PG-13' : '3D',
      duration: `${Math.floor(Math.random() * 60 + 90)}m`,
      genre: ['Action', 'Sci-Fi', 'Adventure', 'Drama'][i % 4],
    }));
  };

  const handleGetTicket = () => {
    if (featuredMovie) {
      navigate(`${ROUTES.MOVIES}/${featuredMovie.id}`);
    }
  };

  const handleWatchTrailer = () => {
    // Open trailer modal or navigate to trailer
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

  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection
        movie={featuredMovie}
        onGetTicket={handleGetTicket}
        onWatchTrailer={handleWatchTrailer}
      />

      {/* Now Showing Section */}
      <MovieGrid
        title="Now Showing"
        movies={nowShowingMovies}
        onMovieClick={handleMovieClick}
        onViewAll={handleViewAllNowShowing}
        loading={loading}
      />

      {/* Coming Soon Section */}
      <MovieGrid
        title="Coming Soon"
        movies={comingSoonMovies}
        onMovieClick={handleMovieClick}
        onViewAll={handleViewAllComingSoon}
        loading={loading}
        className="coming-soon-section"
      />

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="features-title">Vote For Music</h2>
          <div className="features-grid">
            <FeatureCard
              number="01"
              title="Deadpool 2"
              subtitle="Marvel"
              imageUrl="https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=300&fit=crop"
            />
            <FeatureCard
              number="02"
              title="Avengers: Infinity War"
              subtitle="The Avengers"
              imageUrl="https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=300&fit=crop"
            />
            <FeatureCard
              number="03"
              title="Aquaman"
              subtitle="DC"
              imageUrl="https://images.unsplash.com/photo-1518298059171-e570ac2b6022?w=400&h=300&fit=crop"
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
const FeatureCard = ({ number, title, subtitle, imageUrl }) => {
  return (
    <div className="feature-card">
      <div className="feature-card-image-wrapper">
        <img src={imageUrl} alt={title} className="feature-card-image" />
        <div className="feature-card-overlay" />
      </div>
      <div className="feature-card-content">
        <span className="feature-card-number">{number}</span>
        <h3 className="feature-card-title">{title}</h3>
        <p className="feature-card-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default HomePage;
