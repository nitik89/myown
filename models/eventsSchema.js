var mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
var eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true

    },
    

    price: {
        type: Number,
        required: true

    },
  
    event_manager: {
        type: ObjectId,
        ref: "User",

    },
    photo:{
        type:String,
        trim:true,
        require:true
    },
    url:{
        type:String
    },
   
    datetime: {
        type: Date,
        required: true

    },
    duration:{
        type:String
    },
    active:{
        type:Boolean,
        default:true
    },
    enrolledStudents: [{
        type: ObjectId,
        ref: "User"
    }]



})
module.exports = mongoose.model("Events", eventSchema);