const express = require('express');
const router = express.Router();
const Parcela = require('../modelos/Parcela');

// Obtener todas las parcelas
router.get('/', async (req, res) => {
  try {
    const parcelas = await Parcela.find();
    res.json(parcelas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener parcelas' });
  }
});

// Crear nueva parcela
router.post('/', async (req, res) => {
  try {
    const nueva = new Parcela(req.body);
    const guardada = await nueva.save();
    res.status(201).json(guardada);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear parcela' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const eliminada = await Parcela.findByIdAndDelete(req.params.id);
    if (!eliminada) {
      return res.status(404).json({ mensaje: 'Parcela no encontrada' });
    }
    res.json({ mensaje: 'Parcela eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar parcela' });
  }
});


module.exports = router;
