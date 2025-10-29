import React, { useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  const fetchWeather = async (cityName) => {
    setCity(cityName);

    try {
      // Fetch city coordinates first using Open-Meteo geocoding API
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setWeather({ error: "City not found" });
        return;
      }

      const { latitude, longitude } = geoData.results[0];

      // Fetch weather data using latitude and longitude
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather(weatherData.current_weather);
    } catch (error) {
      setWeather({ error: "Failed to fetch weather" });
    }
  };

  return (
    <div className="app">
      <h1>🌤 Weather Now</h1>
      <WeatherForm onSearch={fetchWeather} />
      <WeatherDisplay weather={weather} city={city} />
    </div>
  );
}

export default App;
