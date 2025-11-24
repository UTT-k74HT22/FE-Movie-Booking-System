import React from 'react';
import PropTypes from 'prop-types';
import './MovieCard.css';

/**
 * MovieCard Component - Card for displaying movie information
 * @param {Object} props
 * @param {Object} props.movie - Movie data object
 * @param {string} props.movie.id - Movie ID
 * @param {string} props.movie.title - Movie title
 * @param {string} props.movie.posterUrl - Movie poster image URL
 * @param {number} props.movie.rating - Movie rating (0-5)
 * @param {string} props.movie.ageRating - Age rating (e.g., "PG-13")
 * @param {string} props.movie.duration - Movie duration
 * @param {string} props.movie.genre - Movie genre
 * @param {function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 */
const MovieCard = ({ movie, onClick, className = '' }) => {
  const {
    id,
    title,
    posterUrl,
    rating,
    ageRating,
    duration,
    genre,
  } = movie;

  const handleClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  return (
    <div
      className={`movie-card ${className}`}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
    >
      <div className="movie-card-image-wrapper">
        <img
          src={posterUrl || '/placeholder-movie.jpg'}
          alt={title}
          className="movie-card-image"
          loading="lazy"
        />
        <div className="movie-card-overlay">
          <div className="movie-card-badges">
            {ageRating && (
              <span className="badge-age">{ageRating}</span>
            )}
            {rating && (
              <span className="badge-rating">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="movie-card-content">
        <h3 className="movie-card-title">{title}</h3>
        {(genre || duration) && (
          <div className="movie-card-meta">
            {genre && <span className="movie-card-genre">{genre}</span>}
            {genre && duration && <span className="movie-card-separator">•</span>}
            {duration && <span className="movie-card-duration">{duration}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    posterUrl: PropTypes.string,
    rating: PropTypes.number,
    ageRating: PropTypes.string,
    duration: PropTypes.string,
    genre: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default MovieCard;
