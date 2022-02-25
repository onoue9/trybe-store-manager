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

const create = async (req, res) => {
  const datas = req.body;
  const [sale] = await SalesService.create(datas);
  if (sale.status) return res.status(sale.status).json({ message: sale.message });

  res.status(201).json(sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];
  const sales = await SalesService.update({ id, productId, quantity });
  if (sales.status) return res.status(sales.status).json({ message: sales.message });

  console.log(JSON.stringify(sales));
  res.status(200).send(sales);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesService.deleteSale({ id });
  if (sale.status) return res.status(sale.status).json({ message: sale.message });

  res.status(204).json();
};

module.exports = { getAll, findById, create, update, deleteSale };
