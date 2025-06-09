const mongoose = require('mongoose');

const alertaActivadaSchema = new mongoose.Schema({
  parcela: { type: mongoose.Schema.Types.ObjectId, ref: 'Parcela' },
  tipo: String,
  valor: Number,
  fecha: { type: Date, default: Date.now },
  mensaje: String
});

module.exports = mongoose.model('AlertaActivada', alertaActivadaSchema);
