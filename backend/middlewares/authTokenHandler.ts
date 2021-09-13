const { auth } = require('../config/firebase');
// import config from '../config/';
import { Request, Response, NextFunction } from 'express';
import { IRequest } from '../interfaces';

const authTokenHandler = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    let token = authHeader && (authHeader as string).split(' ')[1];

    if (!token) return res.status(401).json({ status: 'error', error: 'Token missing.' });

    let decodedToken = await auth.verifyIdToken(token);
    (<IRequest>req).user = decodedToken;

    next();
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ status: 'error', error: err });
  }
};

export { authTokenHandler };
