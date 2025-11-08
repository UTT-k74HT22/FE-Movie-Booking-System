import axios from "axios";
import authApi from "../api/authApi";
import { tokenService } from "./tokenService";

const BASE_URL = 'http://localhost:8080/api';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TokenService.getAccessToken()}` },
});

axiosInstance.interceptors.request.use(async (config) => {
    let accessToken = tokenService.getAccessToken();
    if (!accessToken) return config;

    if (tokenService.isTokenExpired()) {
        accessToken = await authApi.refreshToken();
    }
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

export default axiosInstance;