const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth').default;
const cardsRouter = require('./cards');
const usersRouter = require('./users');

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
