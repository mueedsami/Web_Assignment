import React, { useState } from 'react';
import './login.css'; // CSS file
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData]=useState({
    email:'',
    password: '',
  })

  const handleInputChange = (event) =>{
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const handleSubmit = async(e) =>
  {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login",{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(formData)
      })
      const result = await response.json();
      localStorage.setItem("token",result.token);
      console.log(result);
      navigate("/dashboard");
      
    } catch (error) {
      console.error(error.message);
      
    } finally{
      setFormData({
        email: "",
        password:"",

      })

    }
  }

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email Address</label>
        <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} />

        <label>Password</label>
        <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleInputChange}/>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
