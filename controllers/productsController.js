const ProductsService = require('../services/productsService');

const getAll = async (_req, res) => {
  try {
    const products = await ProductsService.getAll();
    if (!products) return res.status(200).json([]);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsService.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, findById };
