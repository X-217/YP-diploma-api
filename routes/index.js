const router = require('express').Router();

const users = require('./users');
const articles = require('./articles');
const authentications = require('./authentication');

const {auth} = require('../middlewares/auth');
const {Forbidden} = require('../errors/http-errors');
const {forbiddenMsg} = require('../messages/messages_ru.json');

router.use('/', authentications);
router.use(auth);
router.use('/users', users);
router.use('/articles', articles);
router.all('*', () => {
    throw new Forbidden(forbiddenMsg);
});

module.exports = router;
