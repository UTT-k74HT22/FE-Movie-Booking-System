/**
 * Auth Service
 * Handles all authentication API calls
 */

import { httpClient } from '../../../core/api';
import { API_ENDPOINTS } from '../../../shared/constants';
import { tokenService } from '../../../shared/utils';

class AuthService {
  /**
   * Login user
   */
  async login(credentials) {
    try {
      const response = await httpClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      
      const { accessToken, refreshToken, expiresIn } = response.data || response;
      
      // Save tokens
      if (accessToken) {
        tokenService.setTokens(accessToken, refreshToken);
      }

      // Get user info from token
      const user = tokenService.getUserFromToken();
      
      return {
        accessToken,
        refreshToken,
        expiresIn,
        user,
      };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      throw new Error(message);
    }
  }

  /**
   * Register new user
   */
  async register(userData) {
    try {
      const response = await httpClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response.data || response;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      throw new Error(message);
    }
  }

  /**
   * Activate account with OTP
   */
  async activateAccount(email, otp) {
    try {
      const response = await httpClient.post(API_ENDPOINTS.AUTH.ACTIVATE, { email, otp });
      return response.data || response;
    } catch (error) {
      const message = error.response?.data?.message || 'Activation failed';
      throw new Error(message);
    }
  }

  /**
   * Request forgot password
   */
  async forgotPassword(email) {
    try {
      const response = await httpClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
      return response.data || response;
    } catch (error) {
      const message = error.response?.data?.message || 'Request failed';
      throw new Error(message);
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(token, newPassword) {
    try {
      const response = await httpClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        token,
        newPassword,
      });
      return response.data || response;
    } catch (error) {
      const message = error.response?.data?.message || 'Reset password failed';
      throw new Error(message);
    }
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      const refreshToken = tokenService.getRefreshToken();
      
      if (refreshToken) {
        await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear tokens on logout
      tokenService.clearTokens();
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken() {
    try {
      const refreshToken = tokenService.getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await httpClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data || response;

      tokenService.setTokens(accessToken, newRefreshToken || refreshToken);

      return accessToken;
    } catch (error) {
      tokenService.clearTokens();
      throw error;
    }
  }

  /**
   * Get current user info
   */
  async getCurrentUser() {
    try {
      const response = await httpClient.get(API_ENDPOINTS.AUTH.ME);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    const token = tokenService.getAccessToken();
    return token && !tokenService.isTokenExpired(token);
  }

  /**
   * Get current user from token
   */
  getCurrentUserFromToken() {
    return tokenService.getUserFromToken();
  }
}

export const authService = new AuthService();
export default authService;
