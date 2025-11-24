/**
 * useMovieDetail Hook
 * Single movie detail fetching
 */

import { useState, useEffect } from 'react';
import { movieService } from '../services/movie.service';
import { toast } from 'react-toastify';

export const useMovieDetail = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setLoading(false);
      return;
    }

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await movieService.getMovieById(movieId);
        setMovie(response.data || response);
      } catch (err) {
        const message = err.message || 'Failed to fetch movie details';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  return { movie, loading, error };
};

export default useMovieDetail;
