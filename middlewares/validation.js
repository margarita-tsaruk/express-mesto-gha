const { ObjectId } = require('mongoose').Types;
const { celebrate, Joi } = require('celebrate');

const validateAnyId = (value, helpers) => {
  if (!ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(validateAnyId),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(validateAnyId),
  }),
});
