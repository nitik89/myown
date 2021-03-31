import React, { useContext } from 'react'
import {Route,Redirect} from 'react-router-dom'
import { UserContext } from '../App';


const AdminRoute=({ component:Component, ...rest })=>{
    const {state,dispatch}=useContext(UserContext);
  
   const user=JSON.parse(localStorage.getItem("user"));
    return (
      <Route
        {...rest}
        render={props =>
          user && user?.role==1  ? (
            <Component {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: "/studentlogin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

export default AdminRoute
