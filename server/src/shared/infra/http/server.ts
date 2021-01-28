import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-node-fs-backend';
import i18next from 'i18next';

import uploadConfig from '@config/upload-config';

import '../typeorm';
import '@shared/container';
import routes from './routes';
import generalException from './middlewares/generalException';

const app = express();

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: `${__dirname}/../../resources/locales/{{lng}}/{{ns}}.json`,
    },
    fallbackLng: 'en',
    preload: ['pt-BR', 'en'],
  });

app.use(cors());
app.use(bodyParser.json());

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(i18nextMiddleware.handle(i18next));
app.use(routes);

app.use(generalException);

app.listen(
  3333,
  () => console.log('🚀 Server Started on port 3333'), // eslint-disable-line no-console
);
