const mongoose = require('mongoose');
const Parcela = require('./modelos/Parcela');
const Lectura = require('./modelos/Lectura');

// ✅ Conexión a MongoDB Atlas (cambia "test" si usas otra base como "ecoSmartDB")
mongoose.connect('mongodb+srv://xAshura3x:omWSvOUHLYUR0ttE@cluster0.vlf79yu.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err.message));

// 🔁 Función para generar valores simulados según tipo de sensor
function generarValor(tipo) {
  switch (tipo) {
    case 'temperatura': return +(20 + Math.random() * 10).toFixed(1);
    case 'humedad': return +(40 + Math.random() * 30).toFixed(1);
    case 'ph': return +(5.5 + Math.random() * 2).toFixed(2);
    case 'nitrógeno': return Math.floor(10 + Math.random() * 50);
    case 'potasio': return Math.floor(50 + Math.random() * 100);
    case 'vitaminaA': return Math.floor(10 + Math.random() * 30);
    case 'vitaminaC': return Math.floor(10 + Math.random() * 30);
    default: return +(10 + Math.random() * 20).toFixed(1);
  }
}

// 🕓 Intervalo: simular lecturas cada 10 segundos
setInterval(async () => {
  try {
    const parcelas = await Parcela.find();

    for (const p of parcelas) {
      for (const tipo of p.sensores) {
        const lectura = new Lectura({
          parcela: p._id,
          tipo,
          valor: generarValor(tipo),
          fecha: new Date()
        });
        await lectura.save();
      }
    }

    console.log('📡 Lecturas simuladas insertadas correctamente.');
  } catch (err) {
    console.error('❌ Error al simular lecturas:', err.message);
  }
}, 10000);
