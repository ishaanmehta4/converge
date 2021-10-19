import { Request, Response } from 'express';
import { User, Application } from '../models';
import { IRequest } from '../interfaces';
import { messaging } from 'firebase-admin';

// Single function to return an error response
const errorResponse = (res: Response, err: any, code: number = 500) => {
  res.status(code).json({
    status: 'error',
    error: err.message,
  });
};

/**
 * Creates and returns a new application document with the data given in req.body.new_application_data
 * @param req Express request object
 * @param res Express response object
 * @returns response with data of newly created application.
 */
export async function addApplication(req: Request, res: Response) {
  try {
    const newApplication = new Application(req.body.new_application_data);
    const application = await newApplication.save();
    res.status(201).send(application);
  } catch (error) {
    errorResponse(res, error);
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
    const application = await Application.findById(req.params.application_id);
    res.status(200).send({
      status: 'success',
      message: 'Application data found',
      data: application,
    });
  } catch (error) {
    errorResponse(res, error);
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
    // get user id from request
    const userId = req.params.id;
    // get all applications created by user
    const applications = await Application.find({
      user: userId,
    });
    res.status(200).send({
      status: 'success',
      message: 'Applications found',
      data: applications,
    });
  } catch (error) {
    errorResponse(res, error);
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
    // Get all the applications for the project
    const applications = await Application.find({ project_id: req.params.project_id });
    // If there are no applications, return an empty array
    if (applications.length === 0) {
      res.status(200).send({
        status: 'success',
        message: 'No applications found for this project',
        data: [],
      });
    } else {
      res.status(200).send({
        status: 'success',
        message: 'Applications found',
        data: applications,
      });
    }
  } catch (error) {
    errorResponse(res, error);
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
    // Get the application document
    const application = await Application.findById(req.params.application_id);
    if (!application) {
      errorResponse(res, new Error('Application not found'), 404);
    }
    // Get the updated data from the body
    const updatedData = req.body.updated_data;
    // Update the application document
    Object.keys(updatedData).forEach(key => {
      application[key] = updatedData[key];
    });
    // Save the application document
    const savedApplication = await application.save();
    res.status(200).send({
      status: 'success',
      message: 'Application updated',
      data: savedApplication,
    });
  } catch (error) {
    errorResponse(res, error);
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
    // Get the application document
    const application = await Application.findById(req.params.application_id);
    if (!application) {
      errorResponse(res, new Error('Application not found'), 404);
    }
    const application_status = req.body.updated_status;
    // Update the application document
    application.status = application_status;
    const updatedApplication = await application.save();
    res.status(200).send({
      status: 'success',
      message: 'Application status updated',
      data: updatedApplication,
    });
  } catch (error) {
    errorResponse(res, error);
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
    // Get the id of the application to be deleted
    const applicationId = req.params.application_id;
    // Delete the application
    await Application.findByIdAndDelete(applicationId);
    res.status(200).send({
      status: 'success',
      message: 'Application deleted successfully',
    });
  } catch (error) {
    errorResponse(res, error);
  }
}
