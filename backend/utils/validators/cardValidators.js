/* eslint-disable import/no-extraneous-dependencies */
const { Joi, celebrate } = require('celebrate');
const { URL_REGEXP } = require('../constants');

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_REGEXP),
  }),
});

module.exports = {
  validateCardId,
  validateCard,
};
