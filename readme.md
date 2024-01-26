This web application provides real-time weather data and geolocation mapping. It utilizes OpenWeatherAPI for weather information and integrates mapping functionality using Leaflet. Additionally, it includes currency conversion features using the CurrencyLayer API and displays images with descriptions from NASA's Open API.

Key Features
Weather Information: Shows real-time data including temperature, humidity, pressure, and more.
Geolocation and Mapping: Visual representation of cities based on latitude and longitude.
Currency Conversion: Converts EUR, RUB, and USD to KZT.
NASA Images: Displays pictures with descriptions from NASA's Open API.

Setup Instructions
Prerequisites
Node.js installed
An API key for OpenWeatherAPI
An API key for CurrencyLayer API
An API key for NASA's Open API

Installation Steps

Install dependencies:
npm install express path

Get your api keys and replace them in this project
OPENWEATHER_API_KEY
CURRENCYLAYER_API_KEY
NASA_API_KEY

Start the server at port 3000
node server.js

You can access website at http://localhost:3000/