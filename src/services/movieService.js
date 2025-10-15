import axiosInstance from "../api/axiosInstance";

export const getMovies = async () => {
  return await axiosInstance.get("/movies");
};

export const getMovieDetail = async (id) => {
  return await axiosInstance.get(`/movies/${id}`);
};
