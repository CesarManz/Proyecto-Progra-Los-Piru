const axios = require('axios');

const API_KEY = 'ecc68a458ae172200dcc2cf155918a3b';

const obtenerPronostico = async (req, res) => {
  const { ciudad } = req.params;
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;
    const { data } = await axios.get(url);
    res.json(data);
  } catch (error) {
    console.error('❌ Error al obtener pronóstico:', error.message);
    res.status(500).json({ error: 'No se pudo obtener el pronóstico' });
  }
};

module.exports = { obtenerPronostico };
