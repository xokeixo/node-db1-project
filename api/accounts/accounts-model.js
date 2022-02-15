const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  return db('acounts');
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id).first();
}

const create = account => {
  // DO YOUR MAGIC
  const [ id ] = db('accounts').insert(account);
  return getById(id);
}

const updateById = async({id, account}) => {
  // DO YOUR MAGIC
  await db('accounts').where('id', id).update({id, account});
  return getById(id);
}

const deleteById = async (id) => {
  // DO YOUR MAGIC
  const deletedPost = await getById(id);
  await db('accounts').where('id', id).delete();
  return deletedPost;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
