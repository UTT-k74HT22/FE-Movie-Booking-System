import * as httpRequest from '../utils/httpRequest';
import { tokenService } from '../utils/tokenService';
import { jwtDecode } from 'jwt-decode';

const authApi = {
  login: async (username, password) => {
    try {

      const data = await httpRequest.post('/auth/login', {
        username,
        password,
      });
      console.log('login data:', data);
      const body = data.data;
      const { accessToken, refreshToken, expiresIn } = body;
      
      let decode = {};
      let role = null;
        try {
          decode = jwtDecode(accessToken);
          role = decode.roles;
          localStorage.setItem('userRole', role);
        } catch (error) {
          console.error('Invalid token:', error);
        }

      tokenService.saveTokens({
        accessToken,
        refreshToken,
        expiresIn: expiresIn || 3600
      });
      return { body, role };
      
    } catch (error) {
      const message = 
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Đăng nhập thất bại. Vui lòng thử lại!";
      throw new Error(message);
    }
  },

  register: async (username, email, password) => {
    try {
      const data = await httpRequest.post('/auth/register', {
        username,
        email,
        password,
      });
      const body = data.data;
      return body;

    } catch (error) {
      throw error;
    }
  },

  active: async ({ email, otp }) => {
    try {
      const data = await httpRequest.post('/auth/activate', { email, otp });
      const body = data.data;
      return body;
    } catch (error) {
      throw error;
    }
  },

  resend: async (email) => {
    try {
      const data = await httpRequest.post('/otp/resend', { email });
      return data;
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const data = await httpRequest.post('/auth/forgot-password', { email });
      return data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const refreshToken = tokenService.getRefreshToken();

      await httpRequest.post('/auth/logout', { refreshToken });
      
      tokenService.clearTokens();
    } catch (error) {

      tokenService.clearTokens();
      throw error;
    }
  },

  refreshToken: async () => {
    try {
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token availble');
      }
      const data = await httpRequest.post('/auth/refresh-token', { refreshToken });
      const {accessToken, refreshToken: newRefreshToken, expiresIn} = data.data;
      console.log('refreshed token:',data.data);
      tokenService.saveTokens({
        accessToken,
        refreshToken: newRefreshToken || refreshToken,
        expiresIn
      });
      return accessToken;
    } catch (error) {
      tokenService.clearTokens();
      throw error;
    }
  },

};

export default authApi;