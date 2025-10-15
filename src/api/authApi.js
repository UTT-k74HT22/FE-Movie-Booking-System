import * as httpRequest from '../utils/httpRequest'; 
/**
 * Auth API – quản lý các request liên quan đến xác thực (login, register, active, v.v.)
 * Mỗi method đều nhận 1 object request body để dễ mở rộng.
 * Trả về data "thật" từ backend hoặc throw error để caller xử lý.
 */
const authApi = {
    /**
     * Đăng nhập tài khoản
     * @param {{ email: string, password: string }} request
     */
    login: async (request) => {
        try {
            const response = await httpRequest.post('/auth/login', request);
            console.log('[AUTH API] Login success:', response);
            return response;
        } catch (error) {
            console.error('[AUTH API] Login error:', error);
            throw error;
        }
    },

    /**
     * Đăng ký tài khoản
     * @param {{ username: string, email: string, password: string }} request
     */
    register: async (request) => {
        try {
            const response = await httpRequest.post('/auth/register', request);
            console.log('[AUTH API] Register success:', response);
            return response;
        } catch (error) {
            console.error('[AUTH API] Register error:', error);
            throw error;
        }
    },

    /**
     * Kích hoạt tài khoản (qua email + OTP)
     * @param {{ email: string, otp: string }} request
     */
    active: async (request) => {
        try {
            const response = await httpRequest.post('/auth/activate', request);
            console.log('[AUTH API] Active success:', response);
            return response;
        } catch (error) {
            console.error('[AUTH API] Active error:', error);
            throw error;
        }
    },

    /**
     * Refresh token (chuẩn bị cho JWT flow)
     * @param {{ refreshToken: string }} request
     */
    refreshToken: async (request) => {
        try {
            const response = await httpRequest.post('/auth/refresh-token', request);
            console.log('[AUTH API] Refresh token success:', response);
            return response;
        } catch (error) {
            console.error('[AUTH API] Refresh token error:', error);
            throw error;
        }
    },

    /**
     * Logout user (nếu backend hỗ trợ API logout)
     */
    logout: async (request) => {
        try {
            const response = await httpRequest.post('/auth/logout');
            console.log('[AUTH API] Logout success:', response);
            return response;
        } catch (error) {
            console.error('[AUTH API] Logout error:', error);
            throw error;
        }
    },
};

export default authApi;