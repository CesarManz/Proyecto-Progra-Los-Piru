const express = require('express');
const router = express.Router();
const Tarea = require('../Modelos/Tarea');

router.post('/', async (req, res) => {
    try {
        const { asignacion, titulo, descripcion } = req.body;

        const nuevaTarea = new Tarea({
            asignacion,
            titulo,
            descripcion,
            estado: 'activo',
        });

        await nuevaTarea.save();
        res.status(201).json({ mensaje: 'Tarea guardada exitosamente' });
    } catch (err) {
        console.error('❌ Error al guardar tarea:', err.message);
        res.status(500).json({ mensaje: 'Error al guardar tarea' });
    }
});

module.exports = router;
