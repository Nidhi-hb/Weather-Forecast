import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import { getCurrentWeather, getForecastWeather, getWeatherByCoordinates, getForecastByCoordinates } from './services/weatherService';
import { CurrentWeatherData, ForecastResponse } from './types/weather';
import { groupForecastByDay, getWeatherGradient } from './utils/weatherUtils';
import { CloudRain, Sun, Cloud } from 'lucide-react';

function App() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('London');

  const fetchWeatherData = async (searchCity: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const [currentData, forecastData] = await Promise.all([
        getCurrentWeather(searchCity),
        getForecastWeather(searchCity)
      ]);
      
      setCurrentWeather(currentData);
      setForecast(forecastData);
      setCity(searchCity);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const [currentData, forecastData] = await Promise.all([
            getWeatherByCoordinates(latitude, longitude),
            getForecastByCoordinates(latitude, longitude)
          ]);
          
          setCurrentWeather(currentData);
          setForecast(forecastData);
          setCity(currentData.name);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const backgroundGradient = currentWeather 
    ? getWeatherGradient(currentWeather.weather[0].main, 'day')
    : 'from-blue-400 via-blue-500 to-blue-600';

  const forecastDays = forecast ? groupForecastByDay(forecast.list) : [];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 opacity-20">
          <Sun size={60} className="animate-spin-slow text-white" />
        </div>
        <div className="absolute top-32 right-20 opacity-15">
          <Cloud size={80} className="animate-float text-white" />
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-10">
          <CloudRain size={70} className="animate-bounce-slow text-white" />
        </div>
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            Weather Forecast
          </h1>
          <p className="text-xl text-white text-opacity-80 max-w-2xl mx-auto">
            Get accurate weather predictions with beautiful, animated forecasts
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar 
          onSearch={fetchWeatherData}
          onLocationRequest={fetchWeatherByLocation}
          loading={loading}
        />

        {/* Current Weather Info */}
        {currentWeather && !loading && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-white mb-2">
              {currentWeather.name}
            </h2>
            <p className="text-white text-opacity-80 text-lg">
              Currently {Math.round(currentWeather.main.temp)}°C, feels like {Math.round(currentWeather.main.feels_like)}°C
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-center mb-8">
            <div className="bg-red-500 bg-opacity-20 border border-red-300 rounded-lg p-4 text-white max-w-md mx-auto">
              <p>{error}</p>
              <button 
                onClick={() => fetchWeatherData('London')}
                className="mt-2 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
              >
                Try London
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Weather Cards */}
        {!loading && forecastDays.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {forecastDays.map((dayData, index) => (
              <WeatherCard
                key={index}
                weatherData={dayData}
                isToday={index === 0}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-white text-opacity-60">
          <p>Weather data provided by OpenWeatherMap</p>
          <p className="mt-2">Built with React, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}

export default App;