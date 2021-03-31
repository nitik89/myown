import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Base from '../basic/Base';



function EventManagerDashboard() {
    const {state,dispatch}=useContext(UserContext);
    console.log(state);
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
            <ul class="list-group list-group-flush">
              <li class="list-group-item spanner">Name <span className="badge badge-warning mr-3"> {state?.firstname} {state?.lastname} </span> </li>
              <li class="list-group-item spanner">Email: <span className="badge badge-success mr-3"> {state?.email} </span> </li>
              <li class="list-group-item spanner">
                  Event's Details:
                  {state?.allocatedEvent?.map(evnts=>{
                      return(<li class="list-group-item spanner">
                          Name:{evnts.name},
                          Price:{evnts.price},
                          Location:{evnts.location}
                          </li>)
                  })}
                   </li>
              <li class="list-group-item spanner"><span className="badge badge-danger mr-3"> Event Manager </span> </li>
              
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

export default EventManagerDashboard
