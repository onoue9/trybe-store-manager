const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC;',
  );

  return result;
};

const findById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;', [id],
  );

  if (result.length === 0) return null;

  const { name, quantity } = result[0];

  return {
    id,
    name,
    quantity,
  };
};

const create = async ({ name, quantity }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );

  return {
    id: result.insertId,
  };
};

module.exports = { getAll, findById, create };
