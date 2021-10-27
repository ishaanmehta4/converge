import { Request, Response } from 'express';
import { User, Project, Application } from '../models';
import { IProject, IRequest } from '../interfaces';

// Single function to return an error response
const errorResponse = (res: Response, err: any, code: number = 500) => {
  res.status(code).json({
    status: 'error',
    error: err.message,
  });
};

/**
 * Creates and returns a new project document with the data given in req.body.new_project_data
 * @param req Express request object
 * @param res Express response object
 * @returns response with data of newly created project.
 */
export async function addProject(req: Request, res: Response) {
  try {
    let currentUser = await User.findOne({ firebase_uid: (req as IRequest).user.user_id });
    // Get the current user
    if (!currentUser) {
      errorResponse(res, new Error('User not found'), 404);
      return;
    }

    // Get the project details from the request body
    const newProjectData = req.body.new_project_data;
    // Add author to the project
    newProjectData.author = currentUser._id;
    // Create a new project document with the given data
    const newProject = new Project(newProjectData);
    // Save the project document
    await newProject.save();
    // Return the response with the newly created project data
    res.status(200).json({ status: 'success', data: newProject });
  } catch (error) {
    // Return the error if there is an error
    errorResponse(res, error);
  }
}

/**
 * returns project document with the project_id given in req.params.project_id
 * @param req Express request object
 * @param res Express response object
 * @returns response with data of required project.
 */
export async function getProjectData(req: Request, res: Response) {
  try {
    // Get the project id from the request params
    const projectId = req.params.project_id;
    // Find the project document with the given project id
    const project = await Project.findById(projectId);
    // Return the response with the project data
    if (!project) {
      return res.status(404).json({ status: 'error', error: 'Project not found.' });
    }

    res.status(200).json({ project });
  } catch (error) {
    // Return the error response
    errorResponse(res, error);
  }
}

/**
 * returns all project documents created by current user.
 * @param req Express request object
 * @param res Express response object
 * @returns response with array of projects documents
 */
export async function getUserProjects(req: Request, res: Response) {
  try {
    let currentUser = await User.findOne({ firebase_uid: (req as IRequest).user.user_id });
    // Get the current user
    if (!currentUser) {
      errorResponse(res, new Error('User not found'), 404);
      return;
    }
    // Get the _id of the current user
    const userId = currentUser._id;

    // Get all the projects where user is an author
    const projects = await Project.find({ author: userId }).sort({createdAt: -1});

    // get applications for each project
    for(let i=0;i<projects.length;i++) {
      projects[i] = projects[i].toObject()
      let applications = await Application.find({project: projects[i]._id})
      projects[i].applications = applications || []
    }
    // Return the response with the projects data
    res.status(200).json({ status: 'success', data: projects });
  } catch (error) {
    // Return the error response
    console.log(error)
    errorResponse(res, error);
  }
}

/**
 * Updated the project document with the data given in req.body.updated_data
 * @param req Express request object
 * @param res Express response object
 * @returns response with updated project document
 */
export async function updateProject(req: Request, res: Response) {
  try {
    // Update the project document with the given data
    const updatedProjectData = req.body.updated_data;
    // Find the project document with the given project_id
    const project = await Project.findOne({ _id: req.params.project_id });
    // If the project document is not found, return the error response
    if (!project) {
      errorResponse(res, new Error('Project not found'), 404);
    }
    // Update the project document with the given data
    if (updatedProjectData.title) project.title = updatedProjectData.title;
    if (updatedProjectData.description) project.description = updatedProjectData.description;
    if (updatedProjectData.address) project.address = updatedProjectData.address;
    if (updatedProjectData.tags) project.tags = updatedProjectData.tags;
    if (updatedProjectData.skills_required) project.skills_required = updatedProjectData.skills_required;
    if (updatedProjectData.project_status) project.project_status = updatedProjectData.project_status;

    // Save the project document
    await project.save();
    res.json({ status: 'success', data: project });
  } catch (error) {
    // Return the error response
    errorResponse(res, error);
  }
}

/**
 * Deletes a project document, along with all associated applications.
 * @param req Express request object
 * @param res Express response object
 * @returns response with confirmation of deletion
 */
export async function deleteProject(req: Request, res: Response) {
  try {
    // Get the project id from the request params
    const projectId = req.params.project_id;
    // Delete the project document
    await Project.findByIdAndDelete(projectId);
    // Return the response with confirmation of deletion
    res.status(200).json({
      status: 'success',
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    // Return the error response
    errorResponse(res, error);
  }
}
