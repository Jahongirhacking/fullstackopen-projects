import axios from "axios";
import { getLocalStorage, localStorageNames } from "../utils/storage.js";

const baseUrl = import.meta.env.VITE_API_URL;

export const getAll = async () => {
  const { data } = await axios.get(`${baseUrl}/blogs`);
  return data;
};

export const putLike = async (id) => {
  const { data } = await axios.put(`${baseUrl}/blogs/${id}/likes`);
  return data;
};

export const removeBlog = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${getLocalStorage(localStorageNames.token)}`,
    },
  });
  return data;
};
