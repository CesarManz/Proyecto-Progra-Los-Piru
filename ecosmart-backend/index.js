const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ruta para recibir datos simulados desde Java
app.post('/sensores', (req, res) => {
  console.log('📥 Datos recibidos desde Java:', req.body);
  res.status(200).json({ mensaje: 'Datos recibidos correctamente ✅' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
