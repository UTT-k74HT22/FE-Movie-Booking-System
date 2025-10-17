import * as httpRequest from '../utils/httpRequest';
import { tokenService } from '../utils/tokenService';

const authApi = {
  login: async (username, password) => {
    try {

      const data = await httpRequest.post('/auth/login', {
        username,
        password,
      });

      const { accessToken, refreshToken, expiresIn, user} = data;
      
      tokenService.saveTokens({
        accessToken,
        refreshToken,
        expiresIn: expiresIn || 3600
      });
      return data
      
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

      const { accessToken, refreshToken, expiresIn, user} = data;
      
      tokenService.saveTokens({
        accessToken,
        refreshToken,
        expiresIn: expiresIn || 3600
      });
      return {user}

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

      const data = await httpRequest.post('/auth/logout', { refreshToken });
      const {accessToken, refreshToken: newRefreshToken, expiresIn} = data;
      tokenService.saveTokens({
        accessToken,
        refreshToken: newRefreshToken || refreshToken,
        expiresIn: expiresIn ||3600
      });
      return accessToken;
    } catch (error) {

      tokenService.clearTokens();
      throw error;
    }
  },

};

export default authApi;