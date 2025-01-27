const express = require('express');
const { getAllParts,getPartById, addPart, deletePart } = require('../controllers/partsController');
const router = express.Router();

//Get Part List
router.get('/', getAllParts);
//Get Part by id
router.get('/:id', getPartById);
//Add New part
router.post('/', addPart);
//Delete Part by id
router.delete('/:id', deletePart);

module.exports = router;