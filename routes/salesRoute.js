const express = require('express');

const router = express.Router();

const { getAll, findById, create, update, deleteSale } = require('../controllers/salesController');

router.get('/', getAll);

router.get('/:id', findById);

router.post('/', create);

router.put('/:id', update);

router.delete('/:id', deleteSale);

module.exports = router;
