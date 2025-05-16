const mongoose = require('mongoose');

const lecturaSchema = new mongoose.Schema({
  parcela: { type: mongoose.Schema.Types.ObjectId, ref: 'Parcela' },
  tipo: String,
  valor: Number,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lectura', lecturaSchema);
