import React from "react";

function WeatherDisplay({ weather, city }) {
  if (!weather) {
    return <p className="message">Search for a city to see the weather 🌍</p>;
  }

  if (weather.error) { 
    return <p className="error">{weather.error}</p>;
  }

  return (
    <div className="weather-display">
      <h2>{city}</h2>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Windspeed: {weather.windspeed} km/h</p>
      <p>Weather Code: {weather.weathercode}</p>
      <p>Time: {weather.time}</p>
    </div>
  );
}

export default WeatherDisplay;
