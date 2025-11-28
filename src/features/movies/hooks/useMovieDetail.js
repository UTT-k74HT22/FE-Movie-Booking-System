/**
 * useMovieDetail Hook
 * Fetch movie details and manage showtime selection
 */

import { useState, useEffect, useCallback } from 'react';
import { movieService } from '../services/movie.service';
import { showtimeService } from '../services/showtime.service';
import { toast } from 'react-toastify';

export const useMovieDetail = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showtimesLoading, setShowtimesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  /**
   * Fetch movie details
   */
  const fetchMovie = useCallback(async () => {
    if (!movieId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await movieService.getMovieById(movieId);
      setMovie(response.data || response);
      
      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      setSelectedDate(today);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch movie details';
      setError(message);
      console.error('Error fetching movie:', err);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  /**
   * Fetch showtimes for selected date
   */
  const fetchShowtimes = useCallback(async (date) => {
    if (!movieId || !date) return;

    try {
      setShowtimesLoading(true);
      
      const response = await showtimeService.getShowtimesByMovie(movieId, date);
      const showtimesData = response.data || response.content || response || [];
      
      // Group showtimes by theater
      const grouped = showtimesData.reduce((acc, showtime) => {
        const theaterName = showtime.theater?.name || 'Unknown Theater';
        if (!acc[theaterName]) {
          acc[theaterName] = {
            theater: showtime.theater,
            showtimes: []
          };
        }
        acc[theaterName].showtimes.push(showtime);
        return acc;
      }, {});
      
      setShowtimes(Object.values(grouped));
    } catch (err) {
      console.error('Error fetching showtimes:', err);
      setShowtimes([]);
    } finally {
      setShowtimesLoading(false);
    }
  }, [movieId]);

  /**
   * Initial fetch
   */
  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  /**
   * Fetch showtimes when date changes
   */
  useEffect(() => {
    if (selectedDate) {
      fetchShowtimes(selectedDate);
    }
  }, [selectedDate, fetchShowtimes]);

  /**
   * Handle date change
   */
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedShowtime(null); // Reset selected showtime
  };

  /**
   * Handle showtime selection
   */
  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
  };

  /**
   * Refetch movie and showtimes
   */
  const refetch = () => {
    fetchMovie();
    if (selectedDate) {
      fetchShowtimes(selectedDate);
    }
  };

  return {
    movie,
    showtimes,
    loading,
    showtimesLoading,
    error,
    selectedDate,
    selectedShowtime,
    handleDateChange,
    handleShowtimeSelect,
    refetch,
  };
};

export default useMovieDetail;
