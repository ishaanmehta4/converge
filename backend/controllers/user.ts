import { Request, Response } from 'express';
import { User } from '../models';
import { IRequest } from '../interfaces';


/**
 * Creates and returns a new user document with the data given in req.body.new_user_data
 * @param req Express request object
 * @param res Express response object
 * @returns response with data of current user.
 */
 export async function addUser(req: Request, res: Response) {
    try {
        const { uid } = req.body;
        let {new_user_data} = req.body;

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
      return res.status(401).json({ status: 'error', error: 'user/completeOnboarding' });
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
 * 
 * @param req Express request object
 * @param res Express response object
 * @returns response with data of current user.
 */
export async function updateUser(req: Request, res: Response) {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', error });
  }
}

/**
 *
 * @param req Express request object
 * @param res Express response object
 * @returns response with data of current user.
 */
export async function deleteUser(req: Request, res: Response) {
  try {
  
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'error', error });
  }
}
