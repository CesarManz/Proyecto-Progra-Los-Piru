const express = require('express');
const router = express.Router();
const { getSensorData } = require('../Controllers/sensorController');

router.get('/sensores', getSensorData);

module.exports = router;
