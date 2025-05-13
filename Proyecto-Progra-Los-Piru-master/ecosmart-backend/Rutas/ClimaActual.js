const express = require('express');
const router = express.Router();
const { guardarBusqueda } = require('../Controllers/climaActual');

router.get('/clima-actual/:ciudad', guardarBusqueda);

module.exports = router;
