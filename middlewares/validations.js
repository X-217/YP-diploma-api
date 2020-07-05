const {celebrate, Joi} = require('celebrate');
const validator = require('validator');
const {
    emailNotValid, emailRequired, imageRequired, keywordRequired, linkRequired,
    nameMaxlength, nameMinlength, nameNoSpaces, nameRequired, passwordMinlength, passwordRequired,
    sourceRequired, textRequired, titleRequired, keywordNoSpaces, titleNoSpaces, sourceNoSpaces,
    textNoSpaces, dateNotValid, linkIsNotUrl, imageIsNotUrl, articleIdIsNotValid, invalidRequest,
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
                'any.required': invalidRequest,
                'string.empty': keywordRequired,
                'string.pattern.base': keywordNoSpaces,
            }),
        title: Joi.string().required()
            .regex(/\S/)
            .messages({
                'any.required': invalidRequest,
                'string.empty': titleRequired,
                'string.pattern.base': titleNoSpaces,
            }),
        text: Joi.string().required()
            .regex(/\S/)
            .messages({
                'any.required': invalidRequest,
                'string.empty': textRequired,
                'string.pattern.base': textNoSpaces,
            }),
        date: Joi.date().required()
            .messages({
                'any.required': invalidRequest,
                'date.base': dateNotValid,
            }),
        source: Joi.string().required()
            .regex(/\S/)
            .messages({
                'any.required': invalidRequest,
                'string.empty': sourceRequired,
                'string.pattern.base': sourceNoSpaces,
            }),
        link: Joi.string().required()
            .custom(url)
            .messages({
                'any.required': invalidRequest,
                'string.empty': linkRequired,
                'any.custom': linkIsNotUrl,
            }),
        image: Joi.string().required()
            .custom(url)
            .messages({
                'any.required': invalidRequest,
                'string.empty': imageRequired,
                'any.custom': imageIsNotUrl,
            }),
    })
        .messages({
            'string.base': invalidRequest,
            'object.unknown': invalidRequest,
        }),
});

const validateArticleId = celebrate({
    params: Joi.object().keys({
        articleId: Joi.string().hex().length(24)
            .messages({
                'string.length': articleIdIsNotValid,
                'string.empty': articleIdIsNotValid,
                'string.hex': articleIdIsNotValid,
            }),
    }),
});

const validateUser = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(30)
            .regex(/^\S.*\S$/)
            .messages({
                'any.required': invalidRequest,
                'string.min': nameMinlength,
                'string.max': nameMaxlength,
                'string.empty': nameRequired,
                'string.pattern.base': nameNoSpaces,
            }),
        email: Joi.string().required().email()
            .messages({
                'any.required': invalidRequest,
                'string.email': emailNotValid,
                'string.empty': emailRequired,
            }),
        password: Joi.string().required().min(8)
            .messages({
                'any.required': invalidRequest,
                'string.min': passwordMinlength,
                'string.empty': passwordRequired,
            }),
    })
        .messages({
            'string.base': invalidRequest,
            'object.unknown': invalidRequest,
        }),
});

const validateAuthentication = celebrate({ // корявое имя
    body: Joi.object().keys({
        email: Joi.string().required().email()
            .messages({
                'any.required': invalidRequest,
                'string.email': emailNotValid,
                'string.empty': emailRequired,
            }),
        password: Joi.string().required()
            .messages({
                'any.required': invalidRequest,
                'string.empty': passwordRequired,
            }),
    })
        .messages({
            'string.base': invalidRequest,
            'object.unknown': invalidRequest,
        }),
});

module.exports = {
    validateArticle,
    validateArticleId,
    validateUser,
    validateAuthentication,
};
