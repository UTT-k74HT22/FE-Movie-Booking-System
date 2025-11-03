import axios from 'axios';
import { authApi } from '../api/authApi';
import { tokenService } from './tokenService';
const BASE_URL = 'http://localhost:8080/api';

const httpRequest = axios.create({
  baseURL: BASE_URL,
  headers: { 
    "content-Type": "application/json",
    Accept: "application/json"

  },
  withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

httpRequest.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject });
        })
        .then (token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return httpRequest(originalRequest);
        })
        .catch (err => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newAccessToken = await authApi.refreshToken();
        processQueue(null, newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return httpRequest(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenService.clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
}

export const post = async (path, data, options = {}) => {
    const response = await httpRequest.post(path, data, options);
    return response.data;
}

export const put = async (path, data, options = {}) => {
    const response = await httpRequest.put(path, data, options);
    return response.data;
}

export const del = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
}

export default httpRequest;