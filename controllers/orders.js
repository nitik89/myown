const User = require('../models/userSchema')
const { Order, ProductCart } = require('../models/orderSchema');
const Events = require('../models/eventsSchema');

exports.createOrder = (req, res) => {
    const id=req.params.userId;
    const data=req.body;
    console.log(id);
    const order = new Order({...data,user:id});
    order.save((err, order) => {
        if (err) {
            return res.status(400).json({ error: "Failed to save your order in DB" })
        }
        req.body.products.map(evnts => {
            Events.findOneAndUpdate({ _id: evnts._id }, { $push: { enrolledStudents: req.profile._id } }).exec((err, data) => {
                if (err) {
                    return res.status(400).json(err);
                }
                User.findOneAndUpdate({ _id: req.profile.id }, { $push: { events: evnts._id } }).exec((err, use) => {
                    if (err) {
                        return res.status(400).json(err);
                    }
                })

            })

        })
        res.json(order);
    })
}

exports.getMyOrders=(req,res)=>{
    const id=req.params.userId;
    Order.find({user:id}).exec((err,data)=>{
        console.log(data);
        if(err){
         return res.status(400).json({error:"Cannot get the receipts"});
        }
        if(!err&&data){
        return res.json(data);
        }
    })
}