const express = require('express');
const router = express.Router();
const { obtenerPronostico } = require('../Controllers/pronosticos');

router.get('/pronostico/:ciudad', obtenerPronostico);

module.exports = router;
