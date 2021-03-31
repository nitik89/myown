import React, { useContext } from 'react'
import {Route,Redirect} from 'react-router-dom'
import { UserContext } from '../App';


const EventRoute=({ component:Component, ...rest })=>{
    const {state,dispatch}=useContext(UserContext);
    const user=JSON.parse(localStorage.getItem("user"));
    
   

    
    return (
      <Route
        {...rest}
        render={props =>
        user && user?.role==1 || user?.role==2 ? (
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

export default EventRoute
