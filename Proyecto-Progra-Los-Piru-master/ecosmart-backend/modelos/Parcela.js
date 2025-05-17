const mongoose = require('mongoose');

const parcelaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  coordenadas: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
  sensores: [String],
  creada: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Parcela', parcelaSchema);
