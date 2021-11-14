import React from 'react'

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import ProjectCard from '../projectCard/ProjectCard';

import './style.scss'

import { addProject, updateProject, getUserProjects } from '../../API/project';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MyProjects() {
    const BLACK_PROJECT_STATE = {
        title: '',
        description: '',
        address: {
            address_line_1: '',
            address_line_2: '',
            city: '',
            city_zip: '',
        },
        tags: [],
        skills_required: [],
        tagsString: '',
        skillString: ''
    }

    let [addModalOpen, setAddModalOpen] = React.useState(false);
    let [projectList, setProjectList] = React.useState([])
    let [modalData, setModalData] = React.useState(BLACK_PROJECT_STATE)

    const handleClickOpen = () => {
        setAddModalOpen(true);
    };

    const handleClose = () => {
        setModalData(BLACK_PROJECT_STATE)
        setAddModalOpen(false);
    };

    const isValid = () => {
        if(!modalData.title) {
            alert('Please enter a title for the project.')
            return false
        }
        
        if((modalData.skills_required || []).length === 0) {
            alert('Please add atleast one skill required for the project.')
            return false
        }

        return true
    }

    const handleAddFormSubmit = async () => {
        // setModalData({ ...modalData, skillString: '', tagString: '' })
        try {
            if(!isValid()) return;
          
            let [newProject, error] = await addProject(modalData)
            if (error) throw error
            else {
                setProjectList([newProject, ...projectList])
                setAddModalOpen(false);
                setModalData(BLACK_PROJECT_STATE)
            }
        } catch (error) {
            console.log('[MyProjects/handleAddFormSubmit]', error)
            alert('Project could not be created because an error was encountered.')
        }
    };

    React.useEffect(() => {
        async function fetchData() {
            try {
                let projects = await getUserProjects()
                // projects = [...projects, ...projects, ...projects]
                setProjectList(projects || [])
            } catch (error) {
                console.log('[MyProjects/fetchProjects]', error)
                // alert('Projects could not be fetched because an error was encountered.')
            }
        }
        fetchData()
    }, [])


    return (
        <div className="my-projects-wrapper">
            <div className="__fab-wrapper">
                {/* <Fab color="primary" variant="extended" aria-label="add">
                    <AddIcon sx={{ mr: 1 }} /> New project
                </Fab> */}
                <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                    <AddIcon />
                </Fab>
            </div>

            {/* project list */}
            <div className="__project-list-wrapper">
                <div className="__heading-wrapper">
                    <h2>{`My Projects`}</h2>
                </div>
                {projectList.map(p => <ProjectCard projectData={p} projectList={projectList} setProjectList={setProjectList} isOwner />)}
            </div>

            {/* Add project dialog */}
            {/* <Dialog open={addModalOpen} onClose={handleClose} maxWidth="s"  > */}
            <Dialog open={addModalOpen} onClose={handleClose} maxWidth="s" fullScreen TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Add a new project
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleAddFormSubmit}>
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                {/* <DialogTitle>Add new project</DialogTitle> */}
                <DialogContent>
                    <DialogContentText>
                        Basic details
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        label="Project title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={modalData.title}
                        onChange={(e) => {
                            setModalData({
                                ...modalData,
                                title: e.target.value
                            })
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="standard"
                        value={modalData.description}
                        onChange={(e) => {
                            setModalData({
                                ...modalData,
                                description: e.target.value
                            })
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Skills required"
                        type="text"
                        fullWidth
                        variant="standard"
                        helperText="Enter a list of skills required by the candidate for working on this project, separated by commas (,)"
                        value={modalData.skillString}
                        onChange={(e) => {
                            setModalData({
                                ...modalData,
                                skillString: e.target.value,
                                skills_required: e.target.value.split(',').map(skill => skill.trim().toLowerCase()).filter(Boolean)
                            })
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Tags"
                        type="text"
                        fullWidth
                        variant="standard"
                        helperText="Enter a list of tags related to your project, separated by commas (,)"
                        value={modalData.tagString}
                        onChange={(e) => {
                            setModalData({
                                ...modalData,
                                tagString: e.target.value,
                                tags: e.target.value.split(',').map(skill => skill.trim().toLowerCase()).filter(Boolean)
                            })
                        }}
                    />
                    <br />
                    <br />
                    <br />
                    <DialogContentText>
                        Address details (Leave blank if virtual)
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        label="Address line 1"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={modalData.address.address_line_1}
                        onChange={(e) => {
                            setModalData({
                                ...modalData,
                                address: { ...modalData.address, address_line_1: e.target.value }
                            })
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Address line 2"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={modalData.address.address_line_2}
                        onChange={(e) => {
                            setModalData({
                                ...modalData,
                                address: { ...modalData.address, address_line_2: e.target.value }
                            })
                        }}
                    />
                    <div className="flex-box gap-8">
                        <TextField
                            margin="dense"
                            label="City"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={modalData.address.city}
                            onChange={(e) => {
                                setModalData({
                                    ...modalData,
                                    address: { ...modalData.address, city: e.target.value }
                                })
                            }}
                        />
                        <TextField
                            margin="dense"
                            label="PIN code"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={modalData.address.city_zip}
                            onChange={(e) => {
                                setModalData({
                                    ...modalData,
                                    address: { ...modalData.address, city_zip: e.target.value }
                                })
                            }}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default MyProjects
