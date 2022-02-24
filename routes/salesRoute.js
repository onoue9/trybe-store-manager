const express = require('express');

const router = express.Router();

const { getAll, findById, create } = require('../controllers/salesController');

router.get('/', getAll);

router.get('/:id', findById);

router.post('/', create);

module.exports = router;
