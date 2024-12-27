import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const getAll = () => {
  const request = axios.get(`${baseUrl}/blogs`);
  return request.then((response) => response.data);
};

export default { getAll };
