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
      res.json(account);
    })
    .catch(() => {
      res.status(500).json({message: 'could not get account'});
    })
})

router.post('/', checkAccountPayload, checkAccountNameUnique,  (req, res, next) => {
  AccountsModel.create(req.account)
    .then(account => {
      res.status(201).json(account);
    }) 
    .catch(() => {
      res.status(500).json({message: 'could not create account'})
    })
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  const updatedAccount = await AccountsModel.updateById(req.params.id, req.body).trim();
  try {
    res.json(updatedAccount);
  } catch(err) {
    next(err)
  }
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
  res.status(err.status || 500).json({
		message: err.message,
	});
})

module.exports = router;