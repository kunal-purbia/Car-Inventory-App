var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/////////////////////////////////////GET BUYER REGISTRATION PAGE
router.get('/buyer', userController.getRegisterPageBuyer);

/////////////////////////////////////POST BUYER REGISTRATION PAGE
router.post('/buyer', userController.postRegisterBuyer);

/////////////////////////////////////GET SELLER REGISTRATION PAGE
router.get('/seller', userController.getRegisterPageSeller);

/////////////////////////////////////POST SELLER REGISTRATION PAGE
router.post('/seller', userController.postRegisterSeller);

module.exports = router;
