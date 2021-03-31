import React, { useContext, useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App'
import { getAllEventManagers, getAllEventStudents } from '../apicalls/auth/eventcalls';
import Base from '../basic/Base'


function AdminManageStudents() {
    const {state,dispatch}=useContext(UserContext);
    const [students,setStudents]=useState([]);
    const user=JSON.parse(localStorage.getItem("user"));
    const token=localStorage.getItem("jwt");

    const  getManagers=()=>{
        getAllEventStudents(user._id,token).then(user=>{
            if(user){
                setStudents(user);
            }
        })
    }
    useEffect(() => {
        
       getManagers();
    }, [])
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
             Event Managers detail
            </div>
            {students.map(users=>{
                return(
                    <ul class="list-group list-group-flush m-3">
                    <li class="list-group-item spanner">Name: <span className="badge badge-warning mr-3">{users.firstname} {users.lastname} {users.rollno}  {users.contact_no}</span> </li>
                    <li class="list-group-item">
                        <ul>
                   {users.events.map(evnts=>{
                       return(
                          
                            
                           <li>{evnts.name}</li>
                       )
                   })}
                   </ul>
                   </li>
                    
                  </ul>

                )
            })}
          
          </div>
        )

    }
    return (
        <Base title="Welcome to the admin dashboard">
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

export default AdminManageStudents
