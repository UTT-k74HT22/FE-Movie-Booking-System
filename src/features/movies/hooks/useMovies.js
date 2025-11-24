/**
 * useMovies Hook
 * Movies data fetching and management
 */

import { useState, useEffect, useCallback } from 'react';
import { movieService } from '../services/movie.service';
import { toast } from 'react-toastify';

export const useMovies = (initialParams = {}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  /**
   * Fetch movies
   */
  const fetchMovies = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await movieService.getMovies({
        ...initialParams,
        ...params,
      });

      setMovies(response.data || response.content || []);
      
      if (response.pagination) {
        setPagination(response.pagination);
      }
    } catch (err) {
      const message = err.message || 'Failed to fetch movies';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [initialParams]);

  /**
   * Initial fetch
   */
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  /**
   * Refetch movies
   */
  const refetch = () => {
    fetchMovies();
  };

  /**
   * Change page
   */
  const changePage = (page) => {
    fetchMovies({ page });
  };

  /**
   * Change page size
   */
  const changePageSize = (pageSize) => {
    fetchMovies({ page: 1, pageSize });
  };

  return {
    movies,
    loading,
    error,
    pagination,
    refetch,
    changePage,
    changePageSize,
  };
};

export default useMovies;
