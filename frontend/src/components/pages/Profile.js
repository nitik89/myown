import React, { useContext, useEffect, useState } from 'react'

import { UserContext } from '../../App'
import { getMyOrders } from '../apicalls/auth/eventcalls';
import Base from '../basic/Base'
import './Events.css';
import './Profile.css';
import '../basic/Loading.css';
function Profile() {
    const {state,dispatch}=useContext(UserContext);
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
  
    const token=localStorage.getItem("jwt");
    const user=JSON.parse(localStorage.getItem("user"));
    useEffect(()=>{

        if(user){
            
        if(user._id){
            setLoading(true);
            getMyOrders(user._id,token).then(res=>{
                if(res.error){
                    
                    setLoading(false);
                }
                else{
                    setData(res);
                    setLoading(false);
                }
            })
        }
    }

      
       
    },[state])
    return (
        <div> 
            <Base/>
            <h1 className="spanner text-center">PROFILE PAGE</h1>
            <div className="container">
            <div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="row container d-flex justify-content-center">
            <div class="col-xl-12 col-md-12">
                <div class="card user-card-full">
                    <div class="row m-l-0 m-r-0">
                        <div class="col-sm-4 bg-c-lite-green user-profile">
                            <div class="card-block text-center text-white">
                                <div class="m-b-25"> <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image"/> </div>
                                <h6 class="f-w-600 text-white">
                                    {user?.firstname.toUpperCase()} {user?.lastname.toUpperCase()}
                                    </h6>
                                
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="card-block">
                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Email</p>
                                        <h6 class="text-muted f-w-400 spanner">{user?.email}</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Phone</p>
                                        <h6 class="text-muted f-w-400 spanner">{user?.contact_no}</h6>
                                    </div>
                                </div>
                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Payment Status</h6>
                                <div class="row">
                                <div class="col-sm-12">
                                {loading? <div className="loader">Loading...</div>:(
                                    <div class="table-responsive">
                                    <table class="table ">
                                    <thead>
                                      <tr>
                                        <th scope="col spanner">#</th>
                                        <th scope="col heading">Status</th>
                                        <th scope="col heading">Payment_id</th>
                                        <th scope="col heading">Amount</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      
                                      {data?.map((evnts,idx)=>{
                                         return (
                                             <>
                                             <tr>
                                         <th scope="row">{idx+1}</th>
                                         <td>{evnts.status}</td> 
                                            <td>{evnts.payment_id}</td> 
                                            <td>Rs {evnts.amount}</td>
                                            </tr>
                                             </>
                                         )
                                      })}
                                      
                                      
                                      </tbody>
                                    </table>
                                  </div>

                                )
                                }
                                
                                
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
           </div>
        </div>
    )
}

export default Profile
