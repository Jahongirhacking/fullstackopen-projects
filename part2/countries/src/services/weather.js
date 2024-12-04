import axios from "axios";

export const getWeather = async ([lat, lon]) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    return res.data;
};