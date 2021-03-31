import React, { useState,useContext } from 'react'
import { signup } from '../apicalls/auth/authcalls';
import Base from '../basic/Base'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App'


function CreateEventManager() {
    const {state,dispatch}=useContext(UserContext);
    const history=useHistory();
    const [values, setValues] = useState({
      firstname: "",
      lastname:"",
      rollno:"",
      email:"",
      password:"",
      year:""
     
     
    });
    const {firstname,lastname,rollno,email,password,year,contact_no}=values;
  
    const handleChange=event=>{

      setValues({...values,[event.target.name]:event.target.value})
    }
    const onSubmit=event=>{
      event.preventDefault();
      signup({firstname,lastname,rollno,email,password,year,contact_no,role:2})
      .then(res=>{
        if(res){
        if(res.message){
          toast(res.message);
        }

        if(res.error){
          toast.error(res.error);
        }
      }
      else{
        toast.error("Not able to fetch!")
      }
      })
  
  
    }
  
      const createProductForm = () => (
          <form className="container p-4" >
           
            <div className="form-group">
              <input
              type="text"
                name="firstname"
                className="form-control"
                placeholder="Firstname"
                onChange={(event)=>{handleChange(event)}}
                value={firstname}
             
              />
            </div>
            <div className="form-group">
              <input
              type="text"
                name="lastname"
                className="form-control"
                placeholder="Lastname"
                onChange={(event)=>{handleChange(event)}}
                value={lastname}
  
             
              />
            </div>
            <div className="form-group">
              <input
              type="text"
                name="rollno"
                className="form-control"
                placeholder="Rollno For Ex:1809185"
                onChange={(event)=>{handleChange(event)}}
                value={rollno}
             
              />
            </div>
            <div className="form-group">
              <input
              type="text"
                name="contact_no"
                className="form-control"
                placeholder="Contact no"
                onChange={(event)=>{handleChange(event)}}
                value={contact_no}
             
              />
            </div>
            
            
            <div className="form-group">
              <input
              type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                onChange={(event)=>{handleChange(event)}}
                value={email}
             
              />
            </div>
            <div className="form-group">
              <input
              type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={(event)=>{handleChange(event)}}
                value={password}
              />
            </div>
        
          
            <div className="form-group">
              <select
                
                className="form-control"
                placeholder="Year"
                name="year"
                onChange={(event)=>{handleChange(event)}}
                value={year}
              >
                <option>Year</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
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

export default CreateEventManager;


