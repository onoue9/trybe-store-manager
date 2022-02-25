const SalesModels = require('../models/salesModels');

const getAll = async () => {
  const sales = await SalesModels.getAll();

  return sales;
};

const findById = async (id) => {
  const sale = await SalesModels.findById(id);

  if (!sale) return null;

  return sale;
};

const productIdValidate = (productId) => {
  if (!productId || productId === '') return { message: '"productId" is required', status: '400' };
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

const create = async (datas) => {
  datas.forEach((data) => {
  const isValidProductId = productIdValidate(data.productId);
  const isValidQuantity = quantityValidate(data.quantity);

  if (isValidProductId.status) return isValidProductId;
  if (isValidQuantity.status) return isValidQuantity;
});

  const sale = await SalesModels.create(datas);

  return sale;
};

module.exports = { getAll, findById, create };
