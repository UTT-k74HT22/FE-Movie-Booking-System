/**
 * Movie Service
 * Handles all movie-related API calls
 */

import { httpClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../shared/constants';

class MovieService {
  /**
   * Get all movies with pagination
   */
  async getMovies(params = {}) {
    try {
      const response = await httpClient.get(API_ENDPOINTS.MOVIES.BASE, { params });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get movie by ID
   */
  async getMovieById(id) {
    try {
      const response = await httpClient.get(API_ENDPOINTS.MOVIES.BY_ID(id));
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search movies
   */
  async searchMovies(query, params = {}) {
    try {
      const response = await httpClient.get(API_ENDPOINTS.MOVIES.SEARCH, {
        params: { query, ...params },
      });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get popular movies
   */
  async getPopularMovies() {
    try {
      const response = await httpClient.get(API_ENDPOINTS.MOVIES.POPULAR);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get upcoming movies
   */
  async getUpcomingMovies() {
    try {
      const response = await httpClient.get(API_ENDPOINTS.MOVIES.UPCOMING);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new movie (Admin only)
   */
  async createMovie(movieData) {
    try {
      const response = await httpClient.post(API_ENDPOINTS.MOVIES.BASE, movieData);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update movie (Admin only)
   */
  async updateMovie(id, movieData) {
    try {
      const response = await httpClient.put(API_ENDPOINTS.MOVIES.BY_ID(id), movieData);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete movie (Admin only)
   */
  async deleteMovie(id) {
    try {
      const response = await httpClient.delete(API_ENDPOINTS.MOVIES.BY_ID(id));
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }
}

export const movieService = new MovieService();
export default movieService;
