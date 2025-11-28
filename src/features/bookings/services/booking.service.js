/**
 * Booking Service
 * Handles all booking-related API calls
 */

import { httpClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../shared/constants';

class BookingService {
  /**
   * Get all bookings (Admin)
   */
  async getAllBookings(params = {}) {
    try {
      const response = await httpClient.get(API_ENDPOINTS.BOOKINGS.BASE, { params });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get my bookings
   */
  async getMyBookings() {
    try {
      const response = await httpClient.get(API_ENDPOINTS.BOOKINGS.MY_BOOKINGS);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get booking by ID
   */
  async getBookingById(id) {
    try {
      const response = await httpClient.get(API_ENDPOINTS.BOOKINGS.BY_ID(id));
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create booking
   */
  async createBooking(bookingData) {
    try {
      const response = await httpClient.post(API_ENDPOINTS.BOOKINGS.BASE, bookingData);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cancel booking
   */
  async cancelBooking(id) {
    try {
      const response = await httpClient.post(API_ENDPOINTS.BOOKINGS.CANCEL(id));
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update booking (Admin)
   */
  async updateBooking(id, bookingData) {
    try {
      const response = await httpClient.put(API_ENDPOINTS.BOOKINGS.BY_ID(id), bookingData);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }
}

export const bookingService = new BookingService();
export default bookingService;
