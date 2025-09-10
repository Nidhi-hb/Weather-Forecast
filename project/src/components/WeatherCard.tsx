import React from 'react';
import { WeatherData } from '../types/weather';
import { getWeatherGradient, getWeatherIcon, formatDate, kelvinToCelsius } from '../utils/weatherUtils';
import { Droplets, Wind, Eye, Thermometer } from 'lucide-react';

interface WeatherCardProps {
  weatherData: WeatherData[];
  isToday?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, isToday = false }) => {
  // Get the main weather data for the day (usually midday forecast)
  const mainWeather = weatherData[Math.floor(weatherData.length / 2)] || weatherData[0];
  const weather = mainWeather.weather[0];
  const temp = Math.round(mainWeather.main.temp);
  const minTemp = Math.min(...weatherData.map(w => w.main.temp_min));
  const maxTemp = Math.max(...weatherData.map(w => w.main.temp_max));

  const gradientClass = getWeatherGradient(weather.main);
  const icon = getWeatherIcon(weather.main);

  return (
    <div className={`
      relative overflow-hidden rounded-2xl p-6 shadow-2xl backdrop-blur-sm
      bg-gradient-to-br ${gradientClass}
      transform transition-all duration-500 hover:scale-105 hover:shadow-3xl
      cursor-pointer group
      ${isToday ? 'ring-4 ring-white ring-opacity-50' : ''}
    `}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-2 right-2 w-12 h-12 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 bg-white rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Date and Icon */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-white font-semibold text-lg">
              {isToday ? 'Today' : formatDate(mainWeather.dt_txt)}
            </h3>
            <p className="text-white text-opacity-80 text-sm capitalize">
              {weather.description}
            </p>
          </div>
          <div className="text-4xl transform transition-transform group-hover:scale-110 group-hover:rotate-12">
            {icon}
          </div>
        </div>

        {/* Temperature */}
        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-5xl font-bold text-white">
              {temp}°
            </span>
            <span className="text-white text-opacity-70 ml-2">C</span>
          </div>
          <div className="flex items-center text-white text-opacity-80 text-sm mt-1">
            <span>H: {Math.round(maxTemp)}°</span>
            <span className="mx-2">•</span>
            <span>L: {Math.round(minTemp)}°</span>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 text-white text-opacity-80">
          <div className="flex items-center space-x-2">
            <Droplets size={16} />
            <span className="text-sm">{mainWeather.main.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind size={16} />
            <span className="text-sm">{Math.round(mainWeather.wind.speed)} m/s</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye size={16} />
            <span className="text-sm">{mainWeather.clouds.all}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Thermometer size={16} />
            <span className="text-sm">{Math.round(mainWeather.main.feels_like)}°</span>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </div>
  );
};

export default WeatherCard;