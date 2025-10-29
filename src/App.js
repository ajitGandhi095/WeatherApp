import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return alert("Please enter a city name");
    setLoading(true);
    try {
      // Step 1: Get latitude & longitude
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
      const geoResponse = await axios.get(geoUrl);
      const location = geoResponse.data.results?.[0];
      if (!location) {
        alert("City not found");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name } = location;

      // Step 2: Fetch current weather
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
      const weatherResponse = await axios.get(weatherUrl);

      const weather = weatherResponse.data.current_weather;

      setWeatherData({
        city: name,
        data: {
          temperature: weather.temperature,
          windspeed: weather.windspeed,
          weathercode: weather.weathercode,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🌦 Open-Meteo Weather App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {loading && <p>Loading...</p>}
      {weatherData && !loading && (
        <WeatherCard city={weatherData.city} data={weatherData.data} />
      )}
    </div>
  );
}

export default App;
