/**
 * API Endpoints Constants
 * Centralized API endpoints management
 */

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ACTIVATE: '/auth/activate',
    ME: '/auth/me',
  },

  // Movies
  MOVIES: {
    BASE: '/movies',
    BY_ID: (id) => `/movies/${id}`,
    SEARCH: '/movies/search',
    POPULAR: '/movies/popular',
    UPCOMING: '/movies/upcoming',
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
