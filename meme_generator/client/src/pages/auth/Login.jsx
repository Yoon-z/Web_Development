import './style_auth.css'
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';

export default function Login(second) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function login(ev){
      ev.preventDefault();
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'Content-Type':'application/json'},
        credentials: 'include',
      })
      if (response.ok) {
        navigate('/');
      } else {
        alert('email or password is wrong')
      }
    }

    return (
        <div className='auth'>
          <h1>Login</h1>
          <form onSubmit={login}>
            <input required type='email' 
                   placeholder='email' 
                   vaule={email} 
                   onChange={ev => setEmail(ev.target.value)}/>
            <input required type='password'
                   placeholder='password'
                   value={password} 
                   onChange={ev => setPassword(ev.target.value)}/>
            <button className='button'>Login</button>
            <span>Don' you have an account? <Link to="/register">Register</Link>
            </span>
          </form>
        </div>
    );
}