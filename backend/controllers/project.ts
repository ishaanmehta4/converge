import { Request, Response } from 'express';
import { User, Project } from '../models';
import { IRequest } from '../interfaces';


/**
 * Creates and returns a new project document with the data given in req.body.new_project_data
 * @param req Express request object
 * @param res Express response object
 * @returns response with data of newly created project.
 */
 export async function addProject(req: Request, res: Response) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error });
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
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error });
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
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error });
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
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error });
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
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error });
    }
  }  

