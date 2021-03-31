<nav className="navbar navbar-expand-md navbar-dark" style={{backgroundColor:"rgba(100, 100, 80, 0.3)"}}>
<Link style={currentTab(history, "/")} className="navbar-brand" to="/">Compuwave Society</Link>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
  <span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="collapsibleNavbar">
  <ul className="navbar-nav">

   

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
