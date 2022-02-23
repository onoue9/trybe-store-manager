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

module.exports = { getAll, findById };
