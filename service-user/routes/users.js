const express = require('express');
const router = express.Router();

const userHandler = require('./handler/users')

router.post('/register', userHandler.register)
router.post('/login', userHandler.login)
router.post('/:id/update', userHandler.update)
router.post('/logout', userHandler.logout)
router.get('/:id', userHandler.getUserById)
router.get('/', userHandler.getUsers)

module.exports = router;
