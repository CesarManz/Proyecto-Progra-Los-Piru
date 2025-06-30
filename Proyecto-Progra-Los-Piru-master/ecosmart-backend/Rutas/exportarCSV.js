const express = require('express');
const router = express.Router();
const Lectura = require('../modelos/Lectura');
const Parcela = require('../modelos/Parcela');
const { Parser } = require('json2csv');

router.get('/', async (req, res) => {
  const nombre = req.query.nombre;
  if (!nombre) return res.status(400).json({ error: 'Nombre de parcela requerido' });

  try {
    const parcela = await Parcela.findOne({ nombre });
    if (!parcela) return res.status(404).json({ error: 'Parcela no encontrada' });

    const lecturas = await Lectura.find({ parcela: parcela._id }).sort({ fecha: -1 });
    if (!lecturas.length) return res.status(404).json({ error: 'No hay lecturas' });

    const parser = new Parser();
    const csv = parser.parse(lecturas.map(l => l.toObject()));
    
    res.header('Content-Type', 'text/csv');
    res.attachment(`${nombre}.csv`);
    res.send(csv);
  } catch (err) {
    console.error("❌ Error al exportar CSV:", err.message);
    res.status(500).json({ error: 'Error interno' });
  }
});

module.exports = router;
