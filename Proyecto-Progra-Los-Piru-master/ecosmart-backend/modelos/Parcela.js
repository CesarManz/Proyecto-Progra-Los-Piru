const mongoose = require('mongoose');

const parcelaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  puntos: [
    {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  ],
  sensores: [String],
  cultivos: [String],
  creada: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Parcela', parcelaSchema);
