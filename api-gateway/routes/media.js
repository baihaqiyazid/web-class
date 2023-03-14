var express = require('express');
var router = express.Router();
const {APP_NAME} = process.env;

const mediaHandler = require('./handler/media')

const verifyToken = require('../middlewares/verifyToken')

// CREATE image
router.post('/', mediaHandler.create)
router.get('/', verifyToken, mediaHandler.getAll)
router.delete('/:id', mediaHandler.destroy)

module.exports = router;
