const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Modelo Chat
const Chat = require('../modelos/chat');

// Ruta para guardar un mensaje de chat
router.post('/', async (req, res) => {
    try {
        const { correo, pregunta, respuesta } = req.body;
        if (!correo || !pregunta || !respuesta) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        const nuevoChat = new Chat({ correo, pregunta, respuesta });
        await nuevoChat.save();

        res.status(201).json(nuevoChat);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al guardar el chat' });
    }
});
router.get('/chats/:correo', async (req, res) => {
    try {
        const { correo } = req.params;
        const chats = await Chat.find({ correo });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los chats' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Chat.findByIdAndDelete(id);
        res.status(200).json({ message: 'Chat eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el chat' });
    }
});


module.exports = router;

