const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const messages = require('../messages/messages.json');

const url = (link) => {
  if (!validator.isURL(link)) { throw new Error('is not URL'); } ///
  return link;
};

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'any.required': messages.keywordRequired,
        'string.empty': messages.keywordRequired,
      }),
    title: Joi.string().required()
      .messages({
        'any.required': messages.titleRequired,
        'string.empty': messages.titleRequired,
      }),
    text: Joi.string().required()
      .messages({
        'any.required': messages.textRequired,
        'string.empty': messages.textRequired,
      }),
    date: Joi.date().required()
      .messages({
        'any.required': messages.dateRequired,
        'string.empty': messages.dateRequired,
      }),
    source: Joi.string().required()
      .messages({
        'any.required': messages.sourceRequired,
        'string.empty': messages.sourceRequired,
      }),
    link: Joi.string().required().custom(url)
      .messages({
        'any.required': messages.linkRequired,
        'string.empty': messages.linkRequired,
      }),
    image: Joi.string().required().custom(url)
      .messages({
        'any.required': messages.imageRequired,
        'string.empty': messages.imageRequired,
      }),
    _id: Joi.string().alphanum().length(24),
    /*      .messages({
        'any.required': messages.idRequired,
        'string.empty': messages.idRequired,
      }), */
  }).unknown(true),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .regex(/^\S.*\S$/)
      .messages({
        'any.required': messages.nameRequired,
        'string.min': messages.nameMinlength,
        'string.max': messages.nameMaxlength,
        'string.empty': messages.nameRequired,
        'string.pattern.base': messages.nameNoSpaces,
      }),
    email: Joi.string().required().email()
      .messages({
        'any.required': messages.emailRequired,
        'string.email': messages.emailNotValid,
        'string.empty': messages.emailRequired,
      }),
    password: Joi.string().required().min(8)
      .messages({
        'any.required': messages.passwordRequired,
        'string.min': messages.passwordMinlength,
        'string.empty': messages.passwordRequired,
      }),
  }),
});

const validateAuthentication = celebrate({ // корявое имя
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': messages.emailRequired,
        'string.email': messages.emailNotValid,
        'string.empty': messages.emailRequired,
      }),
    password: Joi.string().required()
      .messages({
        'any.required': messages.passwordRequired,
        'string.empty': messages.passwordRequired,
      }),
  }),
});

module.exports = {
  validateArticle,
  validateArticleId,
  validateUser,
  validateAuthentication,
};
