/**
 * API Endpoints Constants
 * Centralized API endpoints management
 */

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/v1/auth/login',
    REGISTER: '/v1/auth/register',
    LOGOUT: '/v1/auth/logout',
    REFRESH_TOKEN: '/v1/auth/refresh-token',
    FORGOT_PASSWORD: '/v1/auth/forgot-password',
    RESET_PASSWORD: '/v1/auth/reset-password',
    ACTIVATE: '/v1/auth/activate',
    ME: '/v1/auth/me',
  },

  // Movies
  MOVIES: {
    BASE: '/v1/movies',
    BY_ID: (id) => `/v1/movies/${id}`,
    SEARCH: '/v1/movies/search',
    POPULAR: '/v1/movies/popular',
    UPCOMING: '/v1/movies/upcoming',
  },

  // Showtimes
  SHOWTIMES: {
    BASE: '/v1/showtimes',
    BY_ID: (id) => `/v1/showtimes/${id}`,
    BY_MOVIE: (movieId) => `/v1/showtimes?movieId=${movieId}`,
    BY_THEATER_AND_MOVIE: (theaterId, movieId, date) => 
      `/v1/showtimes?theaterId=${theaterId}&movieId=${movieId}&date=${date}`,
  },

  // Theaters
  THEATERS: {
    BASE: '/v1/theaters',
    BY_ID: (id) => `/v1/theaters/${id}`,
  },

  // Bookings
  BOOKINGS: {
    BASE: '/bookings',
    BY_ID: (id) => `/bookings/${id}`,
    MY_BOOKINGS: '/bookings/my',
    CANCEL: (id) => `/bookings/${id}/cancel`,
  },

  // Users
  USERS: {
    BASE: '/users',
    BY_ID: (id) => `/users/${id}`,
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
  },

  // Admin
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    STATISTICS: '/admin/statistics',
  },
};

export default API_ENDPOINTS;
