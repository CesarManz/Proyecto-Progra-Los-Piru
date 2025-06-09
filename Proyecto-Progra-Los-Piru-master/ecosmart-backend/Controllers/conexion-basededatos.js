const mongoose = require('mongoose');

// ✅ Agrega el nombre de tu base de datos aquí
const uri = "mongodb+srv://xAshura3x:omWSvOUHLYUR0ttE@cluster0.vlf79yu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const conectarDB = async () => {
  try {
    await mongoose.connect(uri); // opciones innecesarias desde mongoose 6+
    console.log('✅ Conectado a MongoDB correctamente');
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;
