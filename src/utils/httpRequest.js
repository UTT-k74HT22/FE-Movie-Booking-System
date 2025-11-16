import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api';

const httpRequest = axios.create({
  baseURL: BASE_URL,
  headers: { 
    "content-Type": "application/json",
    Accept: "application/json"

  },
  withCredentials: true
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
}

export const post = async (path, data, options = {}) => {
    const response = await httpRequest.post(path, data, options);
    return response.data;
}

export const put = async (path, data, options = {}) => {
    const response = await httpRequest.put(path, data, options);
    return response.data;
}

export const del = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
}

export default httpRequest;