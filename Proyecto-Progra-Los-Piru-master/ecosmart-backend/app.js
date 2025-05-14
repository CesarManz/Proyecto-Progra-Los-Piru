const express = require('express');
const cors = require('cors');
const conectarDB = require('./Controllers/conexion-basededatos');
const Usuario = require('./subirDatos/crear-usuario');
const verificarUsuario = require('./subirDatos/verificar-usuario');
const rutasClima = require('./Rutas/rutaClima');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// Conexión a la base de datos
conectarDB();

// Ruta base
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

// Login de usuario
app.post('/api/login', verificarUsuario);

// Clima: obtener y guardar datos
app.use('/api', rutasClima); // <-- nuevo

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🌍 Servidor corriendo en http://localhost:${PORT}`);
});
// Pronósticos: obtener y guardar datos
const rutaPronosticos = require('./Rutas/rutaPronosticos');
app.use('/api', rutaPronosticos);

const climaActualRoute = require('./Rutas/ClimaActual');
app.use('/api', climaActualRoute);

const rutaSensores = require('./Rutas/sensores');
app.use('/api', rutaSensores);
