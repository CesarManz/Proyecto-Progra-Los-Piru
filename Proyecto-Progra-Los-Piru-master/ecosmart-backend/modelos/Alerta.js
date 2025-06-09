const mongoose = require('mongoose');

const alertaSchema = new mongoose.Schema({
  parcela: { type: mongoose.Schema.Types.ObjectId, ref: 'Parcela' },
  sensor: String,
  tipo: String,
  umbralMinimo: Number,
  descripcionMinimo: String,
  umbralMaximo: Number,
  descripcionMaximo: String,
  correo: String,
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: false }
});

module.exports = mongoose.model('Alerta', alertaSchema);
