const express = require("express");
const router = express.Router();
const Alerta = require("../modelos/Alerta");

// Crear nueva alerta
router.post("/crear", async (req, res) => {
  try {
    const nuevaAlerta = new Alerta(req.body);
    await nuevaAlerta.save();
    res.status(201).json({ mensaje: "✅ Alerta creada correctamente", alerta: nuevaAlerta });
  } catch (error) {
    res.status(500).json({ mensaje: "❌ Error al crear alerta", error: error.message });
  }
});

// Obtener todas las alertas
router.get("/", async (req, res) => {
  try {
    const alertas = await Alerta.find().populate("parcela usuario");
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ mensaje: "❌ Error al obtener alertas", error: error.message });
  }
});

// Obtener una alerta por ID
router.get('/:id', async (req, res) => {
  try {
    const alerta = await Alerta.findById(req.params.id).populate('parcela');
    if (!alerta) return res.status(404).json({ mensaje: 'Alerta no encontrada' });
    res.json(alerta);
  } catch (err) {
    console.error("❌ Error al obtener alerta:", err);
    res.status(500).json({ mensaje: 'Error interno al obtener alerta' });
  }
});


// Eliminar alerta por ID
router.delete('/eliminar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Alerta.findByIdAndDelete(id);
    res.json({ mensaje: '✅ Alerta eliminada correctamente.' });
  } catch (err) {
    console.error("❌ Error al eliminar alerta:", err);
    res.status(500).json({ mensaje: 'Error al eliminar la alerta.' });
  }
});
// Editar alerta por ID
router.put("/editar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { umbralMinimo, descripcionMinimo, umbralMaximo, descripcionMaximo } = req.body;

    const alerta = await Alerta.findById(id);
    if (!alerta) return res.status(404).json({ mensaje: "Alerta no encontrada" });

    alerta.umbralMinimo = umbralMinimo;
    alerta.descripcionMinimo = descripcionMinimo;
    alerta.umbralMaximo = umbralMaximo;
    alerta.descripcionMaximo = descripcionMaximo;

    await alerta.save();
    res.json({ mensaje: "✅ Alerta actualizada correctamente", alerta });
  } catch (error) {
    console.error("❌ Error al editar alerta:", error);
    res.status(500).json({ mensaje: "Error al actualizar alerta", error: error.message });
  }
});


module.exports = router;
