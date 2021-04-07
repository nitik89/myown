import React, { useContext,useState } from 'react'
import { UserContext } from '../../App';
import { orderMyEvents } from '../../helper/carthellper';
import { API } from '../basic/backend';
import {useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Events.css';

import '../basic/Loading.css';
import '../basic/button.css';

import Base from '../basic/Base'

const loadScript=(linkof)=>{
    return new Promise((resolve=>{
        const script=document.createElement("script");
        script.src=linkof
        document.body.appendChild(script);
        script.onload=()=>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script)
        
    }))
    
 }
 
function Cart() {
    const {state,dispatch}=useContext(UserContext);
    const [loading,setLoading]=useState(false);
    const history=useHistory();
    console.log(state);
   
    const token=localStorage.getItem("jwt");
    const cart=localStorage.getItem("cart");
    const tempCart=cart;
    let len=0;
    if(cart){
      const mycart=JSON.parse(localStorage.getItem("cart"));
      len=mycart.length
    }
    const user=JSON.parse(localStorage.getItem("user"));
    let total=0;
   async function showRazorPay(){
       setLoading(true);
        const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            alert('Razor pay SDK failed');
            return 
        }
        const data = await fetch(`/api/razorpay/${user._id}`, { method: 'POST', headers: {
            Accept: "application/json",
            "Authorization":`Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({products:state?.cart}) 
    }).then((t) =>
    

        t.json()
        
    )

    setLoading(false);
        
        const  options = {
            key:  'rzp_test_LiMeEbFXgq98S8' ,
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'For Compuwave',
			description: 'Thank you for registering in the events',
			
			handler: function (response) {
               fetch(`/api/verification/${user._id}`,{method:"POST",headers:{
                    Accept: "application/json",
                    "Authorization":`Bearer ${token}`,

                    "Content-Type": "application/json"
                },
                body:JSON.stringify({ payment_id:response.razorpay_payment_id,
                    order_id:response.razorpay_order_id,
                    signature:response.razorpay_signature})
                   
            }).then(t=>{
                
               return  t.json()
            }).then(ans=>{
               
                if(ans.status=="success"){

                    orderMyEvents({products:state?.cart,amount: (data.amount/100).toString(),order_id:ans.order_id,payment_id:ans.payment_id},state?._id,token)
                    .then(data=>{
                      console.log(data.products);
                      const evnts=user.events;
                      console.log(evnts);
                      data.products.map(ev=>{
                        evnts.push(ev._id);
                      })
                      
                      const newuser={...user,events:evnts};
                      localStorage.setItem("user",JSON.stringify(newuser));
                      dispatch({type:"UPDATETHEEVENTS",payload:evnts});
                    });
                   
                   
                    dispatch({type:"CLEARCART"});
                    
                    localStorage.removeItem("cart");
                    toast("Order is Completed");
                    setTimeout(()=>{
                     
                      history.push('/');
                    },3000);
                  }
                  else{
                    toast.error("Error!! Try again")
                  }
            })
           
				
			},
			prefill: {
				name:state.firstname+" "+state.lastname,
				email: state.email,
				phone_number:''
			}
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open()
       

    }
    const removeFromCart=(id)=>{
        
        dispatch({type:"REMOVEFROMCART",payload:id});
        toast("Item removed");
    }
   
   
        
    const rightSide=()=>{
       
        return(   <div>
            {state?.cart?.length>0?state?.cart?.map(evnts=>{
                total=evnts.price+total;
                return (
                   <></>
            
                
                    )
                    
                
            } ):<></>} 
{state?.cart?.length>0? (
    <>

     <div class="card mb-3">
                    <div class="card-body shadow-lg  border-secondary">
            
                      <h5 class="mb-3 spanner">Grand total</h5>
                      <hr class="mb-4"/>
                      <ul class="list-group list-group-flush">
                        
                        <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                          <div>
                            <strong>The total amount of</strong>
                          
                          </div>
                          <span><strong>Rs:{total}</strong></span>
                          {loading? <div className="loader">Loading...</div>:<></>}
                        </li>
                      </ul>
                      
                      <btn className="btn btn-success firstbutton" onClick={showRazorPay}>Pay Now</btn>
                      
                    </div>
                  </div>
  
  
    </>

):<></>}
                
            </div>)
            
        
    }

    const leftSide=()=>{
     return(   <div>
            <h5 class="mb-4 heading">Your Cart <span className="spanner ">{len}</span> items</h5>
        {state?.cart?state.cart.map(evnts=>{
            return (
                <>
                <div class="card wish-list mb-3">
                <div class="card-body shadow-lg  border-secondary ">
        
                 
        
                  <div class="row mb-4">
                    <div class="col-md-5 col-lg-3 col-xl-3 ">
                      <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                      
                        <a href="#!">
                          <div class="mask waves-effect waves-light">
                          
                            <div class="mask rgba-black-slight waves-effect waves-light"></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div class="col-md-7 col-lg-9 col-xl-9">
                      <div>
                        <div class="d-flex justify-content-between ">
                          <div>
                            <h5 className="heading ">{evnts.name}</h5>
                          
                          </div>
                          <div>
                            
                            
                          </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                           <btn class="btn btn-danger secondbutton"  onClick={()=>{removeFromCart(evnts._id)}}>
                               RemoveItem <i class="bi bi-trash" ></i>
                            </btn>
                          </div>
                          <p class="mb-0"><span><strong>Rs {evnts.price}</strong></span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="mb-4"/>
                
        
                </div>
              </div>
            
             
            
        
         
            </>
                )
        }):<></>}   
        </div>)
    }

    return (
      <Base >
          <ToastContainer/>
      <h1 className="text-center heading"><span className="spanner"> Here</span> Is Your <span className="spanner"> Cart</span>  </h1>
          <div className="container">
              <div className="row">
                  <div className="col-sm-12 col-lg-7">
                  {leftSide()}
                
                  </div>
                  <div className="col-sm-12 col-lg-4 ">
                      {rightSide()}
                      
                      </div>
              </div>
          </div>
    
      </Base>
    )
}

export default Cart
