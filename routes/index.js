const router = require('express').Router();

const users = require('./users');
const articles = require('./articles');

const { /* checkUserExist, */createUser, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { validateUser, validateAuthentication } = require('../middlewares/validations');

router.post('/signup', /* checkUserExist, */validateUser, createUser);
router.post('/signin', validateAuthentication, login);
router.use(auth);
router.use('/users', users);
router.use('/articles', articles);

module.exports = router;
