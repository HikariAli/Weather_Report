const serverUrl = 'http://localhost:3000';

// Function to fetch weather data based on city coordinates from the server
function getWeatherData(lat, lon) {
  const apiUrl = `${serverUrl}/api/weather/${lat}/${lon}`;

  return fetch(apiUrl)
    .then(response => response.json())
    .catch(error => console.error('Error fetching weather data:', error));
}
  

// Function to initialize the map
function initMap(lat, lon) {
  const map = L.map('map').setView([lat, lon], 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  L.marker([lat, lon]).addTo(map)
    .bindPopup('City Location')
    .openPopup();
}

// Function to display weather information
function displayWeatherInfo(weatherData) {
  const weatherInfoElement = document.getElementById('weather-info');

  // Extract relevant information from the API response
  const { main, weather, coord, wind, sys, rain } = weatherData;
  const { temp, feels_like, humidity, pressure } = main;
  const { speed } = wind;

  // Display weather information
  weatherInfoElement.innerHTML = `
    <p>Temperature: ${temp} &#8451;</p>
    <p>Feels Like: ${feels_like} &#8451;</p>
    <p>Humidity: ${humidity}%</p>
    <p>Pressure: ${pressure} hPa</p>
    <p>Wind Speed: ${speed} m/s</p>
    <p>Country Code: ${sys.country}</p>
    <p>Rain Volume (last 3 hours): ${rain ? rain['3h'] : 0} mm</p>
  `;
}

// Get user's geolocation
navigator.geolocation.getCurrentPosition(position => {
  const { latitude, longitude } = position.coords;

  // Initialize the map with user's location
  initMap(latitude, longitude);

  // Fetch and display weather information for the user's location
  getWeatherData(latitude, longitude)
    .then(weatherData => displayWeatherInfo(weatherData));
}, error => {
  console.error('Error getting geolocation:', error);
});

function getCurrencyRates() {
    fetch('http://localhost:3000/api/currency')
      .then(response => response.json())
      .then(data => {
        const ratesDiv = document.getElementById('currencyRates');
        ratesDiv.innerHTML = `<p>EUR to KZT: ${data.EUR.toFixed(2)}</p>
                              <p>RUB to KZT: ${data.RUB.toFixed(2)}</p>
                              <p>USD to KZT: ${data.USD.toFixed(2)}</p>`;
      })
      .catch(error => console.error('Error fetching currency data:', error));
  }

document.getElementById('getCurrency').addEventListener('click', getCurrencyRates);  
  
function getNasaImages() {
  fetch('http://localhost:3000/api/nasa')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('nasaImageContainer');
      container.innerHTML = data.map(item => 
        `<div class="nasa-item">
          <img src="${item.url}" alt="${item.title}" class="nasa-image">
          <p>${item.title}</p>
          <p>${item.explanation}</p>
        </div>`
      ).join('');
    })
    .catch(error => console.error('Error fetching NASA images:', error));
}

document.getElementById('getNasaImages').addEventListener('click', getNasaImages);