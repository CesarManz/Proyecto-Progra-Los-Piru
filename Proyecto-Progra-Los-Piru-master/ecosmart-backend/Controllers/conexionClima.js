const axios = require('axios');
const Clima = require('../modelos/modeloClima'); // Asegúrate de que la ruta sea correcta

const API_KEY = 'ecc68a458ae172200dcc2cf155918a3b'; // reemplaza con tu clave real

const ObtenerClima = async (req, res) => {
  const { ciudad } = req.params;
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: ciudad,
        appid: API_KEY,
        units: 'metric',
        lang: 'es'
      }
    });

    const datos = {
      ciudad,
      descripcion: response.data.weather[0].description,
      temperatura: response.data.main.temp,
      humedad: response.data.main.humidity
    };

    await Clima.create(datos);
    res.status(200).json(datos);
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: 'No se pudo obtener el clima' });
  }
};

const ObtenerHistorialClima = async (req, res) => {
  try {
    const registros = await Clima.find().sort({ fecha: -1 });
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial' });
  }
};

module.exports = { ObtenerClima, ObtenerHistorialClima };
