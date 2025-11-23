import axiosInstance from "../api/axiosInstance";
export const getTheaters = async (params) => {
  try {
    const res =  await axiosInstance.get("/theaters", { params });
    return res.data.data;
    } catch (error) {
        throw error.response;
    }
};
