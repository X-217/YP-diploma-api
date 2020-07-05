const jwt = require('jsonwebtoken');

const {authorizationRequired} = require('../messages/messages_ru.json');
const {JWT_SECRET} = require('../config');

const {Unauthorized} = require('../errors/http-errors');

const auth = (req, res, next) => {
    try {
        req.user = jwt.verify(req.cookies.jwt, JWT_SECRET);
        next();
    } catch (err) {
        throw new Unauthorized(authorizationRequired);
    }
};

module.exports = {auth};
