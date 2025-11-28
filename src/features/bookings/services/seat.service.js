/**
 * Seat Service
 * Handles all seat-related API calls
 */

import { httpClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../shared/constants';

class SeatService {
  /**
   * Get all seats by screen ID
   * @param {number} screenId - Screen ID
   */
  async getSeatsByScreen(screenId) {
    try {
      const response = await httpClient.get(`/v1/seats/screen/${screenId}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Hold seats temporarily (120 seconds default)
   * @param {Object} holdRequest
   * @param {number} holdRequest.showtimeId - Showtime ID
   * @param {Array<number>} holdRequest.seatIds - Array of seat IDs to hold
   * @param {number} holdRequest.ttlSec - Time to live in seconds (default 120)
   */
  async holdSeats(holdRequest) {
    try {
      const response = await httpClient.post('/v1/seat-holds', holdRequest);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Release held seats manually
   * @param {Object} releaseRequest
   * @param {number} releaseRequest.showtimeId - Showtime ID
   * @param {Array<number>} releaseRequest.seatIds - Array of seat IDs to release
   */
  async releaseSeats(releaseRequest) {
    try {
      const response = await httpClient.delete('/v1/seat-holds', { data: releaseRequest });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get seat by ID
   * @param {number} seatId - Seat ID
   */
  async getSeatById(seatId) {
    try {
      const response = await httpClient.get(`/v1/seats/${seatId}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }
}

export const seatService = new SeatService();
export default seatService;
