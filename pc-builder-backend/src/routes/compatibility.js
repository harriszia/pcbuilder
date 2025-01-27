const express = require('express');
const { checkCompatibility } = require('../controllers/compatibilityController');
const router = express.Router();

router.post('/', checkCompatibility);

module.exports = router;

// Compatiblity NOT YET IMPLEMENTED