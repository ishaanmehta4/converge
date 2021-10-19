import { Request } from 'express';
import { Document, Schema } from 'mongoose';

export interface IRequest extends Request {
  user: any
}

export interface IUser extends Document {
  username: string;
  firebase_uid: string;
  display_name?: string;
  display_picture?: string;
  phone_number?: string;
  email?: string;
  skills?: [string];
  fcm_device_tokens?: [string];
}

enum projectStatus {
    open,
    closed
}

export interface IProject extends Document {
  author: Schema.Types.ObjectId;
  title: string;
  description: string;
  address?: any;
  tags?: [string];
  skills_required?: [string];
  project_status: projectStatus
}

enum applicationStatus {
    pending,
    accepted,
    rejected
}

export interface IApplication extends Document {
  author: Schema.Types.ObjectId;
  project: Schema.Types.ObjectId;
  cover_letter: string;
  application_status: applicationStatus;
}
