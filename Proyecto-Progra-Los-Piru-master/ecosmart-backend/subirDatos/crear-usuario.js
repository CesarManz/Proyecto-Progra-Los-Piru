const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  },
  trabajo: {
    type: String,
    required: true,
    enum: ['agronomo', 'tecnico', 'agricultor']
  },
    fotoPerfil: {
    type: String,
    default: ''
  }
});

// 🔐 Encriptar la contraseña antes de guardar
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  try {
    this.contraseña = await bcrypt.hash(this.contraseña, 10);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
