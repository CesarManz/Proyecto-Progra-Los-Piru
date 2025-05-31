const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Modelo Chat
const Chat = require('../modelos/chat');

// Ruta para guardar un mensaje de chat
router.post('/', async (req, res) => {
    try {
        const { correo, chatId, pregunta, respuesta } = req.body;
        if (!correo || !chatId || !pregunta || !respuesta) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        const nuevoChat = new Chat({ correo, chatId, pregunta, respuesta });
        await nuevoChat.save();

        res.status(201).json(nuevoChat);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al guardar el chat' });
    }
});
router.get('/conversacion/:chatId', async (req, res) => {
    try {
        const { chatId } = req.params;
        const mensajes = await Chat.find({ chatId }).sort({ fecha: 1 });
        res.json(mensajes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la conversación' });
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
// Obtener lista de chats únicos por correo
router.get('/chats/:correo', async (req, res) => {
    try {
        const { correo } = req.params;

        const chats = await Chat.aggregate([
            { $match: { correo } },
            {
                $group: {
                    _id: "$chatId",
                    chatId: { $first: "$chatId" },
                    pregunta: { $first: "$pregunta" },
                    fecha: { $first: "$fecha" },
                    _idReal: { $first: "$_id" }
                }
            },
            { $sort: { fecha: -1 } }
        ]);

        res.json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener chats' });
    }
});


module.exports = router;

