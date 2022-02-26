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
  if (!productId || productId === '') return { message: '"productId" is required', status: 400 };
  return true;
};

const quantityValidate = (quantity) => {
  if (parseInt(quantity, 0) < 1) {
    return {
      message: '"quantity" must be greater than or equal to 1',
      status: 422,
    };
  }
  if (!quantity || quantity === '') return { message: '"quantity" is required', status: 400 };
  return true;
};

const create = async (datas) => {
  const res = datas.map((data) => {
    const isValidProductId = productIdValidate(data.productId);
    const isValidQuantity = quantityValidate(data.quantity);
    let result = '';

    if (isValidProductId.status) { result = isValidProductId; }
    if (isValidQuantity.status) { result = isValidQuantity; }

    return result;
  });
  if (res[0].status) return res;

  const sale = await SalesModels.create(datas);

  return sale;
};

const update = async ({ id, productId, quantity }) => {
  const isValidProductId = productIdValidate(productId);
  const isValidQuantity = quantityValidate(quantity);

  if (isValidQuantity.status) return isValidQuantity;
  if (isValidProductId.status) return isValidProductId;

  const isIdExists = await SalesModels.findById(id);
  if (!isIdExists) return ({ message: 'Sale not found', status: 404 });

  const sales = await SalesModels.update({ id, productId, quantity });

  return sales;
};

const deleteSale = async ({ id }) => {
  const isIdExists = await SalesModels.findById(id);
  if (!isIdExists) return ({ message: 'Sale not found', status: 404 });

  const getProduct = await SalesModels.findById(id);

  SalesModels.updateProductsQuantity(getProduct, { id });

  const product = await SalesModels.deleteSale({ id });

  return product;
};

module.exports = { getAll, findById, create, update, deleteSale };
