const {celebrate, Joi} = require('celebrate');
const validator = require('validator');
const {
  dateRequired, emailNotValid, emailRequired, imageRequired, keywordRequired, linkRequired,
  nameMaxlength, nameMinlength, nameNoSpaces, nameRequired, passwordMinlength, passwordRequired,
  sourceRequired, textRequired, titleRequired, keywordNoSpaces, titleNoSpaces, sourceNoSpaces,
  textNoSpaces, dateNotValid, linkIsNotUrl, imageIsNotUrl, articleIdIsNotValid,
} = require('../messages/messages_ru.json');

const url = (link) => {
  if (!validator.isURL(link)) {
    throw new Error('is not URL');
  }
  return link;
};

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .regex(/\S/)
      .messages({
        'any.required': keywordRequired,
        'string.empty': keywordRequired,
        'string.pattern.base': keywordNoSpaces,
      }),
    title: Joi.string().required()
      .regex(/\S/)
      .messages({
        'any.required': titleRequired,
        'string.empty': titleRequired,
        'string.pattern.base': titleNoSpaces,
      }),
    text: Joi.string().required()
      .regex(/\S/)
      .messages({
        'any.required': textRequired,
        'string.empty': textRequired,
        'string.pattern.base': textNoSpaces,
      }),
    date: Joi.date().required()
      .messages({
        'any.required': dateRequired,
        'date.base': dateNotValid,
      }),
    source: Joi.string().required()
      .regex(/\S/)
      .messages({
        'any.required': sourceRequired,
        'string.empty': sourceRequired,
        'string.pattern.base': sourceNoSpaces,
      }),
    link: Joi.string().required()
      .custom(url)
      .messages({
        'any.required': linkRequired,
        'string.empty': linkRequired,
        'any.custom' : linkIsNotUrl,
      }),
    image: Joi.string().required()
      .custom(url)
      .messages({
        'any.required': imageRequired,
        'string.empty': imageRequired,
        'any.custom' : imageIsNotUrl,
      }),
    /*    _id: Joi.string().alphanum().length(24),
            .messages({
            'any.required': messages.idRequired,
            'string.empty': messages.idRequired,
          }), */
  }).unknown(true),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24)
      .messages({
        'string.length': articleIdIsNotValid,
        'string.empty': articleIdIsNotValid,
        'string.alphanum': articleIdIsNotValid,
      }),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .regex(/^\S.*\S$/)
      .messages({
        'any.required': nameRequired,
        'string.min': nameMinlength,
        'string.max': nameMaxlength,
        'string.empty': nameRequired,
        'string.pattern.base': nameNoSpaces,
      }),
    email: Joi.string().required().email()
      .messages({
        'any.required': emailRequired,
        'string.email': emailNotValid,
        'string.empty': emailRequired,
      }),
    password: Joi.string().required().min(8)
      .messages({
        'any.required': passwordRequired,
        'string.min': passwordMinlength,
        'string.empty': passwordRequired,
      }),
  }),
});

const validateAuthentication = celebrate({ // корявое имя
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'any.required': emailRequired,
        'string.email': emailNotValid,
        'string.empty': emailRequired,
      }),
    password: Joi.string().required()
      .messages({
        'any.required': passwordRequired,
        'string.empty': passwordRequired,
      }),
  }),
});



module.exports = {
  validateArticle,
  validateArticleId,
  validateUser,
  validateAuthentication,
};
