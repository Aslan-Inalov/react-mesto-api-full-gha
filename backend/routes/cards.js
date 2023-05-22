const cardsRouter = require('express').Router();
const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validateCardId, validateCard } = require('../utils/validators/cardValidators');

cardsRouter.post('/', validateCard, createCard);
cardsRouter.get('/', getCards);
cardsRouter.delete('/:cardId', validateCardId, deleteCard);
cardsRouter.put('/:cardId/likes', validateCardId, likeCard);
cardsRouter.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardsRouter;
