export const getWeatherGradient = (condition: string): string => {
  switch (condition.toLowerCase()) {
    case 'clear':
    case 'sunny':
      return 'from-yellow-400 via-orange-400 to-pink-400';
    case 'clouds':
    case 'cloudy':
      return 'from-gray-400 via-blue-400 to-gray-600';
    case 'rain':
    case 'drizzle':
      return 'from-blue-600 via-purple-600 to-indigo-700';
    case 'thunderstorm':
      return 'from-gray-800 via-purple-800 to-black';
    case 'snow':
      return 'from-blue-200 via-white to-blue-300';
    case 'mist':
    case 'fog':
      return 'from-gray-300 via-gray-400 to-gray-500';
    default:
      return 'from-blue-400 via-purple-500 to-indigo-600';
  }
};

export const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'clear':
    case 'sunny':
      return '☀️';
    case 'clouds':
    case 'cloudy':
      return '☁️';
    case 'rain':
    case 'drizzle':
      return '🌧️';
    case 'thunderstorm':
      return '⛈️';
    case 'snow':
      return '❄️';
    case 'mist':
    case 'fog':
      return '🌫️';
    default:
      return '🌤️';
  }
};

export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000, // 5 minutes
    });
  });
};