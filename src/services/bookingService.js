import axiosInstance from "../api/axiosInstance";

export const getBookings = async () => {
  return await axiosInstance.get("/bookings");
};

export const createBooking = async (data) => {
  return await axiosInstance.post("/bookings", data);
};
