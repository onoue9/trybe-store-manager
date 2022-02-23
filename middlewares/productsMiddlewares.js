const express = require('express');

const router = express.Router();

const { getAll, findById } = require('../controllers/productsController');

router.get('/', getAll);

router.get('/:id', findById);

module.exports = router;
