const express = require('express');

const router = express.Router();

const { getAll, findById, create } = require('../controllers/productsController');

router.get('/', getAll);

router.get('/:id', findById);

router.post('/', create);

module.exports = router;
