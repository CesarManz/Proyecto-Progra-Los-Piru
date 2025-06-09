const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  TemperaturaDelSuelo: Number,
  HumedadDelSuelo: Number,
  nivelDeNutrientes: Number,
  phSuelo: Number,
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sensor', sensorSchema);
