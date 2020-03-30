import React from 'react';

import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  
    return (
      <div>
        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect({})}>Log in</button>
        )}
  
        {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

        {isAuthenticated && (
            <span> 
                <Link to="/profile">Profile</Link>
                <Link to="/upload-images">Upload Images</Link>
                <Link to = '/users'>Users</Link>
            </span>
        )}

      </div>
    );
  };

  export default NavBar;