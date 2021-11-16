import React from 'react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

import './style.scss'

function ApplicationCard({ applicationData, setStatus }) {
    return (
        <div className="app-card-wrapper box-shadow">
            <div className="__author-section">
                <img src={applicationData.author.display_picture || ''} alt=''></img>
                <span>{applicationData.author.display_name}</span>
                {/* <span className="__date">{applicationData.application_status}</span> */}
                <span className="__date">{new Date(applicationData.createdAt).toLocaleString()}</span>
            </div>
            <div className="__skill-section">
                <strong>Skills: </strong>
                <Stack className="__skills-section" direction="row" spacing={1}>
                    {(applicationData.author.skills || []).map(skill => <Chip label={skill.toUpperCase()} color="primary" variant="outlined" />)}
                </Stack>
            </div>
            {
                applicationData.cover_letter && <div className="__cover-letter-section">{applicationData.cover_letter}</div>
            }
            {
                applicationData.resume_url && <a href={applicationData.resume_url} target="_blank">
                    <Button className="__resume-button" fullWidth variant="outlined" startIcon={<InsertDriveFileOutlinedIcon />}> Open resume</Button>
                </a>
            }
            <h4>Contact information</h4>
            <div>
                <strong>Email address: </strong> {applicationData.author.email}
            </div>
            <div>
                <strong>Contact: </strong> {applicationData.author.phone_number}
            </div>
            { applicationData.application_status === 'pending' &&
            <div className="__buttons-section">
                <Button variant="outlined" color="error" startIcon={<ClearIcon />} onClick={()=>{setStatus(applicationData._id, 'rejected')}}>Reject application</Button>
                <Button variant="contained" color="primary" startIcon={<CheckIcon />} onClick={()=>{setStatus(applicationData._id, 'accepted')}}>Accept application</Button>
            </div>}
        </div>
    )
}

export default ApplicationCard
