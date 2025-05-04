// Simulador de datos de sensores agrícolas
const simulateSensorData = () => {
    const now = new Date();
    return {
      timestamp: now.toISOString(),
      temperature: (25 + Math.sin(now.getHours() * 0.26) * 5).toFixed(1), // Fluctuación diaria
      humidity: (50 + Math.random() * 20).toFixed(1), // Humedad aleatoria entre 50-70%
      soilMoisture: (30 + Math.random() * 40).toFixed(1), // Humedad del suelo 30-70%
      ph: (6.5 + Math.random() * 0.6 - 0.3).toFixed(2) // pH entre 6.2-6.8
    };
  };
  
  // Controlador para obtener datos
  exports.getSensorData = (req, res) => {
    try {
      const sensorData = simulateSensorData();
      res.json({
        status: 'success',
        data: sensorData
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Error al obtener datos de sensores'
      });
    }
  };