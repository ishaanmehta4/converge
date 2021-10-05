import express, { Router } from 'express';
import { authTokenHandler } from '../middlewares/authTokenHandler';
import { isProjectOwner } from '../middlewares/isProjectOwner';
import { addApplication,getApplicationData, getUserApplications, getProjectApplications, updateApplication,updateApplicationStatus, deleteApplication } from '../controllers/application';
var applicationRouter: Router = express.Router();

applicationRouter.post('/create', authTokenHandler, addApplication); // will create a new Application document in MongoDB

applicationRouter.get('/list/self', authTokenHandler, getUserApplications); // will send all Applications for current user
applicationRouter.get('/list/by-project/:project_id', authTokenHandler, isProjectOwner, getProjectApplications); // will send all Applications for current user
applicationRouter.get('/doc/:application_id', getApplicationData); // will send publically available data for Application with given ApplicationID

applicationRouter.put('/doc/:application_id', authTokenHandler, updateApplication); // update Application's data (for applicants)
applicationRouter.put('/doc/:application_id/status', authTokenHandler, updateApplicationStatus); // update Application's status (for project owners)

applicationRouter.delete('/doc/:application_id', authTokenHandler, deleteApplication); // deletes the Application document with all associated applications


module.exports = applicationRouter;
