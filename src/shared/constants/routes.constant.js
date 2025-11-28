/**
 * Routes Constants
 * Centralized route paths management
 */

export const ROUTES = {
  // Public Routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  ACTIVATE_ACCOUNT: '/activate',
  
  // Client Routes
  MOVIES: '/movies',
  MOVIE_DETAIL: '/movies/:id',
  BOOKINGS: '/bookings',
  MY_BOOKINGS: '/my-bookings',
  PROFILE: '/profile',

  // Admin Routes
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin/dashboard',
    MOVIES: '/admin/movies',
    ADD_MOVIE: '/admin/movies/add',
    EDIT_MOVIE: '/admin/movies/edit/:id',
    BOOKINGS: '/admin/bookings',
    USERS: '/admin/users',
    SETTINGS: '/admin/settings',
  },

  // Error Routes
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '/404',
};

// Helper function to build route with params
export const buildRoute = (route, params = {}) => {
  let path = route;
  Object.keys(params).forEach((key) => {
    path = path.replace(`:${key}`, params[key]);
  });
  return path;
};

export default ROUTES;
