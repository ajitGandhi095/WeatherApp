import React from "react";
import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiStrongWind,
} from "react-icons/wi";

const WeatherCard = ({ city, data }) => {
  const { temperature, windspeed, weathercode } = data;

  const getWeatherIcon = (code) => {
    if (code === 0) return <WiDaySunny size={90} color="#FFD700" />;
    if ([1, 2, 3].includes(code)) return <WiCloud size={90} color="#87CEEB" />;
    if ([51, 61, 80].includes(code)) return <WiRain size={90} color="#00BFFF" />;
    if ([71, 85].includes(code)) return <WiSnow size={90} color="#B0E0E6" />;
    return <WiStrongWind size={90} color="#808080" />;
  };

  return (
    <motion.div
      className="weather-card"
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      whileHover={{ scale: 1.05, rotate: 1 }}
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {city}
      </motion.h2>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        {getWeatherIcon(weathercode)}
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {temperature}°C
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        💨 {windspeed} km/h
      </motion.p>
    </motion.div>
  );
};

export default WeatherCard;
