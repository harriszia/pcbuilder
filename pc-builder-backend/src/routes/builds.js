const express = require('express');
const { createBuild, getBuild, getBuilds, suggestBuild } = require('../controllers/buildsController');
const router = express.Router();

router.get('/', getBuilds);
router.post('/', createBuild);
router.post('/suggest', suggestBuild);
router.get('/:id', getBuild);

module.exports = router;
