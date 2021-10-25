import React from 'react'
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

import './style.scss'

function logOutUser() {
    localStorage.removeItem('token')
    window.location.href = '/'
}

function AppBar() {
    return (
        <div className="app-nav-wrapper">
            <div>CONVERGE</div>
            <div>
                <Button onClick={logOutUser} size="small" color="error" variant="text" startIcon={<LogoutIcon />}> logout</Button>
            </div>
        </div>
    )
}

export default AppBar
