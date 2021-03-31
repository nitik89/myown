var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { signup, signin, eventmanager, isAdmin } = require('../controllers/auth');
const {getUserById}=require('../controllers/user');


router.post('/signup', [
    check("firstname")
    .trim()
    .not()
    .isEmpty()
    .withMessage('First name is required')
    .isLength({min:3,max:20})
    .withMessage("First name should be 3 to 20 characters long")
    ,
    check("lastname")
    .trim()
    .not()
    .isEmpty()
    .withMessage('Last name is required')
    .isLength({min:3,max:20})
    .withMessage("Last name should be 3 to 20 characters long"),

    check("email")
    .trim()
    .isEmail()
    .withMessage("Please provide correct email"),


    
    check("password", "Password field is required").isLength({ min: 1})
], signup);
router.post(
    "/signin", [
        check("email", "Email is required").isEmail(),
        check("password", "Password field is required").isLength({ min: 1})
    ],
    signin
);
router.post('/eventmanagersignin', isAdmin, eventmanager);
module.exports = router;