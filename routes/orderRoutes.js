var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');

const { getUserById } = require('../controllers/user');

const { createOrder,getMyOrders } = require('../controllers/orders');
const { isAuthenticated, isSignedIn } = require("../controllers/auth");
router.param("userId", getUserById);
router.post('/order/create/:userId',isSignedIn,isAuthenticated,createOrder);
router.get('/getMyOrders/:userId',isSignedIn,isAuthenticated,getMyOrders);


module.exports = router;