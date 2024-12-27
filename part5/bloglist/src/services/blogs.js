import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const getAll = async () => {
  const { data } = await axios.get(`${baseUrl}/blogs`);
  return data;
};
