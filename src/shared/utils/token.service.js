/**
 * Token Service
 * Handles token management (get, set, remove, validate)
 */

import { AUTH_STORAGE_KEYS } from '../../shared/constants';
import { jwtDecode } from 'jwt-decode';

class TokenService {
  /**
   * Get access token from localStorage
   */
  getAccessToken() {
    return localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Get refresh token from localStorage
   */
  getRefreshToken() {
    return localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Set access token to localStorage
   */
  setAccessToken(token) {
    if (token) {
      localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, token);
    }
  }

  /**
   * Set refresh token to localStorage
   */
  setRefreshToken(token) {
    if (token) {
      localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, token);
    }
  }

  /**
   * Set both tokens
   */
  setTokens(accessToken, refreshToken) {
    this.setAccessToken(accessToken);
    if (refreshToken) {
      this.setRefreshToken(refreshToken);
    }
  }

  /**
   * Remove access token
   */
  removeAccessToken() {
    localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Remove refresh token
   */
  removeRefreshToken() {
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Clear all tokens
   */
  clearTokens() {
    this.removeAccessToken();
    this.removeRefreshToken();
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER_INFO);
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(token = null) {
    try {
      const tokenToCheck = token || this.getAccessToken();
      if (!tokenToCheck) return true;

      const decoded = jwtDecode(tokenToCheck);
      const currentTime = Date.now() / 1000;

      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  }

  /**
   * Get decoded token payload
   */
  getTokenPayload(token = null) {
    try {
      const tokenToDecode = token || this.getAccessToken();
      if (!tokenToDecode) return null;

      return jwtDecode(tokenToDecode);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Get user from token
   */
  getUserFromToken() {
    const payload = this.getTokenPayload();
    return payload ? {
      id: payload.accountId,
      username: payload.sub,
      roles: Array.isArray(payload.roles) 
      ? payload.roles
      : payload.roles
      ? [payload.roles]
      : [],
    } : null;
  }
}

export const tokenService = new TokenService();
export default tokenService;
