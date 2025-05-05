const express = require('express');
const cors = require('cors');
const conectarDB = require('./conexion-basededatos');
const Usuario = require('./autenticacion-usuario/crear-usuario');
const verificarUsuario = require('./autenticacion-usuario/verificar-usuario');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

conectarDB();

app.get('/', (req, res) => {
  res.send('Servidor funcionando y conectado a MongoDB Atlas');
});

// Registro de usuarios
app.post('/api/usuarios', async (req, res) => {
  try {
    const { nombre, correo, contraseña, trabajo } = req.body;

    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const nuevoUsuario = new Usuario({ nombre, correo, contraseña, trabajo });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear usuario' });
  }
});

// Login de usuario (verificación)
app.post('/api/login', verificarUsuario);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
