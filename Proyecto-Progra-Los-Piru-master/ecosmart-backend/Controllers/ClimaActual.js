const axios = require('axios');
const Clima = require('../modelos/modeloClima'); // Asegúrate de que la ruta sea correcta

const API_KEY = 'ecc68a458ae172200dcc2cf155918a3b'; // ← Reemplaza con tu API real

const guardarBusqueda = async (req, res) => {
  const { ciudad } = req.params;
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;
    const { data } = await axios.get(url);

    await Clima.create({
      ciudad: data.name,
      temperatura: data.main.temp,
      descripcion: data.weather[0].description
    });

    res.json(data);
  } catch (error) {
    console.error('❌ Error al obtener clima actual:', error.message);
    res.status(500).json({ error: 'No se pudo obtener ni guardar el clima' });
  }
};

module.exports = { guardarBusqueda };
