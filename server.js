const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

//weather data API
app.get('/api/weather/:lat/:lon', async (req, res) => {
  const { lat, lon } = req.params;
  const apiKey = 'f6b27f4adcfa481155b65646b4ae6512';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint for currency conversion
app.get('/api/currency', async (req, res) => {
    const apiKey = 'd0c23b9b25de245a68aad32791ebeb74';
    const currencies = 'EUR,RUB,USD,KZT';
    const apiUrl = `http://apilayer.net/api/live?access_key=${apiKey}&currencies=${currencies}&format=1`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.success) {
        const rates = data.quotes;
        const usdToKzt = rates.USDKZT;
        const eurToKzt = rates.USDKZT / rates.USDEUR;
        const rubToKzt = rates.USDKZT / rates.USDRUB;
  
        res.json({ EUR: eurToKzt, RUB: rubToKzt, USD: usdToKzt });
      } else {
        throw new Error('Currency API error');
      }
    } catch (error) {
      console.error('Error fetching currency data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Getting data from NASA Open API
app.get('/api/nasa', async (req, res) => {
  const apiKey = 'YAPb8oTi4JBKdHqvRq1PihrWrgdpXSzkWkTaKBEI';
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching NASA data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  

// Send index.html for other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
