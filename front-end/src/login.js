'use strict';

import React from 'react';
import './login.css';
import { useAuth0, withAuth0 } from '@auth0/auth0-react';


function LoginButton() {
    const { isAuthenticated, loginWithRedirect } = useAuth0()

    return !isAuthenticated && (
        <div className='login-box'>
            <h1>GIFSMS</h1>
            <button onClick={loginWithRedirect}>
                Login Here
            </button>
        </div>

    )

}

export default withAuth0(LoginButton);