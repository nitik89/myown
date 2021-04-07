import React, { useState,useContext, useEffect } from 'react'
import { signup } from '../apicalls/auth/authcalls';
import Base from '../basic/Base'


import { Link } from 'react-router-dom';
import { UserContext } from '../../App'
import { createEvent, getAllEventManagers } from '../apicalls/auth/eventcalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateEvents() {
    const {state,dispatch}=useContext(UserContext);
    const [name,setName]= useState("nitik");
    const [price,setPrice]=useState("");
    const [duration,setDuration]=useState("");
    const [eventManager,setEventManager]=useState("");
    const [participants,setParticipants]=useState("");
    const[datetime,setDate]=useState("");
    const[image,setImage] =useState(null);
   

    const token=localStorage.getItem("jwt");
  
    const [managers,setManagers]=useState([]);
  
    const user=JSON.parse(localStorage.getItem("user"))

    const getAll=()=>{
      getAllEventManagers(user._id,token).then(users=>{
        setManagers(users);
      })

      
    }

    useEffect(()=>{
      getAll();
    },[])
  
    
    const onSubmit=event=>{
      
      event.preventDefault();
      const formData=new FormData();
      
      formData.set('name',name);
      formData.set('price',price);
      formData.set('event_manager',eventManager);
      formData.set('duration',duration);
      formData.set('participants',participants);
      formData.set('datetime',datetime);
      formData.set('image',image);
      
      createEvent( formData,state?._id,token)
      .then(res=>{
        if(res){
        if(res.message){
          toast(res.message);
        }
        if(res.error){
          toast.error(res.error);
        }
      }
      })
  
  
    }
  
      const createProductForm = () => (
          <form className="container p-4" encType="multipart/form-data">
           
            <div className="form-group">
              <input
              type="text"
                name="name"
                className="form-control"
                placeholder="Name of the Event"
                onChange={(event)=>{setName(event.target.value)}}
                value={name}
             
              />
            </div>
            <div className="form-group">
              <input
              type="number"
                name="price"
                className="form-control"
                placeholder="Price"
                onChange={(event)=>{setPrice(event.target.value)}}
                value={price}
  
             
              />
            </div>
            <div className="form-group">
              <input
              type="text"
                name="duration"
                className="form-control"
                placeholder="Duration"
                onChange={(event)=>{setDuration(event.target.value)}}
                value={duration}
             
              />
            </div>
            <div className="form-group">
              <input
              type="file"
                name="image"
                className="form-control"
                placeholder="Location"
                onChange={(event)=>{setImage(event.target.files[0])}}
              
             
              />
            </div>
            <div className="form-group">
              <input
              type="number"
                name="numberofstudents"
                className="form-control"
                placeholder="Max of Participants"
                onChange={(event)=>{setParticipants(event.target.value)}}
                value={participants}
             
              />
            </div>
            
        
            <div className="form-group">
              <input
              type="datetime-local"
                name="datetime"
                className="form-control"
               placeholder="Date and Time"
                onChange={(event)=>{setDate(event.target.value)}}
                value={datetime}
              />
            </div>
        
          
            <div className="form-group">
              <select
                
                className="form-control"
                name="event_manager"
                placeholder="Event Managers"
                onChange={(event)=>{setEventManager(event.target.value)}}
               
              >
                <option>Select the manager</option>
               {managers?.map(mng=>{
                 return <option value={mng._id}>{mng.firstname} {mng.lastname}</option>
               })}
              </select>
            </div>
            
            
            <button type="submit"  className="btn btn-block btn-success" onClick={onSubmit}>
              Add Events
            </button>
          </form>
        );
    const adminLeftSide=()=>{
        return (
            <div class="card text-white  mb-3 offset-1" >
      
  <div class="card-header bg-success">Choose Any Option</div>
  <div class="card-body">
  <ul class="list-group">
  <li class="list-group-item list-group-item-light"><Link to="/admin/eventManage/create" className="nav-link text-success"> Create Event Manager</Link></li>
  <li class="list-group-item list-group-item-light"><Link to="/admin/eventManage/manage" className="nav-link text-success"> Manage Event Manager</Link></li>
  <li class="list-group-item list-group-item-light"><Link to="/admin/events/create" className="nav-link text-success"> Create Events</Link></li>
  <li class="list-group-item list-group-item-light"><Link to="/admin/events/manage" className="nav-link text-success">Manage Events</Link></li>
  <li class="list-group-item list-group-item-light"><Link to="/admin/students/event" className="nav-link text-success"> Manage Students</Link></li>

  </ul>
   
  
  </div>
</div>
        )
    }
    const adminRight=()=>{
        return(
            <div class="card offset-1"  >
            <div class="card-header bg-dark text-white ">
             Add the Events
            </div>
            {createProductForm()}
          </div>
        )

    }
    return (
        <Base title="Welcome to the admin dashboard">
                  <ToastContainer />
            <div class="container bg-info">
                <div className="row p-4 ">
                <div class="col-sm-12 col-lg-4">
                {adminLeftSide()}   
                    </div>
                    <div class="col-sm-12 col-lg-8">
                {adminRight()}   
                    </div>
                    </div>
            </div>
        
        </Base>
    )
}

export default CreateEvents;


const { name, duration, price, numberofstudents, datetime, event_manager } = req.body;
    
if(!name||  !price|| !numberofstudents|| !datetime||  !event_manager){
    return res.status(422).json({error:"Please fill all the fields"});
}
Events.findOne({name:name}).then((d)=>{
    if(d){
    return res.status(422).json({error:"This name already exists"});
    }

let date = new Date(datetime);
const todaydate = date.toISOString();

const events = new Events({ name, duration, price, numberofstudents, datetime: todaydate, event_manager,image:image })


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
   