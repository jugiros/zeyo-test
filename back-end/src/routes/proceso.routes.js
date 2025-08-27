const express = require('express');
const procesoController = require('../controllers/proceso.controller');

const router = express.Router();

router.get('/', procesoController.getProcesos);
router.post('/', procesoController.createProceso);
router.put('/:id', procesoController.updateProceso);

module.exports = router;