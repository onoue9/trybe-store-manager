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

const nameValidate = (name) => {
  if (!name || name === '') return { message: '"name" is required', status: 400 };
  if (name.length < 5) {
    return {
      message: '"name" length must be at least 5 characters long',
      status: 422,
    };
  }

  return true;
};

const quantityValidate = (quantity) => {
  if (!quantity || quantity === '') return { message: '"quantity" is required', status: 400 };
  if (parseInt(quantity, 0) < 1) {
    return {
      message: '"quantity" must be greater than or equal to 1',
      status: 422,
    };
  }
  return true;
};

const create = async ({ name, quantity }) => {
  const isValidName = nameValidate(name);
  const isValidQuantity = quantityValidate(quantity);

  if (isValidName.status) return isValidName;
  if (isValidQuantity.status) return isValidQuantity;

  const { id } = await ProductsModels.create({ name, quantity });

  return { id };
};

module.exports = { getAll, findById, nameValidate, quantityValidate, create };
