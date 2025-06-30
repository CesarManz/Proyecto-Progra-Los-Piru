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


// Editar parcela con actualización segura de sensores
router.put('/:id', async (req, res) => {
  try {
    const datos = {
      nombre: req.body.nombre,
      coordenadas: req.body.coordenadas || {},
      sensores: Array.isArray(req.body.sensores) ? req.body.sensores : [],
      cultivos: Array.isArray(req.body.cultivos) ? req.body.cultivos :[],
    };

    const actualizada = await Parcela.findByIdAndUpdate(req.params.id, datos, { new: true });

    if (!actualizada) {
      return res.status(404).json({ mensaje: 'Parcela no encontrada' });
    }

    const Sensor = require('../modelos/Sensor'); // Asegúrate de importar tu modelo
    await Sensor.deleteMany({
      parcelaId: req.params.id,
      tipo: { $nin: datos.sensores }
    });

    res.json(actualizada);
  } catch (error) {
    console.error("Error actualizando parcela:", error);
    res.status(500).json({ mensaje: 'Error al actualizar la parcela' });
  }
});



module.exports = router;
