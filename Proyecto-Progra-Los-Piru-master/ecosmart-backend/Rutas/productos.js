    const express = require('express');
    const router = express.Router();
    const Producto = require('../modelos/Productos');

    router.post('/agregar', async (req, res) => {
        try {
            const nuevoProducto = new Producto(req.body);
            await nuevoProducto.save();
            res.status(201).json({ mensaje: 'Producto agregado correctamente' });
        } catch (error) {
            console.error('❌ Error al guardar el producto:', error.message);
            res.status(500).json({ mensaje: 'Error al guardar el producto' });
        }
    });

    router.get('/', async (req, res) => {
        try {
            const productos = await Producto.find();
            res.json(productos);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).json({ mensaje: 'Error al obtener productos' });
        }
    });

    module.exports = router;