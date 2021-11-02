import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { GlobalUserContext } from '../../App'


import './style.scss'

function logOutUser() {
    localStorage.removeItem('token')
    window.location.href = '/'
}

function AppBar() {
    let { globalUserData } = React.useContext(GlobalUserContext)
    return (
        <div className="app-nav-wrapper">
            <div>CONVERGE</div>
            <div className="--margin-right">
                {
                globalUserData.user_type && globalUserData.user_type === 'applicant' &&
                <Link to="search-projects">
                    <Button style={{width: '300px', padding: '8px 0px'}} size="small" variant="outlined" startIcon={<SearchIcon />}> Search projects</Button>
                </Link>
                }
            </div>
            <div>
                <Button onClick={logOutUser} size="small" color="error" variant="text" startIcon={<LogoutIcon />}> logout</Button>
            </div>
        </div>
    )
}

export default AppBar
