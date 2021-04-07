const { validationResult } = require("express-validator");
const User = require("../models/userSchema")
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

const {JWT_SECRET}=require('../config/keys');

exports.signup = (req, res) => {
    


    const { email, firstname, lastname, password, rollno, contact_no, year } = req.body;
    if(!email|| !firstname || !lastname || !password ||!rollno|| !contact_no|| !year){
        return res.status(422).json({error:"Fill all the details"});
    }


  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
  //Contact number validation//////////////////////////
  if (contact_no == "" || contact_no == null) {
    return res.status(422).json({error:"Plese fill correct contact number"});
  }
  if (contact_no.length< 10 || contact_no.length > 10) {
    return res.status(422).json({error:"Mobile No. is not valid, Please Enter 10 Digit Mobile No."});
  
  }
  if(contact_no[0]!=6&&contact_no[0]!=8&&contact_no[0]!=7&&contact_no[0]!=9){
    return res.status(422).json({error:"Mobile No is wrong"});
  }
    
  User.findOne({ email: email }).then((use) => {
        if (use) {
            return res.status(422).json({ error: "The email id exists" });
        }
        let role = 0;

        if (req.body.role) {
            role = req.body.role;
        }
        
        const user = new User({ email, firstname, lastname, password, rollno, contact_no, year, role })
        user.save().then((user, err) => {
            if (user) {

                return res.json({ message: "Signup Successful" });
            } if(err){
                return res.json({ error: "Error in saving user to database" })
            }

        }).catch(err => {
            console.log(err)
        })

    })
}




exports.signin = (req, res) => {

    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).json({error:"Please fill out all the fields"});
    }
    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
    User.findOne({email:email }).populate("allocatedEvent").exec((err, user) => {

        if (err || !user) {
            return res.status(400).json({ error: "User does not exists" })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({ error: "Email and password do not match" })
        }
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);

        //put token in cookie
        res.cookie("token", token, { expire: new Date() + 9999 });
        req.auth = user;

        //send response to the front 

        const { _id, firstname, lastname, email, role, allocatedEvent,contact_no,events} = user;
        return res.json({ token, user: { _id, firstname, lastname, email, role, contact_no,allocatedEvent,events } });
    })


}

exports.isSignedIn = expressJwt({
    secret: JWT_SECRET,
    userProperty: "auth" //this will put an req.auth with an id
})


exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
      return res.status(403).json({
        error: "ACCESS DENIED"
      });
    }
    next();
  };
  
  exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0 ||req.profile.role===2) {
      return res.status(403).json({
        error: "You are not ADMIN, Access denied"
      });
    }
    next();
  };
exports.isEventManager = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({ error: "You are not the admin,Access Denied" })
    }
    next();
}

exports.eventmanager = (req, res) => {
    const { email, firstname, lastname, password, rollno, contact_no, year } = req.body;

    User.findOne({ email: email }, (use) => {
        if (use) {
            return res.status(422).json({ error: "User already exists" });
        }
        const user = new User({ email, firstname, lastname, password, rollno, contact_no, year, role: 2 })
        user.save().then((user, err) => {
            if (user) {
                return res.json({ message: "User is saved to database" });
            } else {
                return res.json({ error: "Error in saving user to database" })
            }

        }).catch(err => {
            return res.json({error:err});
        })

    })

}