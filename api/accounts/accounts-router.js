const router = require('express').Router();
const AccountsModel = require('./accounts-model');
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware');


router.get('/', (req, res, next) => {
  AccountsModel.getAll()
    .then(data => {
      res.json(data);
    })
    .catch(() => {
      res.status(500).json({message: 'could not get accounts'});
    });
})

router.get('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params;
  AccountsModel.getById(id)
    .then(account => {
      res.json(account[0]);
    })
    .catch(() => {
      res.status(500).json({message: 'could not get account'});
    })
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  AccountsModel.create(req.account)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(() => {
      res.status(500).json({message: 'could not create account'});
    })
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  const { id } = req.params;
  AccountsModel.updateById(id, req.account)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(() => {
      res.status(500).json({message: 'could not create account'});
    })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params;
  AccountsModel.deleteById(id)
    .then(account => {
      res.json(account);
    })
    .catch(() => {
      res.status(500).json({message: 'could not delete account'});
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;