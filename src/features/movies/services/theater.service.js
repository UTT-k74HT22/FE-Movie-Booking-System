/**
 * Theater Service
 * Handles all theater-related API calls
 */

import { httpClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../shared/constants';

class TheaterService {
  /**
   * Get all theaters
   * @param {Object} params - Query parameters
   */
  async getTheaters(params = {}) {
    try {
      const response = await httpClient.get(API_ENDPOINTS.THEATERS.BASE, { params });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get theater by ID
   * @param {number} id - Theater ID
   */
  async getTheaterById(id) {
    try {
      const response = await httpClient.get(API_ENDPOINTS.THEATERS.BY_ID(id));
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }
}

export const theaterService = new TheaterService();
export default theaterService;
