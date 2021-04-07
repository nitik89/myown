import React, { useEffect, useState,useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import { getAllEvents } from '../apicalls/auth/eventcalls';
import Base from '../basic/Base'
import '../basic/Loading.css';

import '../basic/Cards.css';
import './Events.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../basic/button.css';
import { orderMyEvents } from '../../helper/carthellper';
function Events() {
const [events,setEvents]=useState([]);
const {state,dispatch}=useContext(UserContext);
const [problem,setProblem]=useState(0);
const user=JSON.parse(localStorage.getItem("user"));
const token=localStorage.getItem("jwt");
const [loading,setLoading]=useState(true);
let error=0;
const history=useHistory();
let cart=state?.cart?state.cart:[];
let registered=state?.events;
let check=0;

const registerMe=(eventId)=>{

const idx=registered.findIndex(evnts=>evnts==eventId)
if(idx!=-1){
    check=1;
    toast.error("You are already registered");
}
if(check==0){
const data=[];
    events.map(evnts=>{
        if(evnts._id==eventId){
            data.push(evnts);
        }
    })
    orderMyEvents({products:data},user._id,token).then(res=>{
        if(res.status=="Recieved"){
            
            const evnts=user.events;
            
            res.products.map(ev=>{
              evnts.push(ev._id);
            })
            
            const newuser={...user,events:evnts};
            localStorage.setItem("user",JSON.stringify(newuser));
            dispatch({type:"UPDATETHEEVENTS",payload:evnts});
           
            toast("Registered Successfully");
            setTimeout(()=>{
                     
                history.push('/');
              },3000);

        }
        else{
            toast.error("Could not register");
        }
        
    });
    check=0;
}}
const getEvents=()=>{
    getAllEvents(user._id,token).then(res=>{
        setLoading(false);
        toast("Fetched Successfully");
        setEvents(res);
    }).catch(err=>{

        setLoading(false);
        toast.error("Couldn't load")
    })
}
const addToCart = (id)=>{
    console.log(id);
    registered.map(evnts=>{
        
        if(evnts==id){
            check=1;
            console.log("yes");
            toast.error("You are already registered");
           
        }
    });
    if(check==0){
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
     
       
    
    
    

})}

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
<div class="card-header" >
<img src={`/${evnts?.photo}`} class="card-img-top" height="200rem" width="auto" alt={evnts.name}/>
<h6 className=" font-weight-bold mt-4">

    <span clasName="subheading mr-2"style={{fontSize:"20px",color:"white"}}> Event's Name: </span>
     <span className="text-warning "> {evnts.name} </span></h6>
</div>

<ul class="list-group shadow-lg">

  
  {evnts?.price>0?(<li class="list-group-item list-group-item-" style={{fontSize:"20px" }}>Price:Rs {evnts.price}</li>):<li class="list-group-item list-group-item-" style={{fontSize:"20px" }}>Register for free</li>}
  

  <li class="list-group-item list-group-item-warning">
      <Link to={`events/${evnts._id}`} className="text-white">
           <btn className="btn btn-info firstbutton p-2">Details</btn> </Link> 
           <>
           {evnts?.active?(
               <>
                 {evnts?.price>0?(
                    <btn className="btn btn-outline-success secondbutton p-2" onClick={()=>addToCart(evnts._id)}>Add To Cart</btn> 
                   ):(<btn className="btn btn-outline-success secondbutton p-2" onClick={()=>registerMe(evnts._id)}>Register Now</btn> )}
                   </>
           ):(<p className="p-2">Registrations will open shortly</p>)}
          </>
           </li>
           
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
