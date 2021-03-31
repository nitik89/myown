import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { getMyStudents } from '../apicalls/auth/eventcalls';
import Base from '../basic/Base';



function ManageStudents() {
    const {state,dispatch}=useContext(UserContext);
    const [students,setStudents]=useState([]);
    const user=JSON.parse(localStorage.getItem("user"));
    const token=localStorage.getItem("jwt");
    useEffect(()=>{
        if(state?._id){
            getMyStudents(state?._id,token).then(data=>{
                if(data){
                if(data.error){
                    console.log(data.error)
                }
                else{
                    
                    setStudents(data);
                }
            }
            })
        }
    },[state])
    const adminLeftSide=()=>{
        return (
            <div class="card text-white  mb-3 offset-1" >
  <div class="card-header bg-success">Choose Any Option</div>
  <div class="card-body">
  <ul class="list-group">
  
  <li class="list-group-item list-group-item-light">
      <Link to="/eventManager/manage" className="nav-link text-success"> Manage Students</Link></li>
 
  </ul>
   
  
  </div>
</div>
        )
    }
    const adminRight=()=>{
        return(
            <div class="card offset-1"  >
            <div class="card-header bg-dark text-white ">
              Event Manager Info
            </div>
            <ul class="list-group list-group-flush spanner">
                {students?.map(evnts=>{
                   return  evnts.enrolledStudents.map(student=>{
                        return <li class="list-group-item spanner">
                            Name: {student.firstname} {student.lastname}  Year: {student.year}  Contact_no: {student.contact_no}
                        </li>
                    })
                })}
            
            </ul>
          </div>
        )

    }
    return (
        <Base title="Welcome to the Event Manager dashboard">
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

export default ManageStudents
