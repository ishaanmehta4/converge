import React from 'react'
import { GlobalUserContext } from '../../App';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';
import CheckIcon from '@mui/icons-material/Check';

import { addApplication } from '../../API/application';

import './style.scss'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function SearchCard({ projectData }) {
    let { globalUserData, setGlobalUserData } = React.useContext(GlobalUserContext)

    let [appModalOpen, setAppModalOpen] = React.useState(false)
    let [modalData, setModalData] = React.useState({
        applied: false,
        cover_letter: '',
        resume_url: ''
    })

    const handleAppModalOpen = () => {
        setModalData({
            ...modalData,
            resume_url: globalUserData.resume_url || '',
        })
        setAppModalOpen(true);
    };

    const handleAppModalClose = () => {
        // setModalData(BLACK_PROJECT_STATE)
        setAppModalOpen(false);
    };
    const handleFormSubmit = async () => {
        // setModalData(BLACK_PROJECT_STATE)
        try {

            await addApplication({
                project: projectData.objectID,
                cover_letter: modalData.cover_letter,
                resume_url: modalData.resume_url
            })

            let updatedProjectList = [...globalUserData.projects_applied_to, projectData.objectID]
            setGlobalUserData({
                ...globalUserData, 
                projects_applied_to: updatedProjectList
            })
            setAppModalOpen(false);
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div className="search-card-wrapper box-shadow">
            <div className="__card-heading">
                <h3>{projectData.title}</h3>
            </div>

            <Stack className="__tags-section" direction="row" spacing={1}>
                {(projectData.tags || []).map(tag => <Chip label={tag.toUpperCase()} color="primary" variant="outlined" />)}
            </Stack>


            <div className="__description-section">{projectData.description}</div>
            <div className="__skills-section">
                <strong>Skills required: </strong>
                {projectData.skills_required.join(', ')}
            </div>

            <br />
            <div>
                {(globalUserData.projects_applied_to || []).includes(projectData.objectID) === false ? <Button onClick={handleAppModalOpen} variant="outlined">Apply</Button>
                    : <Button variant="outlined" disableRipple color="success" startIcon={<CheckIcon/>}>Already applied</Button>}
            </div>


            {/* view applications dialog*/}
            <Dialog open={appModalOpen} onClose={handleAppModalClose} >

                <DialogTitle style={{ width: '600px', minWidth: 'max-content', maxWidth: '80vw' }}>
                    Apply for {projectData.title}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        <TextField
                            margin="dense"
                            label="Add a cover letter (optional)"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            variant="standard"
                            value={modalData.title}
                            onChange={(e) => {
                                setModalData({
                                    ...modalData,
                                    cover_letter: e.target.value
                                })
                            }}
                        />
                        <br />
                        <br />
                        <TextField
                            margin="dense"
                            label="Add a link to your resume for this application"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={modalData.resume_url}
                            onChange={(e) => {
                                setModalData({
                                    ...modalData,
                                    resume_url: e.target.value
                                })
                            }}
                        />
                    </DialogContentText>
                    <br />
                    <br />
                    <DialogContentText>
                        Your skillset and profile will also be shared with the recruiter.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAppModalClose}>Cancel</Button>
                    <Button onClick={handleFormSubmit}>Submit application</Button>
                </DialogActions>
            </Dialog>


        </div>
    )
}

export default SearchCard
