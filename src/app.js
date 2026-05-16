// src/app.js

import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/error.middleware.js'; 
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to MoodMate API! Please use /api/v1 for the latest version of the API.',
  });
});

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to MoodMate API v1! ',
  });
});

app.use('/api/v1/auth', authRoutes);

app.use(errorHandler);

export {app};
export default app;