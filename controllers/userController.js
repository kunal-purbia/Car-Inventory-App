var express = require('express');
const {
    check,
    validationResult
} = require('express-validator');

const userDB = require('../models/userdb')

urlencoded = express.urlencoded({
    extended: false
});

/////////////////////////////////////HOME PAGE DISPLAY
module.exports.getHomePage = function (req, res, next) {
    res.render('index');
}

/////////////////////////////////////LOGIN PAGE DISPLAY
module.exports.getLoginPage = function (req, res, next) {
    res.render('login');
}

/////////////////////////////////////CHECK USER LOGIN
const loginCheck = [check('email', 'Email is not valid').isEmail(),
    check('password', 'Password cannot be empty').notEmpty(),
]

/////////////////////////////////////POST USER LOGIN
module.exports.postLogin = [urlencoded, loginCheck, async function (req, res, next) {
    let errorData = validationResult(req);
    let errorArray = errorData.errors;
    if (errorArray.length === 0) {
        const userDetail = {};
        userDetail.email = req.body.email;
        userDetail.password = req.body.password;

        let foundUser = await userDB.userLogin(userDetail);
        res.send(foundUser)
    } else {
        const errorInput = errorArray[0].param;
        const errorMessage = errorArray[0].msg;
        res.render('login', {
            errorInput: errorInput,
            message: errorMessage
        });
    }
}]

/////////////////////////////////////BUYER REGISTER PAGE DISPLAY
module.exports.getRegisterPageBuyer = function (req, res, next) {
    res.render('registerBuyer');
}

/////////////////////////////////////CHECK BUYER REGISTER
const buyerRegisterCheck = [check('username', 'Name cannot be empty').notEmpty(),
    check('userAddress', 'Address cannot be empty').notEmpty(),
    check('userContact', 'Contact cannot be empty').notEmpty(),
    check('userEmail', 'Email is not valid').isEmail(),
    check('password', 'Password must have atleast 5 characters').isLength({
        min: 5
    }),
    check('cpassword').custom((value, {
        req
    }) => {
        if (value != req.body.password)
            throw new Error("Confirm Password do not match password");
        return true;
    })
]

/////////////////////////////////////POST BUYER REGISTER
module.exports.postRegisterBuyer = [urlencoded, buyerRegisterCheck, function (req, res, next) {
    let errorData = validationResult(req);
    let errorArray = errorData.errors;
    if (errorArray.length === 0) {
        const buyerDetail = {}
        buyerDetail.userRole = "Buyer";
        buyerDetail.username= req.body.username;
        buyerDetail.userAddress= req.body.userAddress;
        buyerDetail.userContact= req.body.userContact;
        buyerDetail.userEmail= req.body.userEmail;
        buyerDetail.password= req.body.password;
        
        userDB.addBuyer(buyerDetail);
    }
    else {
        const errorInput = errorArray[0].param;
        const errorMessage = errorArray[0].msg;
        // res.send(error)
        console.log(errorInput);
        res.render('registerBuyer', {
            errorInput: errorInput,
            message: errorMessage
        });
    }
}]

/////////////////////////////////////SELLER REGISTER PAGE DISPLAY
module.exports.getRegisterPageSeller = function (req, res, next) {
    res.render('registerSeller');
}

/////////////////////////////////////CHECK SELLER REGISTER
const sellerRegisterCheck = [check('showroomName', 'Showroom Name cannot be empty').notEmpty(),
    check('showroomAddress', 'Showroom Address cannot be empty').notEmpty(),
    check('showroomContact', 'Showroom Contact cannot be empty').notEmpty(),
    check('showroomId', 'Showroom ID cannot be empty').notEmpty(),
    check('carCompany', 'Car Company cannot be empty').notEmpty(),
    check('showroomEmail', 'Email is not valid').isEmail(),
    check('password', 'Password must have atleast 5 characters').isLength({
        min: 5
    }),
    check('cpassword').custom((value, {
        req
    }) => {
        if (value != req.body.password)
            throw new Error("Confirm Password do not match password");
        return true;
    })
]

/////////////////////////////////////POST SELLER REGISTER
module.exports.postRegisterSeller = [urlencoded, sellerRegisterCheck, function (req, res, next) {
    let errorData = validationResult(req);
    console.log(errorData);
    let errorArray = errorData.errors;
    if (errorArray.length === 0) {
        const sellerDetail = {};
        sellerDetail.userRole = "Seller";
        sellerDetail.showroomName = req.body.showroomName;
        sellerDetail.showroomAddress = req.body.showroomAddress;
        sellerDetail.showroomContact = req.body.showroomContact;
        sellerDetail.showroomId = req.body.showroomId;
        sellerDetail.showroomEmail = req.body.showroomEmail;
        sellerDetail.password = req.body.password;
        sellerDetail.carCompany = req.body.carCompany;

        userDB.addSeller(sellerDetail);
    } else {
        const errorInput = errorArray[0].param;
        const errorMessage = errorArray[0].msg;
        console.log(errorInput);
        res.render('registerSeller', {
            errorInput: errorInput,
            message: errorMessage
        });
    }
}]