const Parcela = require('../modelos/Parcela');

// Crear nueva parcela
exports.crearParcela = async (req, res) => {
  try {
    const { nombre, coordenadas, sensores, cultivos } = req.body;
    const nuevaParcela = await Parcela.create({ nombre, coordenadas, sensores, cultivos });
    res.status(201).json(nuevaParcela);
  } catch (err) {
    console.error('❌ Error al crear parcela:', err.message);
    res.status(500).json({ error: 'Error al crear parcela' });
  }
};


// Obtener todas las parcelas
exports.obtenerParcelas = async (req, res) => {
  try {
    const parcelas = await Parcela.find();
    res.json(parcelas);
  } catch (err) {
    console.error('❌ Error al obtener parcelas:', err.message);
    res.status(500).json({ error: 'Error al obtener parcelas' });
  }
};
