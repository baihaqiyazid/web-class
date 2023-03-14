var express = require('express');
var router = express.Router();
const {APP_NAME} = process.env;

/* GET users listing. */
const userHandler = require('./handler/users')

router.post('/register', userHandler.register)
router.post('/login', userHandler.login)

module.exports = router;
