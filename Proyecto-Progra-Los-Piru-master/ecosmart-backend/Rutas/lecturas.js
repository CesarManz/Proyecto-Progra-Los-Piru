const express = require('express');
const router = express.Router();
const Lectura = require('../modelos/Lectura');
const Parcela = require('../modelos/Parcela');

// ✅ Obtener las últimas 50 lecturas (para monitoreo en tiempo real)
router.get('/', async (req, res) => {
  try {
    const lecturas = await Lectura.find().sort({ fecha: -1 }).limit(50);
    res.json(lecturas);
  } catch (err) {
    console.error("❌ Error al obtener lecturas:", err.message);
    res.status(500).json({ mensaje: 'Error al obtener lecturas' });
  }
});
// ✅ Obtener últimas lecturas por ID de parcela
router.get('/:id', async (req, res) => {
  try {
    const lecturas = await Lectura.find({ parcela: req.params.id })
      .sort({ fecha: -1 })
      .limit(5);
    res.json(lecturas);
  } catch (err) {
    console.error("❌ Error al obtener lecturas por ID:", err.message);
    res.status(500).json({ mensaje: 'Error al obtener lecturas' });
  }
});

// ✅ Obtener historial completo por nombre de parcela
router.get('/historial/nombre/:nombre', async (req, res) => {
  try {
    const parcela = await Parcela.findOne({ nombre: req.params.nombre });
    if (!parcela) return res.status(404).json([]);

    const lecturas = await Lectura.find({ parcela: parcela._id }).sort({ fecha: -1 });
    res.json(lecturas);
  } catch (err) {
    console.error("❌ Error al obtener historial por nombre:", err.message);
    res.status(500).json([]);
  }
});

module.exports = router;
