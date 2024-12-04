import {useEffect, useState} from "react";
import {getWeather} from "../services/weather.js";

const Weather = ({country}) => {
    const [weatherData, setWeatherData] = useState(null);
    // const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        (async () => {
            const res = await getWeather(country.latlng);
            setWeatherData(res);
        })()
    }, [])

    if(!weatherData) return null;

    return (
        <div className="weather">
            <h2>Weather in {country.capital[0]}</h2>
            <p>temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celcius</p>
            <p>{weatherData.weather[0].main}, {weatherData.weather[0].description}</p>
            <p>wind {weatherData.wind.speed} m/s</p>
        </div>
    )
}
export default Weather