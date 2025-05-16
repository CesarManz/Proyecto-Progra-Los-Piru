const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_KEY = "ecc68a458ae172200dcc2cf155918a3b";

router.get("/climaActual", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "Faltan coordenadas" });

  try {
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
        lang: "es"
      }
    });

    const data = response.data;
    res.json({
      temperatura: data.main.temp,
      descripcion: data.weather[0].description,
      icono: data.weather[0].icon,
      humedad: data.main.humidity,
      viento: data.wind.speed
    });
  } catch (err) {
    console.error("❌ Error al obtener clima actual:", err.message);
    res.status(500).json({ error: "Error al obtener clima" });
  }
});

module.exports = router;

