/**
 * Showtime Service
 * Handles all showtime-related API calls
 */

import { httpClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../shared/constants';

class ShowtimeService {
  /**
   * Get all showtimes with pagination and filters
   * @param {Object} params
   * @param {number} params.theaterId - Filter by theater ID
   * @param {number} params.movieId - Filter by movie ID
   * @param {string} params.date - Filter by date (YYYY-MM-DD)
   * @param {number} params.pageNumber - Page number (0-based)
   * @param {number} params.pageSize - Page size
   */
  async getShowtimes(params = {}) {
    try {
      const response = await httpClient.get(API_ENDPOINTS.SHOWTIMES.BASE, { params });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get showtime by ID
   * @param {number} id - Showtime ID
   */
  async getShowtimeById(id) {
    try {
      const response = await httpClient.get(API_ENDPOINTS.SHOWTIMES.BY_ID(id));
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get showtimes by movie ID and optional date
   * @param {number} movieId - Movie ID
   * @param {string} date - Date in YYYY-MM-DD format (optional)
   * @param {number} theaterId - Theater ID (optional)
   */
  async getShowtimesByMovie(movieId, date = null, theaterId = null) {
    try {
      const params = { movieId };
      if (date) params.date = date;
      if (theaterId) params.theaterId = theaterId;
      
      const response = await httpClient.get(API_ENDPOINTS.SHOWTIMES.BASE, { params });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get available seats for a showtime
   * @param {number} showtimeId - Showtime ID
   */
  async getAvailableSeats(showtimeId) {
    try {
      const response = await httpClient.get(`${API_ENDPOINTS.SHOWTIMES.BY_ID(showtimeId)}/seats`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }
}

export const showtimeService = new ShowtimeService();
export default showtimeService;
