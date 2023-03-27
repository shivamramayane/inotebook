import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
  const [credentials,setCredentials] = useState({name:"",email:"",password:""});
  const navigate = useNavigate(); 
  const handleonsubmit = async (e) => {
    e.preventDefault();
    const {name,password,email}=credentials
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password,name})
    });
    const json = await response.json()
    console.log(json);
    if(json.success){
      // save the auth token and redirect  
      localStorage.setItem('token',json.authtoken);
      props.showAlert("Account created successfully ","success")
     navigate("/");
    }
    else{
      props.showAlert("invaild credentials ","danger")
    }
}
    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
       }
  return (
    <div className='container' align="center">
      <h4 className=' text-light'>SIGN UP TO CONTINUE TO CREATE NEW ACCOUNT </h4>
    <form  onSubmit={handleonsubmit} className=" my-3  text-light custom-centered">
    <div className="mb-3 w-25 " >
      <label htmlFor="name" className="form-label fs-4 fw-bold">Your Name</label>
      <input type="text" className="form-control text-light bg-transparent border border-2" id="name" name="name" onChange={onchange} aria-describedby="nameHelp"/>
      <div id="nameHelp" className="form-text"></div>
    </div>
    <div className="mb-3 w-25">
      <label htmlFor="email" className="form-label fs-4 fw-bold">Email address</label>
      <input type="email" className="form-control text-light bg-transparent border border-2" id="email" name='email' onChange={onchange} aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text"></div>
    </div>
    <div className="mb-3 w-25">
      <label htmlFor="password" className="form-label fs-4 fw-bold">Password</label>
      <input type="password" className="form-control text-light bg-transparent border border-2" name='password'minLength={5} required onChange={onchange} id="password"/>
    </div>
    <div className="mb-3 w-25">
      <label htmlFor="cpassword" className="form-label fs-4 fw-bold">Confirm Password</label>
      <input type="password" className="form-control text-light bg-transparent border border-2" name='cpassword'minLength={5} required onChange={onchange} id="cpassword"/>
    </div>
    
    <button type="submit" className="btn btn-outline-primary">Signup</button>
  </form>
  </div>
  )
}

export default Signup