// Signup.js
import React, { useState } from 'react';
import './signup.css'; // CSS file
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData]=useState({
    email:'',
    name: '',
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
      const response = await fetch("http://localhost:3000/user/register",{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(formData)
      })
      const result = await response.json();
      console.log(result);
      navigate("/login");
      
    } catch (error) {
      console.error(error.message);
      
    } finally{
      setFormData({
        email: "",
        name: "",
        password:"",

      })

    }
  }

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>Email Address</label>
        <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} />

        <label>Full Name</label>
        <input type="text" name="name" placeholder="Enter full name" value={formData.name} onChange={handleInputChange} />

        <label>Password</label>
        <input type="password" name="password" placeholder="Enter password" value={formData.password} onChange={handleInputChange}/>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
