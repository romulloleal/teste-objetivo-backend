import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import routes from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(process.env.PORT || 3334, () => {
  console.log('🚀 Server started on port 3334!');
});
