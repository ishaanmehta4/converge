import React, { useEffect, useState } from 'react'
import { getCurrentUserData, updateUser } from '../../API/user'
import {GlobalUserContext} from '../../App'
// import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


import './style.scss'


function UserProfile() {

    let {globalUserData, setGlobalUserData} = React.useContext(GlobalUserContext)

    let [userData, setUserData] = useState({
        username: '',
        firebase_uid: '',
        display_name: '',
        display_picture: '',
        phone_number: '',
        email: '',
        skills: [],
        fcm_device_tokens: [],
    })

    let [updatedData, setUpdatedData] = useState({
        username: '',
        display_name: '',
        phone_number: '',
        skills: [],
        skillString: ''
    })

    useEffect(() => {
        let getData = async () => {
            let response = await getCurrentUserData()
            setUserData(userData => ({ ...userData, ...response }))
            setGlobalUserData(globalUserData => ({ ...globalUserData, ...response }))
        }
        getData()
    }, [])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setUpdatedData({
            username: userData.username,
            display_name: userData.display_name,
            phone_number: userData.phone_number,
            skills: [...userData.skills],
            skillString: userData.skills.join(', ')
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdatedData({
            username: '',
            display_name: '',
            phone_number: '',
            skills: [],
            skillString: ''
        })
    };

    const handleEditFormSubmit = async () => {
        let [success, error] = await updateUser(updatedData);
        if (success) {
            setUserData({
                ...userData, ...updatedData, skillString: null
            })
            setGlobalUserData({
                ...globalUserData, ...updatedData, skillString: null
            })
            handleClose()
        }
        else {
            alert(error)
        }
    }

    return (
        <div className="user-profile__wrapper" style={{ display: userData && userData.username.length ? 'block' : 'none' }}>
            <div>
                <img alt={userData.display_name} src={userData.display_picture} />
                <div className="__edit-button">
                    <Button size="small" variant="text" style={{ color: '#ffffff' }} onClick={handleClickOpen}>edit profile</Button>
                </div>

                <div className="__name">{userData.display_name}</div>
                <div className="__type">{userData.user_type}</div>
            </div>
            {userData.user_type === 'applicant' && <div>
                <h3>Skills added</h3>
                <Stack direction="column" spacing={1}>
                    {
                        userData.skills.map(skill => <div className="__skill-chip" key={skill}>{skill.toUpperCase()}</div>)
                    }
                </Stack>
            </div>}
            <div className="__contact-info-wrapper">
                <h3>Contact information</h3>
                <div className="__username"><i className="lni lni-user"></i> @{userData.username}</div>
                <div className="__email"><i className="lni lni-envelope"></i> {userData.email.length > 20 ? userData.email.slice(0, 17) + '...' : userData.email}</div>
                <div className="__phone_number"><i className="lni lni-phone"></i> {userData.phone_number}</div>
            </div>


            {/* profile edit dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                {/* <Dialog open={open} onClose={handleClose} fullScreen> */}
                <DialogTitle>Edit profile details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Basic details
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updatedData.display_name}
                        onChange={(e) => {
                            setUpdatedData({
                                ...updatedData,
                                display_name: e.target.value
                            })
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updatedData.username}
                        onChange={(e) => {
                            setUpdatedData({
                                ...updatedData,
                                username: e.target.value
                            })
                        }}
                    />
                    {userData.user_type === 'applicant' && <TextField
                        margin="dense"
                        label="Skills"
                        helperText="Enter skills separated by commas"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updatedData.skillString}
                        onChange={(e) => {
                            setUpdatedData({
                                ...updatedData,
                                skillString: e.target.value,
                                skills: e.target.value.split(',').map(skill => skill.trim().toLowerCase()).filter(Boolean)
                            })
                        }}
                    />}
                    <br />
                    <br />
                    <br />
                    <DialogContentText>
                        Contact details
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        label="Contact number"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updatedData.phone_number}
                        onChange={(e) => {
                            setUpdatedData({
                                ...updatedData,
                                phone_number: e.target.value
                            })
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEditFormSubmit}>Update details</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UserProfile
