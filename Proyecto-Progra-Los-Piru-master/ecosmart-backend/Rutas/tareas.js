const express = require('express');
const router = express.Router();
const Tarea = require('../Modelos/Tarea');

router.get('/revision', async (req, res) => {
    try {
        const tareasRevision = await Tarea.find({ estado: 'en revision' });
        res.json(tareasRevision);
    } catch (err) {
        console.error('❌ Error al obtener tareas en revisión:', err.message);
        res.status(500).json({ mensaje: 'Error al obtener tareas' });
    }
});

router.put('/:id/estado', async (req, res) => {
    const { id } = req.params;
    const { nuevoEstado } = req.body;

    try {
        const tarea = await Tarea.findByIdAndUpdate(id, { estado: nuevoEstado }, { new: true });
        if (!tarea) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }
        res.json(tarea);
    } catch (err) {
        console.error('❌ Error al actualizar tarea:', err.message);
        res.status(500).json({ mensaje: 'Error al actualizar tarea' });
    }
});

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

router.get('/asignadas/:correo', async (req, res) => {
    try {
        const { correo } = req.params;
        const tareas = await Tarea.find({ asignacion: correo });
        res.json(tareas);
    } catch (err) {
        console.error('❌ Error al obtener tareas:', err.message);
        res.status(500).json({ mensaje: 'Error al obtener tareas' });
    }
});

module.exports = router;
