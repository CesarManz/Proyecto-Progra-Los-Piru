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

// Editar alerta existente
router.put("/editar/:id", async (req, res) => {
  try {
    const alertaActualizada = await Alerta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ mensaje: "✅ Alerta actualizada", alerta: alertaActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: "❌ Error al actualizar alerta", error: error.message });
  }
});

// Eliminar alerta
router.delete("/eliminar/:id", async (req, res) => {
  try {
    await Alerta.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "✅ Alerta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "❌ Error al eliminar alerta", error: error.message });
  }
});

module.exports = router;
