const express = require('express');

const router = express.Router();

const { getAll, findById } = require('../controllers/salesController');

router.get('/', getAll);

router.get('/:id', findById);

module.exports = router;
