import React  from 'react'
import { Link,useNavigate,useLocation } from "react-router-dom";
const Navbar = () => {
  const navigate=useNavigate();
  const handlelogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }
    let location = useLocation();
   
  return (
    <nav className="navbar navbar-expand-lg   bg-transparent">
    <div className="container-fluid">
      <Link className="navbar-brand text-light fs-3" to="/">Notebook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link text-light fs-5 ${location.pathname==="/"?"active":""} `} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            {/* <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} aria-current="page" to="/about">About</Link> */}
          </li>
        </ul>
       {!localStorage.getItem('token')?<form className="d-flex" role="search">
        
        <Link className=' btn btn-outline-primary mx-2' to="/login"  role="button">Login</Link>
        <Link className=' btn btn-outline-primary  mx-2' to="/signup" role="button">SignUp</Link>
        </form>:<button onClick={handlelogout} className=' btn btn-outline-primary'> Logout</button>}
      </div>
    </div>
  </nav>
  )
}

export default Navbar