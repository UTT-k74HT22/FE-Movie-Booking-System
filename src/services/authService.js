import authApi from "../api/authApi";

export const login = async (data) => {
  return await authApi.login(data);
};

export const register = async (data) => {
  return await authApi.register(data);
};

export const active = async (data) => {
  return await authApi.active(data);
};
