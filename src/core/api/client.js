/**
 * API Client
 * Unified Axios instance with interceptors
 * Replaces both httpRequest.js and axiosInstance.js
 */

import axios from 'axios';
import { envConfig } from '../config/env.config';
import { setupInterceptors } from './interceptors';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: envConfig.apiBaseUrl,
  timeout: envConfig.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Setup request/response interceptors
setupInterceptors(apiClient);

/**
 * HTTP Methods Wrapper
 */

export const httpClient = {
  /**
   * GET request
   */
  get: async (url, config = {}) => {
    const response = await apiClient.get(url, config);
    return response.data;
  },

  /**
   * POST request
   */
  post: async (url, data = {}, config = {}) => {
    const response = await apiClient.post(url, data, config);
    return response.data;
  },

  /**
   * PUT request
   */
  put: async (url, data = {}, config = {}) => {
    const response = await apiClient.put(url, data, config);
    return response.data;
  },

  /**
   * PATCH request
   */
  patch: async (url, data = {}, config = {}) => {
    const response = await apiClient.patch(url, data, config);
    return response.data;
  },

  /**
   * DELETE request
   */
  delete: async (url, config = {}) => {
    const response = await apiClient.delete(url, config);
    return response.data;
  },
};

export default apiClient;
