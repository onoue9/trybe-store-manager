const SalesService = require('../services/salesService');

const getAll = async (_req, res) => {
  try {
    const sales = await SalesService.getAll();
    if (!sales) return res.status(200).json([]);
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await SalesService.findById(id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json(sale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, findById };
