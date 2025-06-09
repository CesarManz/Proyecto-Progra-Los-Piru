const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 5001;

// Conexión a MongoDB
mongoose.connect('mongodb+srv://xAshura3x:omWSvOUHLYUR0ttE@cluster0.vlf79yu.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err.message));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Importar rutas
const rutaUsuarios = require('./Rutas/Usuarios');
const rutaParcelas = require('./Rutas/parcelas');
const rutaLecturas = require('./Rutas/lecturas');
const rutaClimaCiudad = require('./Rutas/rutaClima');         // Por ciudad
const rutaClimaCoord = require('./Rutas/ClimaActual');        // Por coordenadas
const rutaPronostico = require('./Rutas/rutaPronosticos');    // Pronóstico
const rutaChat = require('./Rutas/chat');
const lecturaController = require('./Controllers/lecturaController');
const alertaRoutes = require('./Controllers/alertaController');
const alertaActivadaRoutes = require('./Controllers/alertaActivadaController');







// Usar rutas
app.use('/api/usuarios', rutaUsuarios);
const rutaTareas = require('./Rutas/tareas');
const productosRuta = require('./Rutas/productos');

// Usar rutas
app.use('/api/usuarios', rutaUsuarios);
app.use('/api/usuarios', require('./Rutas/Usuarios'));
app.use('/api/parcelas', rutaParcelas);
app.use('/api/lecturas', rutaLecturas);
app.use('/api/clima', rutaClimaCiudad);      // ejemplo: /api/clima/santiago
app.use('/api', rutaClimaCoord);             // ejemplo: /api/climaActual?lat=...&lon=...
app.use('/api', rutaPronostico);             // ejemplo: /api/pronostico?lat=...&lon=...
app.use('/api/chat', rutaChat); // Ruta POST: /api/chat
app.get('/lecturas/parcela/:id', lecturaController.obtenerLecturasPorParcela); 
app.use('/api/alertas', alertaRoutes);
app.use('/api/activadas', alertaActivadaRoutes);




app.use('/api/tareas', rutaTareas);
app.use('/productos', productosRuta);
app.use('/api/productos', require('./Rutas/productos'));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
