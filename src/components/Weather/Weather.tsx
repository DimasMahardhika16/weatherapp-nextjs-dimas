"use client";

import { useEffect, useState } from "react";
import Search from "../Search/Search";
import styles from "./Weatherapp.module.css";

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
  };
  weather: { description: string }[];
  wind: {
    speed: number;
  };
}

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeatherData = async (city: string) => {
    if (!city) return;

    setLoading(true);
    setWeatherData(null);

    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await res.json();

      if (!res.ok) {
        console.error("API error:", data);
        return;
      }

      setWeatherData(data);
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData("Tokyo");
  }, []);

  const handleSearch = () => {
    if (search.trim()) {
      fetchWeatherData(search.trim());
    }
  };

  const getCurrentDate = () =>
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className={styles.app}>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />

      {loading ? (
        <div className={styles.loading}>Loading Data...</div>
      ) : weatherData ? (
        <div>
          <div className={styles.cityName}>
            <h2>
              {weatherData.name}, <span>{weatherData.sys.country}</span>
            </h2>
          </div>

          <div className={styles.date}>{getCurrentDate()}</div>

          <div className={styles.temp}>
            {Math.round(weatherData.main.temp)}°C
          </div>

          <p className={styles.description}>
            {weatherData.weather[0]?.description ?? "No description"}
          </p>

          <div className={styles.weatherInfo}>
            <div className={styles.column}>
              <p className={styles.wind}>{weatherData.wind.speed} m/s</p>
              <p>Wind Speed</p>
            </div>

            <div className={styles.column}>
              <p className={styles.humidity}>{weatherData.main.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.loading}>No data available</div>
      )}
    </div>
  );
}
