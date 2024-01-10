import "./style_nav.css";
import Option from './Option';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, React } from "react";


export default function Navigator() {
  const [username,setUsername] = useState(null);
  const navigate = useNavigate();

  // Component mounting: the process of adding a React component to DOM
  // useEffect (function, dependency array): If the dependency array is empty, it means that the code inside the useEffect will only run once when the component is mounted. 
  useEffect(() => {
      fetch('http://localhost:4000/profile', {
        // Including credentials in the request (e.g., cookies, HTTP authentication) for cross-origin requests
        credentials: 'include', 
      }).then(response => {
        response.json().then(userInfo => {
          setUsername(userInfo.username);
        });
      });
    }, []);

  async function logout() {
    await fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
    navigate('/');
    setUsername(null);
  }


  return (<div className="Nav">
            <div className="topLeft">
              <h className="Title">MemeWorld</h>
            </div>
            <div className="topCenter">
              <Option />
            </div>
            <div className="topRight">
            {username && (
              <>
                <Link to='/profile'>{username}</Link>
                <span className="link-separator"> | </span>
                <a onClick={logout} className="logOut">Log out</a>
              </>
            )}
            {!username && (
              <>
                <Link to="/login">Login</Link>
                <span className="link-separator"> | </span>
                <Link to="/register">Register</Link>
              </>
            )}
            </div>
          </div>);
}
