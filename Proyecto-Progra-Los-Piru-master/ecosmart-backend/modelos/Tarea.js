const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    asignacion: { type: String, required: true },
    estado: { type: String, default: 'activo' },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
});

module.exports = mongoose.model('Tarea', tareaSchema);
