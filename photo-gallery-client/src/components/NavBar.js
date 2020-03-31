import React from 'react';

import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  
    return (
      <div className = 'topbar'>
        {isAuthenticated && (
            <span className = 'navbar'> 
                <Link to="/profile">Profile</Link>
                <Link to="/upload-images">Upload Images</Link>
                <Link to = '/users'>Users</Link>
            </span>
        )}

        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect({})}>Log in</button>
        )}
  
        {isAuthenticated && <button onClick={() => logout()}>Log out</button>}


      </div>
    );
  };

  export default NavBar;