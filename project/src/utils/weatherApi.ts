import { WeatherData, ForecastDay, ApiWeatherResponse, ApiForecastResponse } from '../types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    // Fetch current weather
    const currentResponse = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!currentResponse.ok) {
      throw new Error('Weather data not found');
    }
    
    const currentData: ApiWeatherResponse = await currentResponse.json();
    
    // Fetch 5-day forecast
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    const forecastData: ApiForecastResponse = await forecastResponse.json();
    
    // Process forecast data (get one entry per day)
    const dailyForecasts: ForecastDay[] = [];
    const processedDates = new Set<string>();
    
    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toDateString();
      
      if (!processedDates.has(dateString) && dailyForecasts.length < 5) {
        processedDates.add(dateString);
        dailyForecasts.push({
          date: dateString,
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          high: Math.round(item.main.temp_max),
          low: Math.round(item.main.temp_min),
          condition: item.weather[0].main,
          description: item.weather[0].description,
          humidity: item.main.humidity,
          windSpeed: Math.round(item.wind.speed * 3.6), // Convert m/s to km/h
          icon: item.weather[0].icon,
        });
      }
    });
    
    return {
      location: {
        name: currentData.name,
        country: currentData.sys.country,
      },
      current: {
        temperature: Math.round(currentData.main.temp),
        condition: currentData.weather[0].main,
        description: currentData.weather[0].description,
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
        visibility: Math.round(currentData.visibility / 1000), // Convert to km
        feelsLike: Math.round(currentData.main.feels_like),
        icon: currentData.weather[0].icon,
      },
      forecast: dailyForecasts,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    // Fetch current weather
    const currentResponse = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!currentResponse.ok) {
      throw new Error('Weather data not found');
    }
    
    const currentData: ApiWeatherResponse = await currentResponse.json();
    
    // Fetch 5-day forecast
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    const forecastData: ApiForecastResponse = await forecastResponse.json();
    
    // Process forecast data (get one entry per day)
    const dailyForecasts: ForecastDay[] = [];
    const processedDates = new Set<string>();
    
    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateString = date.toDateString();
      
      if (!processedDates.has(dateString) && dailyForecasts.length < 5) {
        processedDates.add(dateString);
        dailyForecasts.push({
          date: dateString,
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          high: Math.round(item.main.temp_max),
          low: Math.round(item.main.temp_min),
          condition: item.weather[0].main,
          description: item.weather[0].description,
          humidity: item.main.humidity,
          windSpeed: Math.round(item.wind.speed * 3.6), // Convert m/s to km/h
          icon: item.weather[0].icon,
        });
      }
    });
    
    return {
      location: {
        name: currentData.name,
        country: currentData.sys.country,
      },
      current: {
        temperature: Math.round(currentData.main.temp),
        condition: currentData.weather[0].main,
        description: currentData.weather[0].description,
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
        visibility: Math.round(currentData.visibility / 1000), // Convert to km
        feelsLike: Math.round(currentData.main.feels_like),
        icon: currentData.weather[0].icon,
      },
      forecast: dailyForecasts,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};