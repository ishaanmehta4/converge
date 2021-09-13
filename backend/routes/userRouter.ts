import express, { Router } from 'express';
import { authTokenHandler } from '../middlewares/authTokenHandler';
import { addUser, getUserData, updateUser, deleteUser, getCurrentUserData } from '../controllers/user';

var userRouter: Router = express.Router();

userRouter.post('/create', authTokenHandler, addUser); // will create a new user in MongoDB

userRouter.get('/doc/self', authTokenHandler, getCurrentUserData); // will send all data for current user
userRouter.get('/doc/:user', getUserData); // will send publically available data for username/userID [?by=username]

userRouter.put('/doc/self', authTokenHandler, updateUser); // update current user's data

userRouter.delete('/doc/self', authTokenHandler, deleteUser); // deletes the current user (sets is_deleted to true)

module.exports = userRouter;
