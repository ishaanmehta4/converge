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
      // console.log(req.body)
      // return res.json({ status: 'error', error: 'User already exists with current firebase UID.' });
        let {username, phone_number, skills, user_type} = req.body.new_user_data;
        let {name: display_name, email, picture: display_picture, user_id: firebase_uid} = (<IRequest>req).user
        
        let tempUser = await User.findOne({ firebase_uid });
        if (tempUser) return res.json({ status: 'error', error: 'User already exists with current firebase UID.' });
        
        tempUser = await User.findOne({ username });
        if (tempUser) return res.json({ status: 'error', error: 'Username is not availabele' });
        
        tempUser = await User.findOne({ phone_number });
        if (tempUser) return res.json({ status: 'error', error: 'Another account exists with the same phone number.' });
        

        let newUser = new User({display_name, email, display_picture, firebase_uid, username, phone_number, skills, user_type});
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

    if(updated_data.username && updated_data.username !== currentUser.username) {
      let tempUser = await User.findOne({username: updated_data.username});
      if(tempUser) {
        return res.status(402).json({ status: 'error', error: 'Username not available.' });
      }
    }

    if(updated_data.phone_number && updated_data.phone_number !== currentUser.phone_number) {
      let tempUser = await User.findOne({phone_number: updated_data.phone_number});
      if(tempUser) {
        return res.status(402).json({ status: 'error', error: 'Phone number already in use.' });
      }
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
