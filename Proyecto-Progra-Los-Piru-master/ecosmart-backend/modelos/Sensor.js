const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  sueloHumedad: Number,
  nitrogeno: Number,
  fosforo: Number,
  potasio: Number,
  vitaminaA: Number,
  vitaminaC: Number,
  phSuelo: Number,
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sensor', sensorSchema);
