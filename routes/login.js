var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/////////////////////////////////////GET USER LOGIN PAGE
router.get('/', userController.getLoginPage);

/////////////////////////////////////POST USER LOGIN
router.post('/', userController.postLogin);

module.exports = router;
