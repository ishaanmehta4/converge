import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import './style.scss'

function AppBar() {
    return (
        <div className="app-nav-wrapper">
            <div>CONVERGE</div>
            <div>
                <Button size="small" variant="text" startIcon={<DeleteIcon />}> logout</Button>
            </div>
        </div>
    )
}

export default AppBar
