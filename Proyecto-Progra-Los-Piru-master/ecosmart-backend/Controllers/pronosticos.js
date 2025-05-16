const axios = require('axios');

// Tu API Key
const API_KEY = 'ecc68a458ae172200dcc2cf155918a3b';

const obtenerPronostico = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Faltan coordenadas' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`;
    const { data } = await axios.get(url);
    res.json(data);
  } catch (error) {
    console.error('❌ Error al obtener pronóstico:', error.message);
    res.status(500).json({ error: 'No se pudo obtener el pronóstico' });
  }
};

module.exports = { obtenerPronostico };
