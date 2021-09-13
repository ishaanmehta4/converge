// ---------- Dependencies and imports ----------
const express = require('express');
import {Request, Response} from 'express';

const app = express();
const cors = require('cors')
const morgan = require('morgan');
const path = require('path');


// ---------- Middlewares ----------
app.use(cors());
app.use(morgan('dev'));

// ---------- Routes ----------

const userRouter = require('./routes/userRouter')
const projectRouter = require('./routes/projectRoutes')
const applicationRouter = require('./routes/applicationRouter')

app.get('/', (req:Request, res:Response) => {
  res.send({ status: 'success', message: 'Server running.' });
});
app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter)
app.use('/api/applications', applicationRouter)

//---------- Root Route for frontend ----------
// app.get('/', (req:Request, res:Response) => {
//   res.sendFile(path.join(__dirname, 'build-react', 'index.html'));
// })
// app.use(express.static(path.join(__dirname, 'build-react')))

// ---------- Middlewares ----------
app.listen(process.env.PORT || 5000, () => {
  console.log('> Server listening to port ' + (process.env.PORT || 5000));
});
