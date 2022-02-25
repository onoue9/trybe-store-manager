const express = require('express');

const router = express.Router();

const { getAll, findById, create, update } = require('../controllers/productsController');

router.get('/', getAll);

router.get('/:id', findById);

router.post('/', create);

router.put('/:id', update);

module.exports = router;
