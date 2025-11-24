/**
 * Application Constants
 * General app-wide constants
 */

// User Roles
export const USER_ROLES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
  GUEST: 'ROLE_GUEST',
};

// Authentication
export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_INFO: 'user_info',
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

// Toast Types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Movie Status
export const MOVIE_STATUS = {
  NOW_SHOWING: 'NOW_SHOWING',
  COMING_SOON: 'COMING_SOON',
  ENDED: 'ENDED',
};

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  LANGUAGE: 'language',
  ...AUTH_STORAGE_KEYS,
};

export default {
  USER_ROLES,
  AUTH_STORAGE_KEYS,
  HTTP_STATUS,
  TOAST_TYPES,
  MOVIE_STATUS,
  BOOKING_STATUS,
  STORAGE_KEYS,
};
