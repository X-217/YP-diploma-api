const {isCelebrate} = require('celebrate');
const {invalidRequest} = require('../messages/messages_ru.json');

const errorHandler = (err, req, res, next) => {
    const statusCode = (isCelebrate(err) || (err.name === 'CastError') || err.name === ('ValidationError')) ? 400 : err.statusCode || 500;

    if (err.name === ('ValidationError')) {
        err.message = Object.values(err.errors).map((error) => error.message).join(', ');
    }
    if (err.type === 'entity.parse.failed') {
        err.message = invalidRequest
    }

    res.status(statusCode).send({message: statusCode === 500 ? 'На сервере произошла ошибка' : err.message});

    next();
};

module.exports = errorHandler;
