import React from 'react'

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import ApplicationCard from '../applicationCard/ApplicationCard';

import './style.scss'
import { updateApplicationStatus } from '../../API/application';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const sortByTime = (a, b) => {
    return a.createdAt - b.createdAt;
}

function ProjectCard({ projectData, projectList, setProjectList, isOwner }) {
    let [appModalOpen, setAppModalOpen] = React.useState(false)
    const handleAppModalOpen = () => {
        setAppModalOpen(true);
    };

    const handleAppModalClose = () => {
        // setModalData(BLACK_PROJECT_STATE)
        setAppModalOpen(false);
    };

    const setStatus_appCard = async (application_id, status) => {
        let [success, error] = await updateApplicationStatus(application_id, status)
        if (!success) return;

        let currentProject = { ...projectList.find(p => p._id === projectData._id) }// a copy of the current project object
        if (!currentProject) return;
        let currentProjectIndex = projectList.findIndex(p => p._id === projectData._id);
        let allProjects = [...projectList]

        let currentApplicationIndex = currentProject.applications.findIndex(a => a._id === application_id)
        if (currentApplicationIndex === -1) return;

        currentProject.applications[currentApplicationIndex].application_status = status;
        allProjects[currentProjectIndex] = currentProject;
        setProjectList(allProjects)
    }
    return (
        <div className="project-card-wrapper box-shadow">
            <div className="__card-heading">
                <h3>{projectData.title}
                    {isOwner && <IconButton className="__edit-button" >
                        {/* <EditIcon /> */}
                    </IconButton>}
                </h3>
                <div>{new Date(projectData.createdAt).toDateString()}</div>
            </div>

            <Stack className="__tags-section" direction="row" spacing={1}>
                {(projectData.tags || []).map(tag => <Chip label={tag.toUpperCase()} key={tag} color="primary" variant="outlined" />)}
            </Stack>

            {isOwner && <div className="__appliation-section">
                <div>{`${projectData.applications.length} application(s) received.`}</div>
                {
                    projectData.applications.length ?
                        <div><Button onClick={handleAppModalOpen}>View applications</Button></div> : null
                }
            </div>}

            <div className="__description-section">{projectData.description}</div>
            <div className="__skills-section">
                <strong>Skills required: </strong>
                {(projectData.skills_required || []).join(', ')}
            </div>

            {/* view applications dialog*/}
            <Dialog open={appModalOpen} onClose={handleAppModalClose} maxWidth="s" fullScreen TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleAppModalClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            All applications ({projectData.title})
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <DialogContentText>
                        {(projectData.applications || []).filter(a => a.application_status === 'pending').length > 0 &&
                            <h4 className="bordered-h4">Pending applications</h4>}
                        {
                            (projectData.applications || [])
                                .filter(a => a.application_status === 'pending')
                                .sort(sortByTime)
                                .map(app => <ApplicationCard key={app._id} applicationData={app} setStatus={setStatus_appCard} />)
                        }

                        {(projectData.applications || []).filter(a => a.application_status === 'accepted').length > 0 &&
                            <h4 className="bordered-h4">Accepted applications</h4>}
                        {
                            (projectData.applications || [])
                                .filter(a => a.application_status === 'accepted')
                                .sort(sortByTime)
                                .map(app => <ApplicationCard key={app._id} applicationData={app} setStatus={setStatus_appCard} />)
                        }

                        {(projectData.applications || []).filter(a => a.application_status === 'rejected').length > 0 &&
                            <h4 className="bordered-h4">Rejected applications</h4>}
                        {
                            (projectData.applications || [])
                                .filter(a => a.application_status === 'rejected')
                                .sort(sortByTime)
                                .map(app => <ApplicationCard key={app._id} applicationData={app} setStatus={setStatus_appCard} />)
                        }
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProjectCard
