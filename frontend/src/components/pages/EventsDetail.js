import React, { useEffect, useState,useContext } from 'react'
import { useParams } from 'react-router-dom'
import { getEventById } from '../apicalls/auth/eventcalls';
import Base from '../basic/Base';
import './Events.css';
import { UserContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../basic/button.css';

function EventsDetail() {                                             
   const {eventid} =useParams();
   const [details,setDeatils]=useState({})
   const {state,dispatch}=useContext(UserContext);
   const user=JSON.parse(localStorage.getItem("user"));
   const token=localStorage.getItem("jwt");
   const [loading,setLoading]=useState(false);
   let error=0;
   let cart=state?.cart?state.cart:[];
   
    useEffect(()=>{
       setLoading(true);
        getEventById(eventid,user._id,token).then(data=>{
          
            setDeatils(data);

            setLoading(false);
            toast("Fetched Successfully");
        }).catch(err=>{

          setLoading(false);
          toast.error("Couldn't fetch try a refersh");
          
        })
    },[eventid])

    const addToCart = (id)=>{
    
     
          
              cart.map(evnts=>{
                  if(evnts._id==id){
                      toast.error("Item is already in the cart");
                      error=1
                 
                  }
              })
              
              if(error==0){
                  toast.success("Item added successfully to cart");
              cart.push(details);
              localStorage.setItem("cart",JSON.stringify(cart));
        
              dispatch({type:"ADDTOCART",payload:cart})
              
             
              
              }
              
          }
      
     
          
      
      
    return (
      <div>
       <Base/>
       <ToastContainer/>
       <h1 className="heading text-center"><span className="spanner ">The</span> Details of the <span className="spanner">Event</span></h1>

{loading?(

<div className="loader">Loading...</div>
):
<div class="container text-warning  d-flex justify-content-center shadow-lg text-center border border-secondary w-50  background" style={{height:"auto"}}>
  <div class="row">
   
    
  

      <h5 className="text-white heading mt-2">{details?.name}</h5>
    
      
      
      <div class="table-responsive bg-white  mb-3 p-3 ">
        <table class="table table-sm table-borderless ">
          <tbody>
            <tr>
              <th class="pl-0 w-25" scope="row"><strong>Event Manager</strong></th>
              <td>{details?.event_manager?.firstname} {details?.event_manager?.lastname}</td>
            </tr>
            <hr/>
            <tr>
              <th class="pl-0 w-25" scope="row"><strong>Contact_no</strong></th>
              <td>{details?.event_manager?.contact_no} </td>
            </tr>
            <hr/>
            <tr>
              <th class="pl-0 w-25" scope="row"><strong>No of Students</strong></th>
              <td>{details?.numberofstudents}</td>
            </tr>
            <hr/>
            <tr>
              <th class="pl-0 w-25" scope="row"><strong>Timming</strong></th>
              <td>{details?.fulldate}</td>
            </tr>
            <hr/>
            <tr>
              <th class="pl-0 w-25" scope="row"><strong>Price</strong></th>
              <td>{details?.price}</td>
            </tr>
            <hr/>
            <tr>
              <th class="pl-0 w-25" scope="row"><strong>Location</strong></th>
              <td>{details?.location}</td>
            </tr>
          </tbody>
        </table>
        <button type="button" class="btn btn-light btn-lg btn-block firstbutton m-3" onClick={()=>{addToCart(details?._id)}}><i
          class="fas fa-shopping-cart "></i>Add to cart</button>
      </div>
    
     
    
    
    </div>
  </div>
}
     


</div>

    )
}

export default EventsDetail
