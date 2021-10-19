import { Request, Response } from 'express';
import { User, Project } from '../models';
import { IRequest } from '../interfaces';

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
    let currentUser = await User.findOne({ firebase_uid: (req as IRequest).user.uid });
    // Get the current user
    if (!currentUser) {
      errorResponse(res, new Error('User not found'), 404);
      return;
    }
    // Get the _id of the current user
    const userId = currentUser._id;
    // Get the project details from the request body
    const newProjectData = req.body.project;
    // Add author to the project
    newProjectData.author = userId;
    // Create a new project document with the given data
    const newProject = new Project(newProjectData);
    // Save the project document
    await newProject.save();
    // Return the response with the newly created project data
    res.status(200).json({ project: newProject });
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
    let currentUser = await User.findOne({ firebase_uid: (req as IRequest).user.uid });
    // Get the current user
    if (!currentUser) {
      errorResponse(res, new Error('User not found'), 404);
      return;
    }
    // Get the _id of the current user
    const userId = currentUser._id;
    // Find the user document with the given user id
    const user = await User.findById(userId);
    // If the user document is not found, return the error response
    if (!user) {
      errorResponse(res, new Error('User not found'));
    }
    // Get all the projects where user is an author
    const projects = await Project.find({ author: user._id });
    // Return the response with the projects data
    res.status(200).json({ projects });
  } catch (error) {
    // Return the error response
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
    const updatedProjectData = req.body.project;
    // Find the project document with the given project_id
    const project = await Project.findOne({ _id: updatedProjectData._id });
    // If the project document is not found, return the error response
    if (!project) {
      errorResponse(res, new Error('Project not found'));
    }
    // Update the project document with the given data
    project.author = updatedProjectData.author;
    project.title = updatedProjectData.title;
    project.description = updatedProjectData.description;
    project.address = updatedProjectData.address;
    project.tags = updatedProjectData.tags;
    project.skills_required = updatedProjectData.skills_required;
    project.project_status = updatedProjectData.project_status;

    // Save the project document
    await project.save();
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
      message: 'Project deleted successfully',
    });
  } catch (error) {
    // Return the error response
    errorResponse(res, error);
  }
}
