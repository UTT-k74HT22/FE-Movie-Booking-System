/**
 * Route Configuration
 * Centralized route definitions with lazy loading
 */

import { lazy } from 'react';
import { ROUTES, USER_ROLES } from '../../shared/constants';
import { AdminLayout, ClientLayout } from '../../shared/components';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('../../features/home/pages/HomePage'));
const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('../../features/auth/pages/RegisterPage'));
const ActivateAccountPage = lazy(() => import('../../features/auth/pages/ActivateAccountPage'));
const ForgotPasswordPage = lazy(() => import('../../features/auth/pages/ForgotPasswordPage'));

const MovieListPage = lazy(() => import('../../features/movies/pages/MovieListPage'));
const MovieDetailPage = lazy(() => import('../../features/movies/pages/MovieDetailPage'));

const MyBookingsPage = lazy(() => import('../../features/bookings/pages/MyBookingsPage'));

const DashboardPage = lazy(() => import('../../features/admin/pages/DashboardPage'));
const AdminMoviesPage = lazy(() => import('../../features/admin/pages/AdminMoviesPage'));
const AddMoviePage = lazy(() => import('../../features/admin/pages/AddMoviePage'));
const AdminBookingsPage = lazy(() => import('../../features/admin/pages/AdminBookingsPage'));
const AdminUsersPage = lazy(() => import('../../features/admin/pages/AdminUsersPage'));
const SettingsPage = lazy(() => import('../../features/admin/pages/SettingsPage'));

const UnauthorizedPage = lazy(() => import('../../shared/components/UnauthorizedPage/UnauthorizedPage'));
const NotFoundPage = lazy(() => import('../../shared/components/NotFoundPage/NotFoundPage'));

/**
 * Public Routes Configuration
 * Accessible without authentication
 */
export const publicRoutes = [
  {
    path: ROUTES.HOME,
    component: HomePage,
    layout: ClientLayout,
  },
  {
    path: ROUTES.LOGIN,
    component: LoginPage,
    layout: null,
  },
  {
    path: ROUTES.REGISTER,
    component: RegisterPage,
    layout: null,
  },
  {
    path: ROUTES.ACTIVATE_ACCOUNT,
    component: ActivateAccountPage,
    layout: null,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    component: ForgotPasswordPage,
    layout: null,
  },
  {
    path: ROUTES.MOVIES,
    component: MovieListPage,
    layout: ClientLayout,
  },
  {
    path: ROUTES.MOVIE_DETAIL,
    component: MovieDetailPage,
    layout: ClientLayout,
  },
  {
    path: ROUTES.UNAUTHORIZED,
    component: UnauthorizedPage,
    layout: null,
  },
];

/**
 * Protected Routes Configuration
 * Requires authentication and specific roles
 */
export const protectedRoutes = [
  // User Routes
  {
    path: ROUTES.MY_BOOKINGS,
    component: MyBookingsPage,
    layout: ClientLayout,
    allowedRoles: [USER_ROLES.USER, USER_ROLES.ADMIN],
  },
  {
    path: ROUTES.PROFILE,
    component: MyBookingsPage, // Replace with ProfilePage when created
    layout: ClientLayout,
    allowedRoles: [USER_ROLES.USER, USER_ROLES.ADMIN],
  },

  // Admin Routes
  {
    path: ROUTES.ADMIN.DASHBOARD,
    component: DashboardPage,
    layout: AdminLayout,
    allowedRoles: [USER_ROLES.ADMIN],
  },
  {
    path: ROUTES.ADMIN.MOVIES,
    component: AdminMoviesPage,
    layout: AdminLayout,
    allowedRoles: [USER_ROLES.ADMIN],
  },
  {
    path: ROUTES.ADMIN.ADD_MOVIE,
    component: AddMoviePage,
    layout: AdminLayout,
    allowedRoles: [USER_ROLES.ADMIN],
  },
  {
    path: ROUTES.ADMIN.EDIT_MOVIE,
    component: AddMoviePage, // Same component, different mode
    layout: AdminLayout,
    allowedRoles: [USER_ROLES.ADMIN],
  },
  {
    path: ROUTES.ADMIN.BOOKINGS,
    component: AdminBookingsPage,
    layout: AdminLayout,
    allowedRoles: [USER_ROLES.ADMIN],
  },
  {
    path: ROUTES.ADMIN.USERS,
    component: AdminUsersPage,
    layout: AdminLayout,
    allowedRoles: [USER_ROLES.ADMIN],
  },
  {
    path: ROUTES.ADMIN.SETTINGS,
    component: SettingsPage,
    layout: AdminLayout,
    allowedRoles: [USER_ROLES.ADMIN],
  },
];

/**
 * Catch-all route for 404
 */
export const notFoundRoute = {
  path: '*',
  component: NotFoundPage,
  layout: null,
};

export default {
  publicRoutes,
  protectedRoutes,
  notFoundRoute,
};
