const access_token = 'access_token';
const refresh_token = 'refresh_token';
const token_expiry_key = 'token_expiry';

export const tokenService = {
    // lưu token
    setAccessToken(accessToken) {
        localStorage.setItem(access_token, accessToken);
    },

    //láy access token
    getAccessToken() {
        localStorage.setItem(access_token);
    },

    //lưu refresh token
    setRefreshToken(refreshToken) {
        localStorage.setItem(refresh_token, refreshToken)
    },

    //lấy refresh token
    getRefreshToken() {
        localStorage.getItem(refresh_token)
    },

    //lưu thời gian hết hạn
    setTokenExpiry(expiryTime) {
        localStorage.setItem(token_expiry_key, expiryTime)
    },

    //kiểm tra token đã hết hạn chưa
    isTokenExpired() {
        const expiry = localStorage.getItem(token_expiry_key);
        if (!expiry) return true;

        //kiểm tra trước 5 phút đẻ kịp refresh
        return Date.now() >= (parentInt(expiry) - 5 * 60 * 1000);
    },

    //xóa tất cả token sau khi logout
    clearTokens() {
        localStorage.removeItem(access_token);
        localStorage.removeItem(refresh_token);
        localStorage.removeItem(token_expiry_key);
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