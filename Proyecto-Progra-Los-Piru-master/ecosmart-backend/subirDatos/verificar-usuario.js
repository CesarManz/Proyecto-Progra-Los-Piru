const Usuario = require('./crear-usuario');
const bcrypt = require('bcrypt');

const verificarUsuario = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo no registrado' });
    }

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const usuarioSinContraseña = {
      nombre: usuario.nombre,
      correo: usuario.correo,
      trabajo: usuario.trabajo
    };

    res.status(200).json({ mensaje: 'Login exitoso', usuario: usuarioSinContraseña });
  } catch (err) {
    console.error('❌ Error en login:', err.message);
    res.status(500).json({ mensaje: 'Error en el login' });
  }
};

module.exports = verificarUsuario;
