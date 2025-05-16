const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Conexión a MongoDB
mongoose.connect('mongodb+srv://xAshura3x:omWSvOUHLYUR0ttE@cluster0.vlf79yu.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err.message));

// Importar y usar rutas
app.use('/api/parcelas', require('./Rutas/parcelas'));
app.use('/api/lecturas', require('./Rutas/lecturas'));
app.use('/api/clima', require('./Rutas/rutaClima')); // OpenWeatherMap por ciudad
app.use('/api', require('./Rutas/ClimaActual'));     // OpenWeatherMap por lat/lon
app.use('/api', require('./Rutas/rutaPronosticos')); // Pronóstico por lat/lon
app.use('/api/usuarios', require('./Rutas/Usuarios')); // Registro/login

/////
const climaActual = require('./Rutas/ClimaActual');
const pronostico = require('./Rutas/rutaPronosticos');
const parcelas = require('./Rutas/parcelas');
const lecturas = require('./Rutas/lecturas');
const usuarios = require('./Rutas/Usuarios');
/////
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
