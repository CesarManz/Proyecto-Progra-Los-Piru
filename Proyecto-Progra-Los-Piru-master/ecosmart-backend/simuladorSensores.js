const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const Parcela = require('./modelos/Parcela');
const Lectura = require('./modelos/Lectura');
const Alerta = require('./modelos/Alerta');
const AlertaActivada = require('./modelos/AlertaActivada');

// Umbrales generales por si no hay alertas configuradas
const umbrales = {
  'temperatura del suelo': { min: 18, max: 28 },
  'humedad del suelo': { min: 50, max: 70 },
  'ph': { min: 5.5, max: 7.5 },
  'ph del suelo': { min: 5.5, max: 7.5 },
  'nivel de nutrientes': { min: 200, max: 400 }
};

// Conexión a MongoDB
mongoose.connect('mongodb+srv://xAshura3x:omWSvOUHLYUR0ttE@cluster0.vlf79yu.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    simularLecturas();
    setInterval(simularLecturas, 10000);
  })
  .catch(err => console.error("❌ Error de conexión:", err.message));

// Función para generar datos simulados
function generarValor(tipo) {
  switch (tipo.toLowerCase()) {
    case 'temperatura del suelo': return +(18 + Math.random() * 10).toFixed(1);
    case 'humedad del suelo': return +(50 + Math.random() * 20).toFixed(1);
    case 'ph del suelo': return +(5.5 + Math.random() * 2).toFixed(2);
    case 'nivel de nutrientes': return Math.floor(200 + Math.random() * 200);
    default:
      console.warn(`⚠️ Tipo de sensor desconocido: '${tipo}'`);
      return null;
  }
}

// Envío de correos
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
    text: `El valor de ${tipo} es ${valor} en la parcela ${parcela.nombre}.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.error("❌ Error al enviar correo:", error.message);
    console.log("✅ Correo enviado:", info.response);
  });
}

// Verificar alertas personalizadas y guardar si se activan
async function verificarYGuardarAlertas(parcela, tipo, valor) {
  const alertas = await Alerta.find({
    parcela: parcela._id,
    sensor: new RegExp("^" + tipo + "$", "i")
  });

  for (let alerta of alertas) {
    if (valor < alerta.umbralMinimo || valor > alerta.umbralMaximo) {
      const mensaje = valor < alerta.umbralMinimo ? alerta.descripcionMinimo : alerta.descripcionMaximo;

      // NUEVO: evitar duplicados recientes (últimos 30 min)
      const hace30Min = new Date(Date.now() - 30 * 60 * 1000);
      const yaExiste = await AlertaActivada.findOne({
        parcela: parcela._id,
        tipo,
        fecha: { $gte: hace30Min }
      });

      if (yaExiste) {
        console.log(`⏳ Alerta reciente ya activada para ${tipo} en ${parcela.nombre}, no se repite.`);
        continue;
      }

      const alertaActivada = new AlertaActivada({
        parcela: parcela._id,
        tipo,
        valor,
        mensaje
      });

      await alertaActivada.save();

      if (alerta.correo) {
        enviarCorreo(alerta.correo, parcela, tipo, valor);
      }
    }
  }
}

// Simular lectura y verificar alertas
async function simularLecturas() {
  try {
    const parcelas = await Parcela.find();

    for (const parcela of parcelas) {
      if (!parcela.sensores || !Array.isArray(parcela.sensores)) continue;

      for (const tipo of parcela.sensores) {
        const valor = generarValor(tipo);
        if (valor == null) continue;

        const nuevaLectura = new Lectura({
          parcela: parcela._id,
          tipo,
          valor,
          fecha: new Date()
        });

        await nuevaLectura.save();
        await verificarYGuardarAlertas(parcela, tipo, valor);

        // Verificar umbrales generales
        const u = umbrales[tipo.toLowerCase()];
        if (u && (valor < u.min || valor > u.max)) {
          enviarCorreo("cesarmanzano984@gmail.com", parcela, tipo, valor);
        }

        console.log(`📡 ${tipo} en ${parcela.nombre}: ${valor}`);
      }
    }
  } catch (error) {
    console.error("❌ Error en simulación:", error.message);
  }
}
