import {Server} from 'http';

import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

import {authenticate} from '../middlewares';
import urlpatterns from '../routes';
import {MONGO_URI} from '../settings';

export function getRequestListener() {
  const application = express();
  application.use(helmet());
  application.use(express.urlencoded({extended: true}));
  application.use(express.json());
  application.use(morgan('combined'));
  application.use(authenticate);

  urlpatterns.forEach((router, prefix) => {
    application.use(prefix, router);
  });

  return application;
}

export default async function bootstrap(port, host) {
  const requestListener = getRequestListener();

  const options = {};
  const server = new Server(options, requestListener);

  await mongoose.connect(MONGO_URI);
  server.listen(port, host, () => {
    console.log(server.address());
  });
}
