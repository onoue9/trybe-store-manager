const connection = require('./connection');

const serialize = (data) => data.map((item) => ({
  saleId: item.sale_id,
  date: item.date,
  productId: item.product_id,
  quantity: item.quantity,
}));

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT sale_id, date, product_id, quantity FROM StoreManager.sales AS s '
    + 'INNER JOIN StoreManager.sales_products AS sp '
    + 'ON s.id = sp.sale_id;',
  );

  return serialize(result);
};

const findById = async (id) => {
  const [result] = await connection.execute(
    'SELECT product_id, date, quantity FROM StoreManager.sales AS s '
    + 'INNER JOIN StoreManager.sales_products AS sp '
    + 'ON s.id = sp.sale_id '
    + 'WHERE id = ?;',
    [id],
  );

  if (result.length === 0) return null;

  const serializedResult = serialize(result);

  return serializedResult;
};

const create = async (datas) => {
  const [sales] = await connection.execute('INSERT INTO StoreManager.sales VALUES()');
  datas.map(async (data) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products VALUES (?, ?, ?);',
      [sales.insertId, data.productId, data.quantity],
    );
    await connection.execute(
      'UPDATE StoreManager.products SET quantity = (quantity - ?) WHERE id = ?;',
      [data.quantity, data.productId],
    );
  });
  return {
    id: sales.insertId,
    itemsSold: datas,
  };
};

const update = async ({ id, productId, quantity }) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?;',
    [productId, quantity, id],
  );

  if (result.length === 0) return null;

  const res = {
      saleId: id,
      itemUpdated: [
        {
          productId,
          quantity,
        },
      ],
    };

  return res;
};

const deleteSale = async ({ id }) => {
  const [sales] = await connection.execute(
    'SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?;', [id],
  );
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;', [id],
    );
  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?;', [id],
    );

  if (result.length === 0) return null;

  return sales;
};

const updateProductsQuantity = async (products, { id }) => {
  products.map(async (prod) => {
  const product = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [prod.productId],
  );
  const saleQuantity = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?', [id],
  );
  await connection.execute(
    'UPDATE StoreManager.products SET quantity = (quantity + ?) WHERE id = ?',
    [saleQuantity[0][0].quantity, product[0][0].id],
  );
  });
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteSale,
  updateProductsQuantity,
 };
