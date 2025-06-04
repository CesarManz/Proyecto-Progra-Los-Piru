const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
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

let umbralMinimotemsuelo=18;
let umbralMaximotemsuelo=28;
let umbralMinimoHumedadsuelo=50;
let umbralMaximoHumedadsuelo=70;
let umbralMinimoPhsuelo=5.5;
let umbralMaximoPhsuelo=7.5;
let umbralMinimoNivelnutrientes=200;
let umbralMaximoNivelnutrientes=400;

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


    default:
      console.warn(`⚠️ Sensor desconocido: '${tipo}' no será simulado.`);
      return null;
  }
}
function alertasPorCorreo(parcela, tipo, valor) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "ecosmartoficial@gmail.com",
      pass: "mvut dcar rdpe zbnd"
    }
  });

  const mailOptions = {
    from: "ecosmartoficial@gmail.com",
    to: "cesarmanzano984@gmail.com",
    subject: `Alerta: ${tipo} en ${parcela.nombre}`,
    text: `El valor de ${tipo} ha cambiado a ${valor} en la parcela ${parcela.nombre}.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("❌ Error al enviar correo:", error.message);
    }
    console.log("✅ Correo enviado:", info.response);
  });
}

function VerificarUmbrales(parcela, tipo, valor) {
  switch (tipo.toLowerCase()) {
    case 'temperatura del suelo':
      if (valor < umbralMinimotemsuelo || valor > umbralMaximotemsuelo) {
        alertasPorCorreo(parcela, tipo, valor);
      }
      break;

    case 'humedad del suelo':
      if (valor < umbralMinimoHumedadsuelo || valor > umbralMaximoHumedadsuelo) {
        alertasPorCorreo(parcela, tipo, valor);
      }
      break;

    case 'ph':
    case 'ph del suelo':
      if (valor < umbralMinimoPhsuelo || valor > umbralMaximoPhsuelo) {
        alertasPorCorreo(parcela, tipo, valor);
      }
      break;

    case 'nivel de nutrientes':
      if (valor < umbralMinimoNivelnutrientes || valor > umbralMaximoNivelnutrientes) {
        alertasPorCorreo(parcela, tipo, valor);
      }
      break;

    default:
      console.warn(`⚠️ Sensor desconocido: '${tipo}' no se verificará.`);
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
        VerificarUmbrales(p, tipo, valor); // Verificar umbrales antes de guardar
        alertasPorCorreo(p, tipo, valor);

        await nuevaLectura.save();
        console.log(`📡 ${tipo} en ${p.nombre}: ${valor}`);
      }
    }
  } catch (error) {
    console.error("❌ Error al simular lecturas:", error.message);
  }
}
