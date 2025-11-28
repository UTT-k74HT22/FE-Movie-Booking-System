/**
 * useMovies Hook
 * Custom hook for fetching and managing movies with pagination, filters, and search
 */

import { useState, useEffect, useCallback } from 'react';
import { movieService } from '../services/movie.service';
import { toast } from 'react-toastify';

export const useMovies = (initialParams = {}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 12,
    totalElements: 0,
    totalPages: 0,
  });
  
  const [filters, setFilters] = useState({
    sortBy: initialParams.sortBy || 'releaseDate',
    sortDir: initialParams.sortDir || 'desc',
    genre: initialParams.genre || '',
    status: initialParams.status || '',
    search: initialParams.search || '',
  });

  /**
   * Fetch movies with current filters and pagination
   */
  const fetchMovies = useCallback(async (page = 0) => {
    try {
      setLoading(true);
      setError(null);

      const response = await movieService.getMovies({
        page,
        size: pagination.size,
        ...filters,
      });

      // Handle different response structures
      const moviesData = response.data?.content || response.content || response.data || [];
      setMovies(moviesData);
      
      // Update pagination
      if (response.data?.page !== undefined) {
        setPagination({
          page: response.data.page || 0,
          size: response.data.size || 12,
          totalElements: response.data.totalElements || 0,
          totalPages: response.data.totalPages || 0,
        });
      } else if (response.page !== undefined) {
        setPagination({
          page: response.page || 0,
          size: response.size || 12,
          totalElements: response.totalElements || 0,
          totalPages: response.totalPages || 0,
        });
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to fetch movies';
      setError(message);
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.size]);

  /**
   * Initial fetch on filters change
   */
  useEffect(() => {
    fetchMovies(pagination.page);
  }, [filters]);

  /**
   * Change page
   */
  const handlePageChange = (newPage) => {
    fetchMovies(newPage);
  };

  /**
   * Update filters
   */
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 0 })); // Reset to first page
  };

  /**
   * Search movies
   */
  const handleSearch = (searchQuery) => {
    setFilters((prev) => ({ ...prev, search: searchQuery }));
    setPagination((prev) => ({ ...prev, page: 0 }));
  };

  /**
   * Change sort
   */
  const handleSort = (sortBy, sortDir = 'desc') => {
    setFilters((prev) => ({ ...prev, sortBy, sortDir }));
    setPagination((prev) => ({ ...prev, page: 0 }));
  };

  /**
   * Refetch movies
   */
  const refetch = () => {
    fetchMovies(pagination.page);
  };

  return {
    movies,
    loading,
    error,
    pagination,
    filters,
    handlePageChange,
    handleFilterChange,
    handleSearch,
    handleSort,
    refetch,
  };
};

export default useMovies;
