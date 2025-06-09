const express = require("express");
const router = express.Router();
const AlertaActivada = require("../modelos/AlertaActivada");

// GET /api/activadas
router.get("/", async (req, res) => {
  try {
    const historial = await AlertaActivada.find().populate("parcela");
    res.json(historial);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener historial", error: error.message });
  }
});
router.delete('/eliminar/:id', async (req, res) => {
  try {
    await AlertaActivada.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "✅ Alerta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "❌ Error al eliminar alerta", error: error.message });
  }
});


module.exports = router;
