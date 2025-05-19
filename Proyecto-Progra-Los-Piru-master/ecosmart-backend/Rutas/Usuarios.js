const express = require('express');
const router = express.Router();
const Usuario = require('../subirDatos/crear-usuario');
const verificarUsuario = require('../subirDatos/verificar-usuario');

// ✅ Registro de nuevo usuario
router.post('/', async (req, res)  => {
  try {
    const { nombre, correo, contraseña, trabajo } = req.body;

    // Validación mínima
    if (!nombre || !correo || !contraseña || !trabajo) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    // Verificar si el correo ya está registrado
    const existente = await Usuario.findOne({ correo });
    if (existente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Crear y guardar nuevo usuario
    const nuevo = new Usuario({ nombre, correo, contraseña, trabajo });
    await nuevo.save();

    res.status(201).json({ mensaje: 'Usuario creado correctamente' });
  } catch (err) {
    console.error('❌ Error al registrar usuario:', err.message);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
});

// Eliminar usuario por correo
router.delete('/eliminar', async (req, res) => {
  try {
    const { correo } = req.body;

    if (!correo) {
      return res.status(400).json({ mensaje: 'El correo es obligatorio' });
    }

    const resultado = await Usuario.deleteOne({ correo });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar usuario:', err.message);
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
});

// Actualizar nombre y correo del usuario
router.put('/actualizar', async (req, res) => {
  try {
    const { oldEmail, newName, newEmail } = req.body;

    if (!oldEmail || !newName || !newEmail) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const usuario = await Usuario.findOne({ correo: oldEmail });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    usuario.nombre = newName;
    usuario.correo = newEmail;

    await usuario.save();

    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar usuario:', err.message);
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
});

// Obtener usuario por correo
router.get('/correo/:correo', async (req, res) => {
  try {
    const correo = req.params.correo;

    const usuario = await Usuario.findOne({ correo }).select('nombre correo trabajo');

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error del servidor', error: error.message });
  }
});


// ✅ Login de usuario
router.post('/login', verificarUsuario);



module.exports = router;
