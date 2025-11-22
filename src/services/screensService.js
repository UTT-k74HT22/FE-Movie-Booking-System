import axiosInstance from "../api/axiosInstance";
const SCREENS_API_URL = '/screens';

const screensApi = {
    /**
    * @param {number} pageNumber -Trang hiện tại (0-based)
    * @param {number} pageSize -Số mục trên mỗi trang
    * @return {Promise<object>} -Response từ API
     */
    getScreens: async (pageNumber = 0, pageSize = 10) => {
        try {
            const response = await axiosInstance.get(`${SCREENS_API_URL}?page=${pageNumber}&size=${pageSize}`);

            return response.data;
        } catch (error) {
            console.error("Failed to get screen:",error.response||error.message);
            throw error;
        }
    },
    /**
    * @param {object} screenData -Dữ liệu màn hình {năm,theaterId,...}
    * @return {Promise<object>} -Response từ API
     */
    createScreen: async (screenData) => {
        try {
            const response = await axiosInstance.post(`${SCREENS_API_URL}`, screenData);
            return response.data;
        } catch (error) {
            console.error("Failed to create screen:",error.response||error.message);
            throw error;
        }
    },
    /**
    * @param {string} screenId -ID của màn hình cần xóa
    * @return {Promise<object>} -Response từ API
     */
    deleteScreen: async (screenId) => {
        try {
            const response = await axiosInstance.delete(`${SCREENS_API_URL}/${screenId}`);
            return response.data;
        } catch (error) {
            console.error("Failed to delete screen:",error.response||error.message);
            throw error;
        }       
    },
}


