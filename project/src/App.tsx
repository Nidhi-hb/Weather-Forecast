import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { WeatherData } from './types';
import { fetchWeatherData, fetchWeatherByCoords } from './utils/weatherApi';
import { getWeatherGradient, getCurrentPosition } from './utils/weatherUtils';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const loadWeatherData = async (city?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      let weatherData: WeatherData;
      
      if (city) {
        weatherData = await fetchWeatherData(city);
      } else {
        const position = await getCurrentPosition();
        weatherData = await fetchWeatherByCoords(
          position.coords.latitude,
          position.coords.longitude
        );
      }
      
      setWeather(weatherData);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error loading weather data:', err);
      if (err instanceof Error) {
        if (err.message.includes('not found')) {
          setError('City not found. Please check the spelling and try again.');
        } else if (err.message.includes('Geolocation')) {
          setError('Unable to access your location. Please search for a city instead.');
        } else if (err.message.includes('API')) {
          setError('Please add your OpenWeatherMap API key to use this app.');
        } else {
          setError('Unable to load weather data. Please check your connection and try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city: string) => {
    loadWeatherData(city);
  };

  const handleLocationRequest = () => {
    loadWeatherData();
  };

  const handleRefresh = () => {
    if (weather) {
      loadWeatherData(weather.location.name);
    } else {
      loadWeatherData();
    }
  };

  // Auto-refresh every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (weather && !loading) {
        handleRefresh();
      }
    }, 600000); // 10 minutes

    return () => clearInterval(interval);
  }, [weather, loading]);

  // Initial load
  useEffect(() => {
    loadWeatherData();
  }, []);

  const backgroundGradient = weather
    ? getWeatherGradient(weather.current.condition)
    : 'from-blue-400 via-purple-500 to-indigo-600';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} transition-all duration-1000 ease-in-out`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">
            Weather App
          </h1>
          <p className="text-white/80 text-lg animate-slideUp">
            Beautiful weather forecasts with real-time updates
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          onLocationRequest={handleLocationRequest}
          isLoading={loading}
        />

        {/* Refresh Button and Last Update */}
        {weather && (
          <div className="flex items-center justify-center space-x-4 mb-8">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            {lastUpdate && (
              <p className="text-white/60 text-sm">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            )}
          </div>
        )}

        {/* Main Content */}
        {loading && !weather && <LoadingSpinner />}
        
        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRefresh} />
        )}
        
        {weather && !loading && (
          <div className="space-y-8">
            <WeatherCard weather={weather} />
            <ForecastCard forecast={weather.forecast} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;