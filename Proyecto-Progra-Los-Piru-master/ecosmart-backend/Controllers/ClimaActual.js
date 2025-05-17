const express = require("express");
const axios = require("axios");
const router = express.Router();
const API_KEY = "ecc68a458ae172200dcc2cf155918a3b";
router.get("/:lat/:lon", async (req, res) => {
  const { lat, lon } = req.params;
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
    const resultado = {
      temperatura: data.main.temp,
      descripcion: data.weather[0].description,
      humedad: data.main.humidity,
      viento: data.wind.speed
    };

    res.json(resultado);
  } catch (error) {
    console.error("❌ Error al obtener clima actual:", error.message);
    res.status(500).json({ error: "Error al obtener clima" });
  }
});

module.exports = router;
