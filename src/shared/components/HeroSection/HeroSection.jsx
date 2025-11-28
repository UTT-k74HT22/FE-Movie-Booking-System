import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Badge from '../Badge/Badge';
import './HeroSection.css';

/**
 * HeroSection Component - Large banner showcasing featured movie
 * @param {Object} props
 * @param {Object} props.movie - Featured movie data
 * @param {function} props.onGetTicket - Handler for get ticket button
 * @param {function} props.onWatchTrailer - Handler for watch trailer button
 */
const HeroSection = ({ movie, onGetTicket, onWatchTrailer }) => {
  if (!movie) return null;

  const {
    title,
    description,
    posterUrl,
    backdropUrl,
    rating,
    ageRating,
    duration,
    releaseDate,
    director,
    genre,
  } = movie;

  const StarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  const PlayIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  return (
    <section className="hero-section">
      {/* Background Image */}
      <div className="hero-background">
        <img
          src={backdropUrl || posterUrl}
          alt=""
          className="hero-background-image"
        />
        <div className="hero-overlay" />
      </div>

      {/* Content */}
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-label">
              <span className="label-dot" />
              Exclusive Show (Experience in 3D)
            </div>

            <h1 className="hero-title">{title}</h1>

            {/* Meta Information */}
            <div className="hero-meta">
              <div className="hero-meta-badges">
                {duration && (
                  <span className="hero-meta-item">{duration}</span>
                )}
                {ageRating && (
                  <Badge variant="age">{ageRating}</Badge>
                )}
                {releaseDate && (
                  <span className="hero-meta-item">{new Date(releaseDate).getFullYear()}</span>
                )}
              </div>
              {rating && (
                <Badge variant="rating" icon={<StarIcon />}>
                  {rating.toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className="hero-description">{description}</p>
            )}

            {/* Additional Info */}
            {(director || genre) && (
              <div className="hero-info">
                {director && (
                  <div className="hero-info-item">
                    <span className="hero-info-label">Director:</span>
                    <span className="hero-info-value">{director}</span>
                  </div>
                )}
                {genre && (
                  <div className="hero-info-item">
                    <span className="hero-info-label">Genre:</span>
                    <span className="hero-info-value">{genre}</span>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="hero-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={onGetTicket}
              >
                Get Ticket
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={<PlayIcon />}
                onClick={onWatchTrailer}
              >
                Watch Trailer
              </Button>
            </div>
          </div>

          {/* Poster (Desktop Only) */}
          <div className="hero-poster">
            <img
              src={posterUrl}
              alt={title}
              className="hero-poster-image"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    posterUrl: PropTypes.string.isRequired,
    backdropUrl: PropTypes.string,
    rating: PropTypes.number,
    ageRating: PropTypes.string,
    duration: PropTypes.string,
    releaseDate: PropTypes.string,
    director: PropTypes.string,
    genre: PropTypes.string,
  }),
  onGetTicket: PropTypes.func,
  onWatchTrailer: PropTypes.func,
};

export default HeroSection;
