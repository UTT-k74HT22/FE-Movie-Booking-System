/**
 * API Interceptors
 * Request and Response interceptors for authentication, error handling, etc.
 */

import { tokenService } from '../../shared/utils/token.service';
import { API_ENDPOINTS, HTTP_STATUS } from '../../shared/constants';
import { toast } from 'react-toastify';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Setup request and response interceptors
 */
export const setupInterceptors = (axiosInstance) => {
  // Request Interceptor
  axiosInstance.interceptors.request.use(
    async (config) => {
      // Add access token to headers
      const accessToken = tokenService.getAccessToken();
      
      if (accessToken && !tokenService.isTokenExpired(accessToken)) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Handle network errors
      if (!error.response) {
        toast.error('Network error. Please check your connection.');
        return Promise.reject(error);
      }

      const { status } = error.response;

      // Handle 401 Unauthorized - Token expired
      if (status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
        if (isRefreshing) {
          // Queue the request while refreshing
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = tokenService.getRefreshToken();

        if (!refreshToken) {
          // No refresh token, redirect to login
          tokenService.clearTokens();
          window.location.href = '/login';
          return Promise.reject(error);
        }

        try {
          // Attempt to refresh token
          const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          tokenService.setTokens(accessToken, newRefreshToken);
          
          // Update authorization header
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          
          processQueue(null, accessToken);
          
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          tokenService.clearTokens();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Handle 403 Forbidden
      if (status === HTTP_STATUS.FORBIDDEN) {
        toast.error('You do not have permission to perform this action.');
        // Optional: redirect to unauthorized page
        // window.location.href = '/unauthorized';
      }

      // Handle 404 Not Found
      if (status === HTTP_STATUS.NOT_FOUND) {
        toast.error('Resource not found.');
      }

      // Handle 500 Internal Server Error
      if (status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        toast.error('Server error. Please try again later.');
      }

      // Handle other errors
      const errorMessage = error.response?.data?.message || 'An error occurred';
      
      // Don't show toast for certain endpoints (to avoid duplicate toasts)
      const silentEndpoints = [API_ENDPOINTS.AUTH.LOGIN, API_ENDPOINTS.AUTH.REGISTER];
      const isSilent = silentEndpoints.some(endpoint => originalRequest.url?.includes(endpoint));
      
      if (!isSilent && status !== HTTP_STATUS.UNAUTHORIZED) {
        toast.error(errorMessage);
      }

      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
