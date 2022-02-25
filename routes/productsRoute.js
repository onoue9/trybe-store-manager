const express = require('express');

const router = express.Router();

const {
  getAll,
  findById,
  create,
  update,
  deleteProduct,
} = require('../controllers/productsController');

router.get('/', getAll);

router.get('/:id', findById);

router.post('/', create);

router.put('/:id', update);

router.delete('/:id', deleteProduct);

module.exports = router;
