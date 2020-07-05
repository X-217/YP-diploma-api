const router = require('express').Router();
const {getAuthorizedUser} = require('../controllers/users.js');

router.get('/me', getAuthorizedUser);

module.exports = router;
