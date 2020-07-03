const jwt = require('jsonwebtoken');

const messages = require('../messages/messages_ru.json');
const JWT_SECRET = require('../config');

const { Unauthorized } = require('../errors/http-errors');

const auth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    throw new Unauthorized(messages.authorizationRequired);
  }
};

module.exports = { auth };
