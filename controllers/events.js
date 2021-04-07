const User = require("../models/userSchema")

const Events = require('../models/eventsSchema');
const multer=require('multer');
const moment=require('moment');
let DIR="./public/";
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,DIR)
    },
    filename: function (req, file, cb) {
     
      cb(null, file.fieldname + '-' + Date.now()+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
  })

let upload = multer({ storage: storage }).single('photo');



exports.getAllEventManagers = (req, res) => {

    User.find({ role: 2 })
    .select("firstname lastname   contact_no  rollno year allocatedEvent")
    .populate("allocatedEvent")
    .exec((err, cat) => {
        if (err) {
            return res.status(400).json({ error: "Not able to find categories" });
        }
        return res.json(cat);
    })
}

exports.createEvents = (req, res) => {
    
upload(req,res,err=>{

    if(err){
        return res.status(422).json({error:"An error has occured"})
    }
    else{


        
        const { name, duration, price,  datetime, event_manager,url } = req.body;
      
        
    let image=req.file.filename;

    if(!name|| !duration|| !price|| !datetime||  !event_manager||!url){
        return res.status(422).json({error:"Please fill all the fields"});
    }
    Events.findOne({name:name}).then((d)=>{
        if(d){
        return res.status(422).json({error:"This name already exists"});
        }
    console.log(datetime);
    let date = new Date(datetime);
 const todaydate=date.toISOString();
   
    const events = new Events({ name, duration, price, datetime: todaydate, event_manager,photo:image,url })
    

    events.save().then(result => {
        if (result) {
            User.findByIdAndUpdate({ _id: event_manager }, { $push: { allocatedEvent: result._id } }, { new: true }).then(updated => {
                return res.json({ message: "Created event" });
            })

        }

    }).catch(err => {
        console.log(err);
    })
})
       
    }
})
    
}
exports.changeStatus=(req,res)=>{
    const id=req.params.EventId;
   
    Events.findOne({_id:id}).then((data)=>{
        
        if(!data){
            return res.status(400).json({ error: "Not able to find event" });
        }
    
        const {active}=data;
      
        const changed=!active;
        
        Events.updateOne({_id:id},{$set:{active:changed}},{new:true}).exec((err,data)=>{
     
            if(err){
                return res.status(400).json({error:"Could not update the status"})
            }
            if(data){
                return res.json({message:"Changed"});
            }
        })
    })
}
exports.getAllEvents = (req, res) => {
   
    Events.find().lean().populate("event_manager").exec((err, cat) => {
        if (err) {
            return res.status(400).json({ error: "Not able to find event" });
        }

        const data = cat.map(evnts => {
            const date = new Date(evnts.datetime);
            const dt=date.getUTCDate().toString();
            const hrs = date.getUTCHours().toString();
            const minutes=date.getUTCMinutes().toString();
            const month=date.getUTCMonth().toString();
            const year=date.getUTCFullYear().toString();

            const fulldate=hrs+":"+minutes+" "+dt+"-"+month+"-"+year;
       
            return {...evnts, fulldate };
        })


        return res.json(data);
    })
}

exports.getEventById = (req, res) => {
    const event_id = req.params.id;
   
    Events.findOne({ _id: event_id }).lean().populate("event_manager","firstname lastname email contact_no").exec((err, event) => {
        if (err) {
            return res.status(400).json({ error: "Not able to find the event" })
        }
        const { datetime } = event;
        
        const fulldate=moment(datetime).format("h:mm a MMM DD, YYYY") 
        console.log(fulldate)
        
      
      
        

        
        
       
        const data = {...event, fulldate }
        return res.json(data);

    })
}

exports.getAllStudents = (req, res) => {

    User.find({ events: { $gt: [] } }).select("firstname lastname   contact_no  rollno year events").populate({ path: "events", select: "name event_manager", populate: { path: "event_manager", model: "User", select: "firstname lastname" } }).sort("firstname").exec((err, cat) => {
        if (err) {
            return res.status(400).json({ error: "Not able to find categpries" });
        }



        
        return res.json(cat);
    })
}
exports.deleteEvents=(req,res)=>{
Events.findOne({_id:req.params.id}).exec((err,event)=>{
    if(err||!event){
        return res.status(422).json({error:"No event exists!!"})
    }
    if(event){
        User.findOne({id:event.event_manager._id},{$pull:{allocatedEvent:event._id}})
        .exec((err,data)=>{
            event.remove().then(result=>{
                
                return res.json({message:"Deleted Successfully!"});
            })
            .catch(err=>{
                return res.json({error:err})
            })

        })
        
        
    }
})
}
exports.deleteEventManagers=(req,res)=>{
    User.findOne({_id:req.params.id}).exec((err,event)=>{
        if(err||!event){
            return res.status(422).json({error:"No user exists!!"})
        }
        
        if(event){
          
            event.remove().then(result=>{
                return res.json({message:"Deleted Successfully!"})
            })
            .catch(err=>{
                return res.json(err);
            })
           
        }
    })
}

exports.getOnlyMyStudents=(req,res)=>{
    const myid=req.params.userId;
  
    Events.find({ event_manager:myid}).populate("enrolledStudents").exec((err,data)=>{
      
        if(data){

            return res.json(data);
        }
        if(err){
            return res.json({error:"Cannot get the students"});
        }
    })
}