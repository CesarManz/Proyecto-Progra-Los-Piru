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

// Actualizar usuario por correo
router.put('/actualizar', async (req, res) => {
  const { correoActual, nuevoNombre, nuevoCorreo } = req.body;

  if (!correoActual || !nuevoNombre || !nuevoCorreo) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    const usuario = await Usuario.findOne({ correo: correoActual });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    usuario.nombre = nuevoNombre;
    usuario.correo = nuevoCorreo;

    await usuario.save();
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (err) {
    console.error('Error al actualizar usuario:', err.message);
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
});

// Obtener usuario por correo
router.get('/correos', async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, 'nombre correo'); // ahora trae nombre también
    res.json(usuarios);
  } catch (err) {
    console.error('❌ Error al obtener usuarios:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
});

router.get('/por-trabajo', async (req, res) => {
  try {
    const trabajos = req.query.trabajo;

    let filtro = {};
    if (trabajos) {
      if (Array.isArray(trabajos)) {
        filtro.trabajo = { $in: trabajos };
      } else {
        filtro.trabajo = trabajos;
      }
    }

    const usuarios = await Usuario.find(filtro, 'nombre correo trabajo'); // trae también trabajo
    res.json(usuarios);
  } catch (err) {
    console.error('❌ Error al obtener usuarios por trabajo:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener usuarios por trabajo' });
  }
});

// Obtener usuario específico por correo

router.get('/correo/:correo', async (req, res) => {
  const correo = req.params.correo;

  try {
    const usuario = await Usuario.findOne({ correo });


    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({
      nombre: usuario.nombre,
      correo: usuario.correo,
      trabajo: usuario.trabajo,
      fotoPerfil: usuario.fotoPerfil || ''
    });
  } catch (err) {
    console.error('❌ Error al obtener usuario:', err.message);
    res.status(500).json({ mensaje: 'Error al obtener usuario' });
  }
});

// Actualizar foto de perfil de un usuario
router.put('/foto', async (req, res) => {
  const { correo, fotoPerfil } = req.body;

  if (!correo || !fotoPerfil) {
    return res.status(400).json({ mensaje: 'Correo y fotoPerfil son obligatorios' });
  }

  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    usuario.fotoPerfil = fotoPerfil;
    await usuario.save();

    res.json({ mensaje: 'Foto de perfil actualizada correctamente' });
  } catch (err) {
    console.error('❌ Error al actualizar foto de perfil:', err.message);
    res.status(500).json({ mensaje: 'Error al actualizar foto de perfil' });
  }
});




// ✅ Login de usuario
router.post('/login', verificarUsuario);



module.exports = router;
