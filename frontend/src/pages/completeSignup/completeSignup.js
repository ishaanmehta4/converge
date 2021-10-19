import React, { useState } from 'react'
import './style.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// import {/

import { addUser } from '../../API/user';

function CompleteSignupPage() {
    let [formData, setFormData] = useState({
        username: '',
        phone_number: '',
        skills: [],
        user_type: 'applicant',
    })

    let [isLoading, setLoading] = useState(false)

    async function handleSubmit() {
        if(!formData.username) {
            alert('Please enter a username.')
            return
        }
        if(!formData.phone_number) {
            alert('Please enter your contact number.')
            return
        }
        if(formData.user_type === 'applicant' && formData.skills.length === 0) {
            alert('Please add atleast one skill to continue.')
            return
        }
        
        setLoading(true)
        // make api request
        let [, error] = await addUser(formData)
        if(error) {
            alert(error)
            setLoading(false)
        } else {
            window.location.href = '/dashboard'
        }
        console.log(formData)
    }

    return (
        <div className="complete-signup-page__form__wrapper">
            <div className="p-12">
                <h2>One last step to get you started!</h2>
                <br />
                <TextField fullWidth value={formData.username} id="outlined-basic"
                    label="Username" variant="outlined" onChange={(e) => {
                        setFormData({
                            ...formData,
                            username: e.target.value.trim().toLowerCase()
                        })
                    }} />
                <br />
                <br />
                <TextField fullWidth value={formData.phone_number} id="outlined-basic"
                    label="Phone number" variant="outlined" onChange={(e) => {
                        setFormData({
                            ...formData,
                            phone_number: e.target.value.trim()
                        })
                    }} />
                <br/>
                <br/>
                <div className="__roles__wrapper">
                    <div className={[formData.user_type === 'applicant' && '--active']} onClick={() => {
                        setFormData({
                            ...formData,
                            user_type: 'applicant',
                        })
                    }}>
                        I am looking to join projects
                    </div>
                    <div className={[formData.user_type === 'recruiter' && '--active']} onClick={() => {
                        setFormData({
                            ...formData,
                            user_type: 'recruiter',
                        })
                    }}>
                        I am looking for team members
                    </div>
                </div>
                {/* roles wrapper end */}
                <br />
                {
                    formData.user_type === 'applicant' && <div>
                        <h3>Add skills</h3>
                        <br />
                        Adding skills to your profile results in better project suggestions and increases your chances of being selected by a recruiter.
                        <br />
                        <br />
                        <TextField fullWidth id="outlined-basic" helperText="Enter a list of skills you want to add, separated by commas (,)"
                            label="My skills" variant="outlined" onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    skills: e.target.value.split(',').map(skill => skill.trim().toLowerCase()).filter(Boolean)
                                })
                            }} />
                    </div>
                }
                <br />
                {
                    isLoading ? 
                    <CircularProgress /> :
                    <Button variant="contained" onClick={handleSubmit}>Save and Continue</Button>
                }
            </div>
            <div></div>
        </div>
    )
}

export default CompleteSignupPage
