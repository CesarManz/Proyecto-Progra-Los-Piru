const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: String,
    codigo: Number,
    cantidad: Number,
    tipo: String // "semilla" o "fertilizante"
});

module.exports = mongoose.model('Producto', productoSchema);
