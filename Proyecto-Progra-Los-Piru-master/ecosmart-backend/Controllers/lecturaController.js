const mongoose = require('mongoose');
const Parcela = require('../modelos/Parcela');
const Lectura = require('../modelos/Lectura');

// Últimas lecturas por tipo para una parcela
exports.obtenerLecturasPorParcela = async (req, res) => {
  try {
    const parcelaId = new mongoose.Types.ObjectId(req.params.id);

    const lecturas = await Lectura.aggregate([
      { $match: { parcela: parcelaId } },
      { $sort: { fecha: -1 } },
      {
        $group: {
          _id: "$tipo",
          valor: { $first: "$valor" },
          fecha: { $first: "$fecha" }
        }
      }
    ]);

    res.json(lecturas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener lecturas por parcela' });
  }
};

// Historial completo de lecturas por ID
exports.obtenerLecturasHistorial = async (req, res) => {
  try {
    const parcelaId = new mongoose.Types.ObjectId(req.params.id);
    const lecturas = await Lectura.find({ parcela: parcelaId }).sort({ fecha: -1 });
    res.json(lecturas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener historial de lecturas' });
  }
};

// Historial completo por nombre (insensible a mayúsculas)
exports.obtenerLecturasPorNombre = async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const parcela = await Parcela.findOne({
      nombre: { $regex: new RegExp(`^${nombre}$`, 'i') }
    });

    if (!parcela) {
      return res.status(404).json({ error: 'Parcela no encontrada' });
    }

    const lecturas = await Lectura.find({ parcela: parcela._id }).sort({ fecha: -1 });
    res.json(lecturas);
  } catch (err) {
    console.error('❌ Error en búsqueda por nombre:', err.message);
    res.status(500).json({ error: 'Error al buscar lecturas por nombre' });
  }
};
