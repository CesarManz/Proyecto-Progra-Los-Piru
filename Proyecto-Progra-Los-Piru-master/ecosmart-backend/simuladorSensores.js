const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const Parcela = require('./modelos/Parcela');
const Lectura = require('./modelos/Lectura');
const Alerta = require('./modelos/Alerta');
const AlertaActivada = require('./modelos/AlertaActivada');

// Conexión a MongoDB
mongoose.connect('mongodb+srv://xAshura3x:omWSvOUHLYUR0ttE@cluster0.vlf79yu.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    simularLecturas();
    setInterval(simularLecturas, 10000);
  })
  .catch(err => console.error("❌ Error de conexión:", err.message));

function generarValor(tipo) {
  switch (tipo.toLowerCase()) {
    case 'temperatura del suelo': return +(18 + Math.random() * 10).toFixed(1);
    case 'humedad del suelo': return +(50 + Math.random() * 20).toFixed(1);
    case 'ph': 
    case 'ph del suelo': return +(5.5 + Math.random() * 2).toFixed(2);
    case 'nivel de nutrientes': return Math.floor(200 + Math.random() * 200);
    default:
      console.warn(`⚠️ Sensor desconocido: '${tipo}' no será simulado.`);
      return null;
  }
}

function enviarCorreo(correo, parcela, tipo, valor) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "ecosmartoficial@gmail.com",
      pass: "mvut dcar rdpe zbnd"
    }
  });

  const mailOptions = {
    from: "ecosmartoficial@gmail.com",
    to: correo,
    subject: `Alerta: ${tipo} en ${parcela.nombre}`,
    text: `El valor de ${tipo} ha cambiado a ${valor} en la parcela ${parcela.nombre}.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.error("❌ Error al enviar correo:", error.message);
    console.log("✅ Correo enviado:", info.response);
  });
}

async function verificarYGuardarAlertas(parcela, tipo, valor) {
  const alertas = await Alerta.find({
  parcela: parcela._id,
  sensor: new RegExp("^" + tipo + "$", "i")  // Insensible a mayúsculas/minúsculas
});

  for (let alerta of alertas) {
    if (valor < alerta.umbralMinimo || valor > alerta.umbralMaximo) {
      const mensaje = valor < alerta.umbralMinimo ? alerta.descripcionMinimo : alerta.descripcionMaximo;

      // Guardar alerta activada
      const alertaActivada = new AlertaActivada({
        parcela: parcela._id,
        tipo,
        valor,
        mensaje
      });
      await alertaActivada.save();

      // Enviar correo al usuario
      if (alerta.correo) enviarCorreo(alerta.correo, parcela, tipo, valor);
    }
  }
}

async function simularLecturas() {
  try {
    const parcelas = await Parcela.find();
    for (const parcela of parcelas) {
      const tipos = ['temperatura del suelo', 'humedad del suelo', 'ph del suelo', 'nivel de nutrientes'];
      for (const tipo of tipos) {
        const valor = generarValor(tipo);
        if (valor === null) continue;

        const lectura = new Lectura({
          nombreParcela: parcela.nombre,
          tipo,
          valor,
          fecha: new Date()
        });

        await lectura.save();
        await verificarYGuardarAlertas(parcela, tipo, valor);
        console.log(`📡 Lectura registrada: ${tipo} = ${valor} en ${parcela.nombre}`);
      }
    }
  } catch (error) {
    console.error("❌ Error en simulación:", error.message);
  }
}
