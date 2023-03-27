import React from 'react'
import { useState } from 'react';
import  {  useNavigate } from 'react-router-dom';
const Login = (props) => {
   const [credentials,setCredentials] = useState({email:"",password:""});
   const navigate = useNavigate();
   const handleonsubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json()
    console.log(json);
    if(json.success){
      // save the auth token and redirect  
      localStorage.setItem('token',json.authtoken);
      props.showAlert("login successfully ","success")
     navigate("/");
    }
    else{
       props.showAlert("invalid details","danger")
    }
}
    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
       }
  return (
    <div align="center">
      <h2 className=' text-light'>LOGIN TO CONTINUE NOTEBOOK</h2>
    <form className=' my-5 custom-centered  text-light' onSubmit={handleonsubmit}>
    <div className="mb-3 w-25" >
      <label htmlFor="email1" className="form-label fs-3  ">Email Address</label>
      <input type="email" className="form-control text-light bg-transparent  border border-2" id="email1" onChange={onchange} name="email" value={credentials.email} aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text"></div>
    </div>
    <div className="mb-3 w-25">
      <label htmlFor="password" className="form-label fs-3 ">Password</label>
      <input type="password" className="form-control text-light bg-transparent border border-2" name="password" onChange={onchange} value={credentials.password} id="password"/>
    </div>
    <button type="submit" className="btn btn-outline-primarybtn btn-outline-primary my-3" >Login</button>
  </form>
  </div>
  )
}

export default Login