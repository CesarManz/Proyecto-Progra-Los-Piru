const mongoose = require('mongoose');
const Sensor = require('./modelos/Sensor');

mongoose.connect('mongodb+srv://xAshura3x:omWSvOUHLYUR0ttE@cluster0.vlf79yu.mongodb.net/ecoSmartDB?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar:', err));

function generarLectura() {
  return {
    sueloHumedad: +(40 + Math.random() * 30).toFixed(1),
    nitrogeno: Math.floor(20 + Math.random() * 40),
    fosforo: Math.floor(15 + Math.random() * 25),
    potasio: Math.floor(100 + Math.random() * 150),
    vitaminaA: Math.floor(30 + Math.random() * 50),
    vitaminaC: Math.floor(20 + Math.random() * 50),
    phSuelo: +(5.8 + Math.random() * 1.2).toFixed(1)
  };
}

setInterval(async () => {
  const datos = generarLectura();
  try {
    const nuevo = await Sensor.create(datos);
    console.log('📡 Sensor guardado:', nuevo);
  } catch (err) {
    console.error('❌ Error al guardar:', err.message);
  }
}, 10000);
