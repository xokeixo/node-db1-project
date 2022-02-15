const router = require('express').Router();
const AccountsModel = require('./accounts-model');
const { checkAccountId, checkAccountPayload } = require('./accounts-middleware');


router.get('/', async (req, res, next) => {
  try {
    const data = await AccountsModel.getAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = await AccountsModel.getById(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, (req, res, next) => {
  AccountsModel.create(req.body)
  .then(newAccount => {
    res.status(201).json(newAccount)
  })
  .catch(err => {
    res.status(400).json({ message: err.message })
  })
})

router.put('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params
  AccountsModel.updateById(id, req.body)
    .then(updatedAccount => {
      res.status(200).json(updatedAccount)
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params
  AccountsModel.deleteById(id)
    .then(deletedAccount => {
      res.status(200).json(deletedAccount)
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
