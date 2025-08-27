import React from 'react';
import { Eye, Wind, Droplets, Thermometer } from 'lucide-react';
import { WeatherData } from '../types';
import { getWeatherIcon } from '../utils/weatherUtils';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8 animate-fadeIn">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl transition-all duration-500 hover:bg-white/15">
        {/* Location */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            {weather.location.name}
          </h2>
          <p className="text-white/70">{weather.location.country}</p>
        </div>

        {/* Main Weather */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">
            {getWeatherIcon(weather.current.condition)}
          </div>
          <div className="text-6xl font-thin text-white mb-2">
            {weather.current.temperature}°
          </div>
          <p className="text-xl text-white/80 capitalize mb-2">
            {weather.current.description}
          </p>
          <p className="text-white/60">
            Feels like {weather.current.feelsLike}°C
          </p>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-2xl p-4 transition-all duration-300 hover:bg-white/10">
            <div className="flex items-center space-x-3">
              <Droplets className="w-5 h-5 text-blue-300" />
              <div>
                <p className="text-white/60 text-sm">Humidity</p>
                <p className="text-white font-semibold">{weather.current.humidity}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 transition-all duration-300 hover:bg-white/10">
            <div className="flex items-center space-x-3">
              <Wind className="w-5 h-5 text-green-300" />
              <div>
                <p className="text-white/60 text-sm">Wind</p>
                <p className="text-white font-semibold">{weather.current.windSpeed} km/h</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 transition-all duration-300 hover:bg-white/10">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-yellow-300" />
              <div>
                <p className="text-white/60 text-sm">Visibility</p>
                <p className="text-white font-semibold">{weather.current.visibility} km</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 transition-all duration-300 hover:bg-white/10">
            <div className="flex items-center space-x-3">
              <Thermometer className="w-5 h-5 text-red-300" />
              <div>
                <p className="text-white/60 text-sm">Feels Like</p>
                <p className="text-white font-semibold">{weather.current.feelsLike}°C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;