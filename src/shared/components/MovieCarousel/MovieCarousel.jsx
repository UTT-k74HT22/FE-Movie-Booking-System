/**
 * MovieCarousel Component
 * Slider carousel for coming soon movies
 */

import React, { useState, useEffect, useRef } from 'react';
import './MovieCarousel.css';

const MovieCarousel = ({ movies = [], onMovieClick, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);

  const visibleMovies = 4; // Show 4 movies at a time
  const totalSlides = Math.ceil(movies.length / visibleMovies);

  useEffect(() => {
    if (autoPlay && totalSlides > 1) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, interval);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [currentIndex, autoPlay, interval, totalSlides]);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const getCurrentSlideMovies = () => {
    const startIdx = currentIndex * visibleMovies;
    return movies.slice(startIdx, startIdx + visibleMovies);
  };

  if (movies.length === 0) {
    return <div className="carousel-empty">No movies available</div>;
  }

  return (
    <div className="movie-carousel">
      {/* Carousel Container */}
      <div className="carousel-container">
        {/* Previous Button */}
        {totalSlides > 1 && (
          <button
            onClick={handlePrev}
            className="carousel-nav carousel-prev"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Movies Grid */}
        <div className="carousel-track">
          {getCurrentSlideMovies().map((movie, index) => (
            <div
              key={movie.id || index}
              className="carousel-item"
              onClick={() => onMovieClick?.(movie)}
            >
              <div className="carousel-card">
                <div className="carousel-poster">
                  <img
                    src={movie.posterUrl || 'https://via.placeholder.com/300x450?text=Coming+Soon'}
                    alt={movie.title}
                    loading="lazy"
                  />
                  <div className="carousel-overlay">
                    <div className="coming-soon-badge">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Coming Soon</span>
                    </div>
                    <button className="notify-btn">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      Notify Me
                    </button>
                  </div>
                </div>
                <div className="carousel-info">
                  <h3 className="carousel-title">{movie.title}</h3>
                  <p className="carousel-genre">{movie.genre || 'Action, Adventure'}</p>
                  {movie.releaseDate && (
                    <p className="carousel-date">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {movie.releaseDate}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        {totalSlides > 1 && (
          <button
            onClick={handleNext}
            className="carousel-nav carousel-next"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Pagination Dots */}
      {totalSlides > 1 && (
        <div className="carousel-pagination">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`pagination-dot ${index === currentIndex ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieCarousel;
