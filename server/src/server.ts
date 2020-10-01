import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import routes from './routes';

import './database';
import uploadConfig from './config/upload-config';
import generalException from './middlewares/generalException';

const app = express();

app.use(bodyParser.json());

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use(generalException);

app.listen(
  3333,
  () => console.log('🚀 Server Started on port 3333'), // eslint-disable-line no-console
);
