const router = require('express').Router();
const {checkUserExist, createUser, login} = require('../controllers/authentications');
const {validateUser, validateAuthentication} = require('../middlewares/validations');

router.post('/signup', validateUser, checkUserExist, createUser);
router.post('/signin', validateAuthentication, login);

module.exports = router;
