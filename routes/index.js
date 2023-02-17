var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/////////////////////////////////////GET HOME PAGE
router.get('/', userController.getHomePage);

module.exports = router;
