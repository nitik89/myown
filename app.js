const mongoose = require("mongoose");
const express = require("express");
require('dotenv').config()
var router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { MONGOURL,KEY_SECRET,KEY_ID}=require('./config/keys')
const userRoutes = require("./routes/userRoutes");
const Razorpay = require('razorpay');
const shortid = require("shortid");
const { body } = require("express-validator");
const { isSignedIn ,isAuthenticated} = require("./controllers/auth");
const { getUserById } = require('./controllers/user');

const razorpay = new Razorpay({
    key_id:KEY_ID,
    key_secret: KEY_SECRET
})

mongoose.connect(MONGOURL, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(() => {
    console.log("DB connected")
}).catch(err => {
    console.log(err);
})

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.param("userId", getUserById);
app.post('/api/razorpay/:userId',isSignedIn,isAuthenticated ,async(req, res) => {
    const { products } = req.body;
    let total = 0;
    products.map(evnts => {
        total += evnts.price
    })

    const payment_capture = 1;
    const amount = total * 100;

    const currency = "INR"
    const options = {
        amount: amount,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }
    try {
        const response = await razorpay.orders.create(options)


        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error)
    }
})

app.post("/api/verification/:userId",isSignedIn,isAuthenticated,(req, res) => {
    let body = req.body.order_id + "|" + req.body.payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    
    if (expectedSignature === req.body.signature) {
   
        return res.json({ "status": "success" ,payment_id:req.body.payment_id,order_id:req.body.order_id});
    }
    return res.json({ "status": "error" })

});
app.use('/api', authRoutes);
app.use('/api', eventRoutes);
app.use('/api', orderRoutes);
app.use('/api',userRoutes);
const PORT = process.env.PORT||8800; 
app.use(express.static('public'));
if(process.env.NODE_ENV=="production"){
    app.use(express.static('frontend/build'))
    const path = require('path');
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}

app.listen(PORT, () => {
    console.log("Connected");
})