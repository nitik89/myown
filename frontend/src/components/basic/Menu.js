import React, { useContext } from 'react'
import { Link,withRouter } from 'react-router-dom'
import { UserContext } from '../../App';
import { signout } from '../../helper/authhelper';
import './Menu.css';

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#E07C24" };
    } else {
      return { color: "#DAE0E2" };
    }
  };


function Menu({history,path}) {
  
  const {state,dispatch}=useContext(UserContext); 
  
  const logout=()=>{
    signout().then(res=>{
      dispatch({type:'CLEAR'});
      history.push('/studentlogin');
 
    })
  }


    
    return (
      
    <div>

      <nav className="navbar navbar-expand-md navbar-dark" style={{background:" linear-gradient(to right bottom, #673AB7 ,#9c27B0)",maxWidth:"100%"}}>
      <Link  to="/">
<a class="navbar-brand" href="#">
            <img className="logo" src="https://yt3.ggpht.com/ytc/AAUvwnj2aypY6wsl3foroDaK1dBGFk42ZhLY4GCm2tog=s900-c-k-c0x00ffffff-no-rj"/>
        </a>
       
      
</Link>

<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
  <span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="collapsibleNavbar">
  <ul className="navbar-nav ml-auto">

   

    {state?._id?(
      <>
      
      <li className="nav-item">
      <Link className="nav-link"style={currentTab(history, "/events")} to="/events">Events</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link"style={currentTab(history, "/cart")} to="/cart">Cart({state?.cart?state.cart.length:0})</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link"style={currentTab(history, "/profile")} to="/profile">Profile</Link>
    </li>
       
    <li className="nav-item">
    <button type="button" class="btn btn-danger" onClick={()=>{logout()}}> Logout </button>
    </li> 
    {state?.role==1?
    <>
    <li className="nav-item">
    <Link className="nav-link" style={currentTab(history, "/admin/dashboard")} to="/admin/dashboard" >Admin Dashboard</Link>
  </li> 
  </>:<></>
    }
      {state?.role==2 || state?.role==1 ?
    <>
    <li className="nav-item">
    <Link className="nav-link" style={currentTab(history, "/eventManager/dashboard")} to="/eventManager/dashboard" >Event Manager Dashboard</Link>
  </li> 
  </>:<></>
    }
    
</>
    ):(
      <>
      <li className="nav-item">
      <Link className="nav-link"style={currentTab(history, "/studentsignup")} to="/studentsignup"> Signup</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link"style={currentTab(history, "/studentlogin")} to="/studentlogin"> Login</Link>
    </li>
</>
    )}
    
  </ul>
</div>  
</nav>
    </div>
          
        
    )
}

export default withRouter(Menu)
