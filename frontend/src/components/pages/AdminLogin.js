
import React, { useState } from 'react'
import { signin } from '../apicalls/auth/authcalls';

import Base from '../basic/Base'

function AdminLogin() {
   
  const[values,setValues]=useState({email:"",password:""})
  const {email,password}=values;
  const handleChange=event=>{
    
     setValues({...values,[event.target.name]:event.target.value})
   }
   const onSubmit=event=>{
    event.preventDefault();
    signin({email,password})
    .then(res=>{
      
      if(res.user.role!==1){
          console.log("you are not the admin")
      }
    }).catch(err=>{
      console.log(err);
    })
  }
    
    const createProductForm = () => (
        <form className="container" >
         
          <div className="form-group">
            <input
            type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={(event)=>{handleChange(event)}}
           
            />
          </div>
          <div className="form-group">
            <input
            type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={(event)=>{handleChange(event)}}
           
            />
          </div>
      
        
          
          
          
          <button type="submit"  className="btn btn-block btn-outline-success" onClick={onSubmit}>
            Signup
          </button>
        </form>
      );
    return (
        <div >
        <Base title="Student Login Here" />
        {createProductForm()}
        </div>
    )
}

export default AdminLogin
