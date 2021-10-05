// import config from '../config/';
import { Request, Response, NextFunction } from 'express';
import { IRequest } from '../interfaces';

const isProjectOwner = async function (req: Request, res: Response, next: NextFunction) {
  try {
   
    next();
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ status: 'error', error: err });
  }
};

export { isProjectOwner };
