const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_KEY = "ecc68a458ae172200dcc2cf155918a3b";

router.get("/pronostico", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "Faltan coordenadas" });

  try {
    const response = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
        lang: "es"
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error("❌ Error al obtener pronóstico:", err.message);
    res.status(500).json({ error: "Error al obtener pronóstico" });
  }
});

module.exports = router;
