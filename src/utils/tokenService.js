import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const TOKEN_EXPIRY_KEY = 'token_expiry';

export const tokenService = {
    // lưu token
    setAccessToken(accessToken) {
        if (accessToken === null ) return;
        localStorage.setItem(ACCESS_KEY, accessToken);
    },

    //lấy access token
    getAccessToken() {
        return localStorage.getItem(ACCESS_KEY);
    },

    //lưu refresh token
    setRefreshToken(refreshToken) {
        if (!refreshToken ) return;
        localStorage.setItem(REFRESH_KEY, refreshToken)
    },

    //lấy refresh token
    getRefreshToken() {
        return localStorage.getItem(REFRESH_KEY)
    },

    //lưu thời gian hết hạn
    setTokenExpiry(expiryTime) {
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime)
    },

    //kiểm tra token đã hết hạn chưa
    isTokenExpired(seconds = 300) {
        const token = this.getAccessToken();
        if (!token) return true;

        const decode = jwtDecode(token);
        return dayjs.unix(decode.exp).diff(dayjs()) < seconds * 1000;
    },

    //xóa tất cả token sau khi logout
    clearTokens() {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
    },

    //lưu tất cả toke sau khi login
    saveTokens( { accessToken, refreshToken, expiresIn}) {
        console.log("saving token with expiresIn", expiresIn);
        this.setAccessToken(accessToken),
        this.setRefreshToken(refreshToken);

        //expiesIn = số giây, chuyển sang milliseconds
        try {
            const decode = jwtDecode(accessToken);
            const expiryTime = dayjs.unix(decode.exp).valueOf();
            this.setTokenExpiry(expiryTime);
        } catch (error) {
            console.error('Lỗi khi giải mã token để lấy thời gian hết hạn:', error);
            const expiryTime = dayjs().add(expiresIn, 'second').valueOf();
            this.setTokenExpiry(expiryTime);
            
        }
    }
};