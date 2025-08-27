import React from 'react';
import { ForecastDay } from '../types';
import { getWeatherIcon } from '../utils/weatherUtils';

interface ForecastCardProps {
  forecast: ForecastDay[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  return (
    <div className="w-full max-w-4xl mx-auto animate-slideUp">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div
            key={day.date}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:bg-white/15 hover:scale-105 animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-center">
              <h4 className="text-white font-semibold mb-2">{day.day}</h4>
              <div className="text-3xl mb-3 transform transition-transform hover:scale-110">
                {getWeatherIcon(day.condition)}
              </div>
              <div className="text-white mb-2">
                <span className="font-bold text-lg">{day.high}°</span>
                <span className="text-white/60 ml-2">{day.low}°</span>
              </div>
              <p className="text-white/70 text-sm capitalize leading-tight">
                {day.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;