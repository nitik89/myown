import React, { useContext, useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App'
import { deleteEvents, getAllEvents,changeStats } from '../apicalls/auth/eventcalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Base from '../basic/Base'

function ManageEvents() {
    const {state,dispatch}=useContext(UserContext);
    const [managers,setManagers]=useState([]);
    const user=JSON.parse(localStorage.getItem("user"));
    const token=localStorage.getItem("jwt");
console.log(managers);
    const  getManagers=()=>{
        getAllEvents(user._id,token).then(user=>{
            if(user){
                setManagers(user);
            }
        })
    }
    useEffect(() => {
        
       getManagers();
    }, []);
    const changeStatus=(Eventid)=>{
        changeStats(Eventid,user._id,token).then(data=>{
if(data){
    if(data.message){
        const idx=managers.findIndex(evnts=>evnts._id==Eventid);
        const what=managers[idx].active;
        managers[idx].active=!what;
        const newmanagers=[...managers];
        setManagers(newmanagers);
    }
}
        }).catch(err=>{
            console.log(err);
        })
    }
    const deleteEvent=(id)=>{
        deleteEvents(id,user._id,token).then(res=>{
            if(res.message==="Deleted Successfully!"){

            const newmng=managers?.filter(mng=>{
                return mng._id!=id
            })
            setManagers(newmng);
            
            toast(res.message);
        }
        else{
            toast.error(res.error)

        }
        })

    }
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
                <ToastContainer/>
            <div class="card-header bg-dark text-white ">
             Events detail
            </div>
            {managers?.map((evnts,idx)=>{
                return(
                   
                    <ul class="list-group list-group-flush m-3">
                        
                    <li class="list-group-item spanner">{idx+1}: Name <span className="badge badge-warning mr-3"> {evnts?.name} </span> </li>
                    <li class="list-group-item spanner">Rollno: <span className="badge badge-success mr-3">{evnts?.location} </span> </li>
                    <li class="list-group-item spanner"> Contact No: <span className="badge badge-danger mr-3"> {evnts?.numberofstudents} </span> </li>
                    <li class="list-group-item spanner"> Allocated Event Manager: <span className="badge badge-danger mr-3"> {evnts?.event_manager?.firstname} {evnts?.event_manager?.lastname} </span> </li>
                    <li class="list-group-item spanner"> Event Status: csd<span className="badge badge-danger mr-3"> {evnts?.active?<p>true</p>:<p>false</p>}</span> </li>
                    <li class="list-group-item spanner"> Price: Rs<span className="badge badge-danger mr-3"> {evnts?.price} </span> </li>
                    <li class="list-group-item "> <button type="button" class="btn btn-danger" onClick={()=>{deleteEvent(evnts?._id)}}>Delete</button> </li>
                    <li class="list-group-item "> <button type="button" class="btn btn-danger" onClick={()=>{changeStatus(evnts?._id)}}>Change Status</button> </li>
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

export default ManageEvents
