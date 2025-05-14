const Sensor = require('../modelos/Sensor');

exports.getSensorData = async (req, res) => {
  try {
    const sensores = await Sensor.find().sort({ fecha: -1 }).limit(10);
    res.json({
      status: 'success',
      data: sensores
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener datos de sensores'
    });
  }
};
