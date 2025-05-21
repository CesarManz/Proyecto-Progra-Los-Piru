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

// Obtener una parcela por ID
router.get('/:id', async (req, res) => {
  try {
    const parcela = await Parcela.findById(req.params.id);
    if (!parcela) return res.status(404).json({ mensaje: 'Parcela no encontrada' });
    res.json(parcela);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la parcela' });
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

// Eliminar parcela
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

// ✅ NUEVA RUTA: Editar parcela
router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Parcela.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) {
      return res.status(404).json({ mensaje: 'Parcela no encontrada' });
    }
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la parcela' });
  }
});

module.exports = router;
