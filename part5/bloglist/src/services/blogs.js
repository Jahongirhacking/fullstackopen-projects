import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const getAll = async () => {
  const { data } = await axios.get(`${baseUrl}/blogs`);
  return data;
};

export const putLike = async (id) => {
  const { data } = await axios.put(`${baseUrl}/blogs/${id}/likes`);
  return data;
};
