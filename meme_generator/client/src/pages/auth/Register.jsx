import './style_auth.css'
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';

export default function Register(second) {

  // Declare a new state variable
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // use fetch to send a POST request to server
  async function register(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/register', {
      // POST: send information to server
      method: 'POST',
      // JSON.stringfy: transfer a Javascript object to JSON String
      body: JSON.stringify({username, email, password}),
      headers: {'Content-Type':'application/json'},
    })
    if (response.status === 200) {
      navigate("/login")
    } else {
      alert('register failed');
    }
  }

    return (
        <div className='auth'>
          <h1>Register</h1>
          <form onSubmit={register}>
            <input required type='text' 
                   placeholder='username' 
                   value={username} 
                   onChange={ev => setUsername(ev.target.value)}
                  />
            <input required type='email' 
                   placeholder='email' 
                   value={email} 
                   onChange={ev => setEmail(ev.target.value)}
                   />
            <input required type='password' 
                   placeholder='password' 
                   value={password} 
                   onChange={ev => setPassword(ev.target.value)} 
                   />
            <button className='button'>Confirm</button>
            <span>Don' you have an account? <Link to="/login">Login</Link>
            </span>
          </form>
        </div>
    );
}