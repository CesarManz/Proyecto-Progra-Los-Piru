const mongoose = require('mongoose');

const climaSchema = new mongoose.Schema({
  ciudad: { type: String, required: true },
  descripcion: String,
  temperatura: Number,
  humedad: Number,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Clima', climaSchema);