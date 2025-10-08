// src/api/authApi.js
// import axios from 'axios';
import * as httpRequest from '../utils/httpRequest';

const authApi = {
  login: async (email, password) => {
    try {
      // gọi POST API login
      const data = await httpRequest.post('/auth/login', {
        email,
        password,
      });

      // hiển thị dữ liệu trả về từ backend
      console.log("Kết quả trả về từ API:", data);

      return data;
    } catch (error) {
      console.error("Lỗi khi gọi API login:", error);
    }
  }
};

export default authApi;