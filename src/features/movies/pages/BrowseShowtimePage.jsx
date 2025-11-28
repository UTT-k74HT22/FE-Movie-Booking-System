import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../../../shared/components/Badge/Badge';
import Button from '../../../shared/components/Button/Button';
import './BrowseShowtimePage.css';

/**
 * BrowseShowtimePage Component
 * Page for browsing showtimes with theater and date selection
 */
const BrowseShowtimePage = () => {
  const navigate = useNavigate();
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(false);

  const theaters = [
    { id: 1, name: 'Ekahudhura Shopping Mall, Panthiruoth' },
    { id: 2, name: 'Starplex Cinema, Main Street' },
    { id: 3, name: 'Grand Theater, Downtown' },
  ];

  const dates = generateDates(7);

  useEffect(() => {
    // Set default selections
    if (theaters.length > 0 && !selectedTheater) {
      setSelectedTheater(theaters[0]);
    }
    if (dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[1]); // Select Sunday by default
    }
  }, []);

  useEffect(() => {
    if (selectedTheater && selectedDate) {
      loadShowtimes();
    }
  }, [selectedTheater, selectedDate]);

  function generateDates(count) {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        id: i,
        date: date.getDate(),
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: date,
      });
    }
    
    return dates;
  }

  const loadShowtimes = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Demo data
      setShowtimes([
        {
          id: 1,
          movieId: '1',
          title: 'Avatar: The Way of Water (3D)',
          posterUrl: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop',
          backdropUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=400&fit=crop',
          rating: 5.0,
          ageRating: 'PG-13',
          releaseDate: '16 December 2022',
          genre: '3D, IMAX',
          director: 'James Cameron',
          cast: ['Sam Worthington', 'Zoe Saldana'],
          language: 'English',
          duration: '3h 12m',
          times: ['11:30 AM', '02:30 PM', '06:30 PM', '09:30 PM'],
        },
        {
          id: 2,
          movieId: '2',
          title: 'Ant-Man and the Wasp: Quantumania (3D)',
          posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
          backdropUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&h=400&fit=crop',
          rating: 4.8,
          ageRating: 'PG-13',
          releaseDate: '17 February 2023',
          genre: '3D, IMAX',
          director: 'Peyton Reed',
          cast: ['Paul Rudd', 'Evangeline Lilly'],
          language: 'English',
          duration: '2h 5m',
          times: ['10:30 AM', '01:30 PM', '04:30 PM', '07:30 PM'],
        },
        {
          id: 3,
          movieId: '3',
          title: 'Creed 3 (2D)',
          posterUrl: 'https://images.unsplash.com/photo-1518298059171-e570ac2b6022?w=400&h=600&fit=crop',
          backdropUrl: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=400&fit=crop',
          rating: 4.5,
          ageRating: '15',
          releaseDate: '03 March 2023',
          genre: 'Action, Drama',
          director: 'Michael B. Jordan',
          cast: ['Michael B. Jordan', 'Jonathan Majors'],
          language: 'English',
          duration: '1h 56m',
          times: ['12:30 PM', '03:30 PM', '06:30 PM', '09:30 PM'],
        },
      ]);
    } catch (error) {
      console.error('Failed to load showtimes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWatchTrailer = (movieId) => {
    console.log('Watch trailer for movie:', movieId);
  };

  const handleGetTicket = (movieId, time) => {
    navigate(`/movies/${movieId}/booking?time=${time}`);
  };

  const StarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  const PlayIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10 8l6 4-6 4z" />
    </svg>
  );

  return (
    <div className="browse-showtime-page">
      <div className="container">
        <h1 className="page-title">Showtime</h1>

        {/* Theater Selection */}
        <div className="selection-section">
          <label className="selection-label">Select Theatre</label>
          <div className="theater-dropdown">
            <select
              value={selectedTheater?.id || ''}
              onChange={(e) => {
                const theater = theaters.find((t) => t.id === parseInt(e.target.value));
                setSelectedTheater(theater);
              }}
              className="theater-select"
            >
              {theaters.map((theater) => (
                <option key={theater.id} value={theater.id}>
                  {theater.name}
                </option>
              ))}
            </select>
            <svg className="dropdown-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </div>

        {/* Date Selection */}
        <div className="selection-section">
          <label className="selection-label">Select date</label>
          <div className="date-selector">
            <button className="date-nav-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            <div className="date-grid">
              {dates.map((date) => (
                <button
                  key={date.id}
                  className={`date-button ${selectedDate?.id === date.id ? 'active' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="date-day">{date.day}</span>
                  <span className="date-number">{date.date}</span>
                </button>
              ))}
            </div>

            <button className="date-nav-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Showtimes List */}
        <div className="showtimes-section">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner" />
              <p>Loading showtimes...</p>
            </div>
          ) : (
            <div className="showtimes-list">
              {showtimes.map((showtime) => (
                <ShowtimeCard
                  key={showtime.id}
                  showtime={showtime}
                  onWatchTrailer={handleWatchTrailer}
                  onGetTicket={handleGetTicket}
                  StarIcon={StarIcon}
                  PlayIcon={PlayIcon}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * ShowtimeCard Component
 */
const ShowtimeCard = ({ showtime, onWatchTrailer, onGetTicket, StarIcon, PlayIcon }) => {
  return (
    <div className="showtime-card">
      <div className="showtime-card-image">
        <img src={showtime.backdropUrl || showtime.posterUrl} alt={showtime.title} />
        <div className="showtime-card-overlay" />
      </div>

      <div className="showtime-card-content">
        <div className="showtime-card-header">
          <h2 className="showtime-card-title">{showtime.title}</h2>
          <div className="showtime-card-meta">
            <Badge variant="rating" icon={<StarIcon />}>
              {showtime.rating.toFixed(2)}
            </Badge>
          </div>
        </div>

        <div className="showtime-card-info">
          <div className="showtime-info-row">
            <span className="info-label">Release Date:</span>
            <span className="info-value">{showtime.releaseDate}</span>
          </div>
          <div className="showtime-info-row">
            <span className="info-label">Category:</span>
            <span className="info-value">{showtime.genre}</span>
          </div>
          <div className="showtime-info-row">
            <span className="info-label">Actor:</span>
            <span className="info-value">{showtime.cast.join(', ')}</span>
          </div>
          <div className="showtime-info-row">
            <span className="info-label">Director:</span>
            <span className="info-value">{showtime.director}</span>
          </div>
          <div className="showtime-info-row">
            <span className="info-label">Language:</span>
            <span className="info-value">{showtime.language}</span>
          </div>
          <div className="showtime-info-row">
            <span className="info-label">Total Time:</span>
            <span className="info-value">{showtime.duration}</span>
          </div>
        </div>

        <div className="showtime-card-actions">
          <div className="showtime-times">
            {showtime.times.map((time, index) => (
              <button
                key={index}
                className="showtime-slot"
                onClick={() => onGetTicket(showtime.movieId, time)}
              >
                {time}
              </button>
            ))}
          </div>

          <Button
            variant="secondary"
            icon={<PlayIcon />}
            onClick={() => onWatchTrailer(showtime.movieId)}
            className="watch-trailer-button"
          >
            Watch Trailer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BrowseShowtimePage;
