import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../MovieCard/MovieCard';
import './MovieGrid.css';

/**
 * MovieGrid Component - Grid layout for displaying movies
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {Array} props.movies - Array of movie objects
 * @param {function} props.onMovieClick - Handler for movie card clicks
 * @param {function} props.onViewAll - Handler for view all button
 * @param {boolean} props.showViewAll - Show view all button
 * @param {boolean} props.loading - Show loading state
 * @param {string} props.className - Additional CSS classes
 */
const MovieGrid = ({
  title,
  movies = [],
  onMovieClick,
  onViewAll,
  showViewAll = true,
  loading = false,
  className = '',
}) => {
  if (loading) {
    return (
      <section className={`movie-grid-section ${className}`}>
        <div className="container">
          <div className="movie-grid-header">
            <h2 className="movie-grid-title">{title}</h2>
          </div>
          <div className="movie-grid">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="movie-card skeleton">
                <div className="movie-card-image-wrapper" />
                <div className="movie-card-content">
                  <div className="movie-card-title" style={{ width: '80%', height: '20px' }} />
                  <div className="movie-card-meta" style={{ width: '60%', height: '14px', marginTop: '8px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <section className={`movie-grid-section ${className}`}>
        <div className="container">
          <div className="movie-grid-header">
            <h2 className="movie-grid-title">{title}</h2>
          </div>
          <div className="movie-grid-empty">
            <p>No movies available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`movie-grid-section ${className}`}>
      <div className="container">
        <div className="movie-grid-header">
          <h2 className="movie-grid-title">{title}</h2>
          {showViewAll && onViewAll && (
            <button className="movie-grid-view-all" onClick={onViewAll}>
              View all
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={onMovieClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

MovieGrid.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object),
  onMovieClick: PropTypes.func,
  onViewAll: PropTypes.func,
  showViewAll: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default MovieGrid;
