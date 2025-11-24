/**
 * Environment Configuration
 * Centralized environment variables management
 */

export const envConfig = {
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  apiTimeout: import.meta.env.VITE_API_TIMEOUT || 30000,

  // App Configuration
  appName: import.meta.env.VITE_APP_NAME || 'Movie Booking System',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  environment: import.meta.env.MODE || 'development',

  // Feature Flags
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
  
  // Authentication
  tokenKey: 'access_token',
  refreshTokenKey: 'refresh_token',
};

export default envConfig;
