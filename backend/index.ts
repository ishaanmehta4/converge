// ---------- Dependencies and imports ----------
require('dotenv').config();

const express = require('express');
import { Request, Response } from 'express';

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// ---------- Middlewares ----------
app.use(cors());
process.env.NODE_ENV !== 'test' && app.use(morgan('dev'));
app.use(bodyParser.json());

//---------- Initialising services ----------
require('./config/firebase');
const { connectToDB } = require('./config/mongoatlas');

// ---------- Routes for backend services ----------

const userRouter = require('./routes/userRouter');
const projectRouter = require('./routes/projectRouter');
const applicationRouter = require('./routes/applicationRouter');

app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/applications', applicationRouter);

// ---------- Routes for serving frontend files ----------
app.use(express.static('public'));

app.get('/landing', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

app.get('/*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


connectToDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('>> Server listening to port ' + (process.env.PORT || 5000) + '.');
    });
  })
  .catch((error: Error) => {
    console.log('Error encountered while starting the server.');
    console.log(error);
  });

module.exports = app;
