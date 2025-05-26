
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    correo: { type: String, required: true },
    pregunta: { type: String, required: true },
    respuesta: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);
