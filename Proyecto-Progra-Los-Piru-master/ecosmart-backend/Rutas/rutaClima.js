const express = require('express');
const router = express.Router();
const { ObtenerClima, ObtenerHistorialClima } = require('../Controllers/conexionClima');

router.get('/clima/:ciudad', ObtenerClima);
router.get('/clima', ObtenerHistorialClima);

module.exports = router;
