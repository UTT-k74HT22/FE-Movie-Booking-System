const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const TOKEN_EXPIRY_KEY = 'token_expiry';

export const tokenService = {
    // lưu token
    setAccessToken(accessToken) {
        if (!accessToken === null || accessToken === undefined ) return;
        localStorage.setItem(ACCESS_KEY, accessToken);
    },

    //lấy access token
    getAccessToken() {
        return localStorage.getItem(ACCESS_KEY);
    },

    //lưu refresh token
    setRefreshToken(refreshToken) {
        if (!refreshToken === null || refreshToken === undefined ) return;
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
    isTokenExpired() {
        const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
        if (!expiry) return true;

        //kiểm tra trước 5 phút đẻ kịp refresh
        return Date.now() >= (parseInt(expiry) - 5 * 60 * 1000);
    },

    //xóa tất cả token sau khi logout
    clearTokens() {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
    },

    //lưu tất cả toke sau khi login
    saveTokens( { accessToken, refreshToken, expiresIn}) {
        this.setAccessToken(accessToken),
        this.setRefreshToken(refreshToken);

        //expiesIn = số giây, chuyển sang milliseconds
        const expiryTime = Date.now() + (expiresIn * 1000);
        this.setTokenExpiry(expiryTime);
    }
};