const express = require('express');
const router = express.Router();

const userHandler = require('./handler/users')

router.post('/register', userHandler.register)
router.post('/login', userHandler.login)
router.post('/:id/update', userHandler.update)

module.exports = router;
