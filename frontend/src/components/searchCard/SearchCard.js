import React from 'react'

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
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import { addApplication } from '../../API/application';

import './style.scss'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function SearchCard({ projectData }) {
    let [appModalOpen, setAppModalOpen] = React.useState(false)
    let [modalData, setModalData] = React.useState({
        applied: false,
        cover_letter: '',
    })

    const handleAppModalOpen = () => {
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
            })

            setModalData({
                ...modalData,
                applied: true,
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
                {/* <div>{new Date(projectData.createdAt).toDateString()}</div> */}
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
                {modalData.applied === false ? <Button onClick={handleAppModalOpen} variant="outlined">Apply</Button>
                    : <Button variant="outlined" disableRipple color="success" >Already applied</Button>}
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
