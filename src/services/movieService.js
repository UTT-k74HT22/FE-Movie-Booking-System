import { data } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export const getMovies = async () => {
  return await axiosInstance.get("/movies");
};

export const addMovies = async (data) => {
  try {
    return await axiosInstance.post("/movies", data);
  } catch (error) {
    throw error.response;
  }
};

export const getMovieDetail = async (id) => {
  return await axiosInstance.get(`/movies/${id}`);
};
