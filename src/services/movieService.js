import axiosInstance from "../api/axiosInstance";

export const getMovies = async (params) => {
  try {
    const res = await axiosInstance.get("/movies", { params });
    return res.data.data;
  } catch (error) {
    throw error.response;
  }
};

export const addMovies = async (data) => {
  try {
    return await axiosInstance.post("/movies", data);
  } catch (error) {
    console.error(error.response?.data);
    throw error.response;
  }
};

export const deleteMovie = async (movieId, movieStatus) => {
  try {
    const res = await axiosInstance.delete(`/movies/${movieId}`, {
      params: { movieStatus },
    });
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

export const updateMovies = async (moviesId, data) => {
  try {
    return await axiosInstance.patch(`/movies/${moviesId}`, data);
  } catch (error) {
    console.error(error.response?.data);
    throw error.response;
  }
};
