var express = require('express');
var router = express.Router();
const {APP_NAME} = process.env;

const mediaHandler = require('./handler/media')

// CREATE image
router.post('/', mediaHandler.create)
router.get('/', mediaHandler.getAll)
router.delete('/:id', mediaHandler.destroy)

module.exports = router;
