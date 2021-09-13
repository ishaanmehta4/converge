import express, { Router } from 'express';
import { authTokenHandler } from '../middlewares/authTokenHandler';
import { addProject,getProjectData, getUserProjects, updateProject, deleteProject } from '../controllers/project';

var projectRouter: Router = express.Router();

projectRouter.post('/create', authTokenHandler, addProject); // will create a new project document in MongoDB

projectRouter.get('/list/self', authTokenHandler, getUserProjects); // will send all projects for current user
projectRouter.get('/doc/:project_id', getProjectData); // will send publically available data for project with given projectID

projectRouter.put('/doc/:project_id', authTokenHandler, updateProject); // update project's data

projectRouter.delete('/doc/:project_id', authTokenHandler, deleteProject); // deletes the project document with all associated applications

module.exports = projectRouter;
