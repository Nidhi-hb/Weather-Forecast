import { ForecastResponse, CurrentWeatherData } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getCurrentWeather = async (city: string): Promise<CurrentWeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather data not found for ${city}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getForecastWeather = async (city: string): Promise<ForecastResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Forecast data not found for ${city}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast weather:', error);
    throw error;
  }
};

export const getWeatherByCoordinates = async (lat: number, lon: number): Promise<CurrentWeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not found for current location');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw error;
  }
};

export const getForecastByCoordinates = async (lat: number, lon: number): Promise<ForecastResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Forecast data not found for current location');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast by coordinates:', error);
    throw error;
  }
};