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
    const [values, setValues] = useState({
        name: "",
      price:"",
      location:"",
      numberofstudents:"",
      event_manager:"",
      datetime:""
     
     
    });
    const token=localStorage.getItem("jwt");
  
    const [managers,setManagers]=useState([]);
    const {name,price,location,numberofstudents,event_manager,datetime}=values;
  
    const getAll=()=>{
      getAllEventManagers(state?._id,token).then(users=>{
        setManagers(users);
      })

      
    }

    useEffect(()=>{
      getAll();
    },[])
  
    const handleChange=event=>{
     
      setValues({...values,[event.target.name]:event.target.value})
    }
    const onSubmit=event=>{
      event.preventDefault();
      
      createEvent( {name,price,location,numberofstudents,event_manager,datetime},state?._id,token)
      .then(res=>{
        if(res.message){
          toast(res.message);
        }
        if(res.error){
          toast.error(res.error);
        }
      })
  
  
    }
  
      const createProductForm = () => (
          <form className="container p-4" >
           
            <div className="form-group">
              <input
              type="text"
                name="name"
                className="form-control"
                placeholder="Name of the Event"
                onChange={(event)=>{handleChange(event)}}
                value={name}
             
              />
            </div>
            <div className="form-group">
              <input
              type="number"
                name="price"
                className="form-control"
                placeholder="Price"
                onChange={(event)=>{handleChange(event)}}
                value={price}
  
             
              />
            </div>
            <div className="form-group">
              <input
              type="text"
                name="location"
                className="form-control"
                placeholder="Location"
                onChange={(event)=>{handleChange(event)}}
                value={location}
             
              />
            </div>
            <div className="form-group">
              <input
              type="number"
                name="numberofstudents"
                className="form-control"
                placeholder="Max of Participants"
                onChange={(event)=>{handleChange(event)}}
                value={numberofstudents}
             
              />
            </div>
            
        
            <div className="form-group">
              <input
              type="datetime-local"
                name="datetime"
                className="form-control"
               placeholder="Date and Time"
                onChange={(event)=>{handleChange(event)}}
                value={datetime}
              />
            </div>
        
          
            <div className="form-group">
              <select
                
                className="form-control"
                name="event_manager"
                placeholder="Event Managers"
                onChange={(event)=>{handleChange(event)}}
               
              >
                <option>Select the manager</option>
               {managers.map(mng=>{
                 return <option value={mng._id}>{mng.firstname} {mng.lastname}</option>
               })}
              </select>
            </div>
            
            
            <button type="submit"  className="btn btn-block btn-success" onClick={onSubmit}>
              Add Event Manager
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
             Add the Event Managers
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


