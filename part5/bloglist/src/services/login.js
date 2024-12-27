import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${baseURL}/login`, {
      username,
      password,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getMyProfile = async (token) => {
  try {
    const { data } = await axios.get(`${baseURL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default login;
