/* eslint-disable consistent-return */
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.status(201).send(newCard);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(
          new BadRequestError('Переданы некорректные данные при создании карточки.'),
        );
        return;
      }
      next(error);
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      const owner = card.owner.toString();
      if (req.user._id !== owner) {
        throw new ForbiddenError('Чужие карточки удалить нельзя!');
      }
      return Card.findByIdAndRemove(cardId)
        .then((deletedCard) => {
          res.send({ card: deletedCard });
        });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(error);
      }
    });
};

const likeCard = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      } else {
        res.send(card);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(
          new BadRequestError('Переданы некорректные данные.'),
        );
        return;
      }
      next(error);
    });
};

const dislikeCard = (req, res, next) => {
  const owner = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным _id не найдена.'));
      } else {
        res.send(card);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(
          new BadRequestError('Переданы некорректные данные.'),
        );
        return;
      }
      next(error);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
