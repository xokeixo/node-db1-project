const db = require('../../data/db-config');

const getAll = () => {
  return db('acounts');
}

const getById = id => {
  return db('accounts').where('id', id).first();
}

const create = account => {
  const [ id ] = db('accounts').insert(account);
  return getById(id);
}

const updateById = async({id, account}) => {
  await db('accounts').where('id', id).update({id, account});
  return getById(id);
}

const deleteById = async (id) => {
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
