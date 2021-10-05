import { Request, Response } from 'express';
import { User, Application } from '../models';
import { IRequest } from '../interfaces';


/**
 * Creates and returns a new application document with the data given in req.body.new_application_data
 * @param req Express request object
 * @param res Express response object
 * @returns response with data of newly created application.
 */
 export async function addApplication(req: Request, res: Response) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error });
    }
  }  

/**
 * returns application document with the application_id given in req.params.application_id
 * @param req Express request object
 * @param res Express response object
 * @returns response with data of required application.
 */
 export async function getApplicationData(req: Request, res: Response) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error });
    }
  }  


/**
 * returns all application documents created by current user.
 * @param req Express request object
 * @param res Express response object
 * @returns response with array of applications documents
 */
 export async function getUserApplications(req: Request, res: Response) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error });
    }
  }  

/**
 * returns all application documents for the given project (for project owners).
 * @param req Express request object
 * @param res Express response object
 * @returns response with array of applications documents
 */
 export async function getProjectApplications(req: Request, res: Response) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error });
    }
  }  

/**
 * Updates the application document with the data given in req.body.updated_data (for applicants)
 * @param req Express request object
 * @param res Express response object
 * @returns response with updated application document
 */
 export async function updateApplication(req: Request, res: Response) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error });
    }
  }  

/**
 * Updates the application' status with the data given in req.body.updated_status (for project owners)
 * @param req Express request object
 * @param res Express response object
 * @returns response with updated application document
 */
 export async function updateApplicationStatus(req: Request, res: Response) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error });
    }
  }  

/**
 * Deletes a application document, along with all associated applications.
 * @param req Express request object
 * @param res Express response object
 * @returns response with confirmation of deletion
 */
 export async function deleteApplication(req: Request, res: Response) {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error });
    }
  }  

