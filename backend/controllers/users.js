/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  JWT_SECRET,
} = require('../utils/constants');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => {
      res.status(201).send({
        name, about, avatar, email,
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        return next(
          new ConflictError('Пользователь с такой почтой уже зарегистрирвован'),
        );
      }
      if (error.name === 'ValidationError') {
        return next(
          new BadRequestError('Переданы некорректные данные.'),
        );
      }
      return next(error);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(
          new UnauthorizedError('Неправильные почта или пароль'),
        );
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET || 'JWT_SECRET', { expiresIn: '7d' });
          return res.send({ token });
        });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(
          new BadRequestError('Переданы не валидные данные'),
        );
      }
      return next(error);
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(
          new NotFoundError('Пользователь по указанному _id не найден'),
        );
      }
      return res.send({ data: user });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const owner = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return next(
          new NotFoundError('Пользователь по указанному _id не найден'),
        );
      }
      return res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(
          new BadRequestError('Переданы некорректные данные.'),
        );
      }
      return next(error);
    });
};

const updateAvatar = (req, res, next) => {
  const owner = req.user._id;
  const avatar = req.body;

  User.findByIdAndUpdate(owner, avatar, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(
          new NotFoundError('Пользователь по указанному _id не найден'),
        );
      }
      return res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(
          new BadRequestError('Переданы некорректные данные.'),
        );
      }
      return next(error);
    });
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUser,
  getUserInfo,
  updateProfile,
  updateAvatar,
};
