const rateLimit = require('express-rate-limit');
const {rateLimitOn} = require('../messages/messages_ru.json')
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: rateLimitOn,
});

module.exports = limiter;
