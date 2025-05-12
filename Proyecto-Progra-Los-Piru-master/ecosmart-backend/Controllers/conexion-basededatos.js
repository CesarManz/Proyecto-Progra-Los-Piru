// conexion-basededatos.js
const mongoose = require('mongoose');
const uri = "mongodb+srv://xAshura3x:omWSvOUHLYUR0ttE@cluster0.vlf79yu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const conectarDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');

    console.log('Conexión exitosa a la base de datos.');
  } catch (error) {
    console.error('Error al conectar con MongoDB Atlas:', error);
    process.exit(1);
  }
};

module.exports = conectarDB;
