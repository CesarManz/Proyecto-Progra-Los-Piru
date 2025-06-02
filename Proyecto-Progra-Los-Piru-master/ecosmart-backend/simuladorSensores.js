const mongoose = require('mongoose');
const Parcela = require('./modelos/Parcela');
const Lectura = require('./modelos/Lectura');

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://xAshura3x:omWSvOUHLYUR0ttE@cluster0.vlf79yu.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    simularLecturas(); // Llamar al inicio
    setInterval(simularLecturas, 10000); // Cada 10 segundos
  })
  .catch(err => console.error("❌ Error de conexión:", err.message));

// Función para generar un valor según el tipo de sensor
function generarValor(tipo) {
  switch (tipo.toLowerCase()) {
    case 'temperatura del suelo':
      return +(18 + Math.random() * 10).toFixed(1); // 18–28 °C

    case 'humedad del suelo':
      return +(50 + Math.random() * 20).toFixed(1); // 50–70 %

    case 'ph':
    case 'ph del suelo':
      return +(5.5 + Math.random() * 2).toFixed(2); // 5.5–7.5

    case 'nivel de nutrientes':
      return Math.floor(200 + Math.random() * 200); // 200–400 ppm

    case 'temperatura ambiente':
      console.warn("⚠️ 'Temperatura Ambiente' debe venir de OpenWeatherMap. No se simula.");
      return null;

    default:
      console.warn(`⚠️ Sensor desconocido: '${tipo}' no será simulado.`);
      return null;
  }
}

// Función principal que simula datos
async function simularLecturas() {
  try {
    const parcelas = await Parcela.find();

    for (const p of parcelas) {
      if (!p.sensores || !Array.isArray(p.sensores)) continue;

      for (const tipo of p.sensores) {
        const valor = generarValor(tipo);
        if (valor === null || valor === undefined) continue;

        const nuevaLectura = new Lectura({
          parcela: p._id,
          tipo,
          valor,
          fecha: new Date()
        });

        await nuevaLectura.save();
        console.log(`📡 ${tipo} en ${p.nombre}: ${valor}`);
      }
    }
  } catch (error) {
    console.error("❌ Error al simular lecturas:", error.message);
  }
}
