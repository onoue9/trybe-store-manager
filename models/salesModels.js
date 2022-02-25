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
  });

  return {
    id: sales.insertId,
    itemsSold: datas,
  };
};

module.exports = { getAll, findById, create };
