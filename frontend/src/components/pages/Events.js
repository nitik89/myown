import React, { useEffect, useState,useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { getAllEvents } from '../apicalls/auth/eventcalls';
import Base from '../basic/Base'
import '../basic/Loading.css';
import '../basic/Cards.css';
import './Events.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../basic/button.css';
function Events() {
const [events,setEvents]=useState([]);
const {state,dispatch}=useContext(UserContext);
const [problem,setProblem]=useState(0);
const user=JSON.parse(localStorage.getItem("user"));
const token=localStorage.getItem("jwt");
const [loading,setLoading]=useState(true);
let error=0;

let cart=state?.cart?state.cart:[];



const getEvents=()=>{
    getAllEvents(user._id,token).then(res=>{
        setLoading(false);
        setEvents(res);
    })
}
const addToCart = (id)=>{
    
events.map(data=>{
    if(data._id==id){
        cart.map(evnts=>{
            if(evnts._id==id){
                toast.error("Item is already in the cart");
                error=1
           
            }
        })
        
        if(error==0){
            toast.success("Item added successfully to cart");
        cart.push(data);
        
        }
        
    }
     
       
    
    
    

})

localStorage.setItem("cart",JSON.stringify(cart));
  
dispatch({type:"ADDTOCART",payload:cart})

error=0;
    

}
useEffect(()=>{
   
    getEvents();
},[])

    return (
        <Base>
        <ToastContainer/>
        <div >
 <h1 className="font-weight-bold heading text-center"><span className="spanner">ALL</span> THE <span className="spanner">EVENTS</span></h1>
{loading? <div className="loader">Loading...</div>:(
    
    <div className="container">
       
    <div className="row m-4 pt-3">
        {events?.map(evnts=>{
            return (
             <div className="col-sm-12 col-md-6 col-xl-4 p-4">
             <div class="login-card-purple p-3 shadow-lg rounded border " >
<div class="card-header">

<h6 className=" font-weight-bold">
    <span clasName="subheading mr-2"style={{fontSize:"20px",color:"white"}}> Event's Name: </span>
     <span className="text-warning"> {evnts.name} </span></h6>
</div>

<ul class="list-group shadow-lg">

  <li class="list-group-item list-group-item " style={{fontSize:"20px"}}>No of students: {evnts.numberofstudents}</li>
  <li class="list-group-item list-group-item-" style={{fontSize:"20px" }}>Price: {evnts.price}</li>

  <li class="list-group-item list-group-item-warning">
      <Link to={`events/${evnts._id}`} className="text-white">
           <btn className="btn btn-info firstbutton p-2">Details</btn> </Link>  
           <btn className="btn btn-outline-success secondbutton p-2" onClick={()=>addToCart(evnts._id)}>Add To Cart</btn> </li>
  
</ul>
</div>
             </div>


            )
        })}
       
    </div>
</div>

)}
</div>
        </Base>
    )
}

export default Events
