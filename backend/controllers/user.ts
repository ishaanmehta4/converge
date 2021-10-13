import { Request, Response } from 'express';
import { User } from '../models';
import { IRequest } from '../interfaces';

// Single function to return an error response
const errorResponse = (res: Response, err: any, code: number = 500) => {
  res.status(code).json({
    error: err.message,
  });
};

// @ts-ignore

/**
 * Creates and returns a new user document with the data given in req.body.new_user_data
 * @param req Express request object
 * @param res Express response object
 * @returns response with data of newly created user.
 */
export async function addUser(req: Request, res: Response) {
  try {
    const { uid } = req.body;
    let { new_user_data } = req.body;

    let tempUser = await User.findOne({ firebase_uid: uid });
    if (tempUser) return res.json({ status: 'error', error: 'User already exists with current firebase UID.' });

    new_user_data.firebase_uid = uid;
    let newUser = new User(new_user_data);
    await newUser.save();
    res.json({ status: 'success', data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', error });
  }
}

/**
 * Returns the data of current user based on uid found in JWT.
 * @param req Express request object
 * @param res Express response object
 * @returns response containing data of current user.
 */
export async function getCurrentUserData(req: Request, res: Response) {
  try {
    let currentUser = await User.findOne({ firebase_uid: (req as IRequest).user.uid });
    if (!currentUser) {
      return res.status(404).json({ status: 'error', error: 'user/notFound' });
    }

    return res.json({ status: 'success', data: currentUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', error });
  }
}

/**
 * Searches for a user document based on the username/id given in req.params.user
 * @param req Express request object
 * @param res Express response object
 * @returns response containing data of user with username/userId requested.
 */
export async function getUserData(req: Request, res: Response) {
  try {
    let filter = { [req.query.by == 'username' ? 'username' : '_id']: req.params.user };
    let tempUser = await User.findOne(filter);
    if (!tempUser) {
      res.status(404).json({ status: 'error', error: 'User not found' });
    }
    return res.json({ status: 'success', data: tempUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', error });
  }
}

/**
 * Updates the user document of the current user with details given in req.body.updated_data
 * @param req Express request object
 * @param res Express response object
 * @returns response with updated user document
 */
export async function updateUser(req: Request, res: Response) {
  try {
    let { updated_data } = req.body;
    let currentUser = await User.findOne({ firebase_uid: (req as IRequest).user.uid });
    if (!currentUser) {
      return res.status(404).json({ status: 'error', error: 'user/notFound' });
    }
    let updatedUser = await User.findOneAndUpdate({ firebase_uid: (req as IRequest).user.uid }, updated_data, {
      new: true,
    });
    return res.json({ status: 'success', data: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', error });
  }
}

/**
 * Permanently deletes the user document of current user, along with all the projects/applications created by him.
 * @param req Express request object
 * @param res Express response object
 * @returns response with confirmation of deletion
 */
export async function deleteUser(req: Request, res: Response) {
  try {
    // Get the user document
    let user = await User.findOne({ firebase_uid: (req as IRequest).user.uid });
    if (!user) {
      errorResponse(res, new Error('User not found'), 404);
    }
    // Delete the user document
    await User.findOneAndDelete({ firebase_uid: (req as IRequest).user.uid });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', error });
  }
}
