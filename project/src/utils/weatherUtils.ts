import { WeatherData } from '../types/weather';

export const getWeatherGradient = (weatherMain: string, timeOfDay: 'day' | 'night' = 'day'): string => {
  const gradients = {
    Clear: timeOfDay === 'day' 
      ? 'from-blue-400 via-blue-500 to-blue-600' 
      : 'from-indigo-900 via-purple-900 to-blue-900',
    Clouds: timeOfDay === 'day'
      ? 'from-gray-400 via-gray-500 to-gray-600'
      : 'from-gray-700 via-gray-800 to-gray-900',
    Rain: 'from-gray-600 via-gray-700 to-gray-800',
    Drizzle: 'from-gray-500 via-gray-600 to-gray-700',
    Thunderstorm: 'from-gray-800 via-gray-900 to-black',
    Snow: 'from-blue-200 via-blue-300 to-blue-400',
    Mist: 'from-gray-300 via-gray-400 to-gray-500',
    Smoke: 'from-gray-400 via-gray-500 to-gray-600',
    Haze: 'from-yellow-300 via-orange-300 to-orange-400',
    Fog: 'from-gray-300 via-gray-400 to-gray-500',
  };

  return gradients[weatherMain as keyof typeof gradients] || gradients.Clear;
};

export const getWeatherIcon = (weatherMain: string): string => {
  const icons = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Drizzle: '🌦️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Mist: '🌫️',
    Smoke: '🌫️',
    Haze: '🌤️',
    Fog: '🌫️',
  };

  return icons[weatherMain as keyof typeof icons] || '🌤️';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round(kelvin - 273.15);
};

export const kelvinToFahrenheit = (kelvin: number): number => {
  return Math.round((kelvin - 273.15) * 9/5 + 32);
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const groupForecastByDay = (forecast: WeatherData[]): WeatherData[][] => {
  const grouped: { [key: string]: WeatherData[] } = {};
  
  forecast.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  return Object.values(grouped).slice(0, 5);
};