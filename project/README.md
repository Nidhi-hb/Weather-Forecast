# Weather Forecast App

A beautiful, interactive weather forecast application built with React, TypeScript, and Tailwind CSS. Features stunning gradients, smooth animations, and 5-day weather predictions.

## Features

- 🌤️ **Beautiful UI**: Stunning gradients that change based on weather conditions
- 📱 **Responsive Design**: Works perfectly on all devices
- 🎨 **Smooth Animations**: Engaging micro-interactions and hover effects
- 🌍 **Location Support**: Search by city name or use your current location
- 📊 **5-Day Forecast**: Detailed weather predictions with daily cards
- 🔒 **Secure**: API key properly hidden using environment variables

## Weather Card Styles

- ☀️ **Sunny**: Beautiful sky blue gradients
- ☁️ **Cloudy**: Elegant grey gradients  
- 🌧️ **Rainy**: Dark grey gradients for stormy weather
- ❄️ **Snow**: Cool blue gradients
- 🌫️ **Mist/Fog**: Subtle grey gradients

## Setup Instructions

### 1. Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your OpenWeatherMap API key to the `.env` file:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

### 2. Get Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to API Keys section in your dashboard
4. Copy your API key and add it to the `.env` file

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

## Deployment to GitHub Pages

### 1. Install GitHub Pages Package

```bash
npm install --save-dev gh-pages
```

### 2. Update package.json

Add these scripts to your `package.json`:

```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. Deploy

```bash
npm run deploy
```

## Environment Variables for Deployment

### Vercel
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add `VITE_OPENWEATHER_API_KEY` with your API key

### Netlify
1. Go to your Netlify dashboard
2. Select your site
3. Go to Site settings > Environment variables
4. Add `VITE_OPENWEATHER_API_KEY` with your API key

### GitHub Pages with Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
      env:
        VITE_OPENWEATHER_API_KEY: ${{ secrets.OPENWEATHER_API_KEY }}
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

Then add your API key as a GitHub secret:
1. Go to your repo Settings > Secrets and variables > Actions
2. Add `OPENWEATHER_API_KEY` with your API key

## 🔒 Security Features

- ✅ API key stored in environment variables
- ✅ `.env` file in `.gitignore` 
- ✅ No API key exposure in client code
- ✅ Production-ready security setup

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **OpenWeatherMap API** - Accurate weather data
- **Vite** - Fast development and build tool

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.