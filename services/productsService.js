const ProductsModels = require('../models/productsModel');

const getAll = async () => {
  const product = await ProductsModels.getAll();

  return product;
};

const findById = async (id) => {
  const product = await ProductsModels.findById(id);

  if (!product) return null;

  return product;
};

module.exports = { getAll, findById };
