import express from 'express';
import router from 'express';
import connect from 'connect';
import logger from 'morgan';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
const { errorHandler } = connect;
import { join } from 'path';
import { initialize } from './routes.js';
import { create } from 'express-handlebars';

export default function (app) {
  app.engine('handlebars', create({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: [app.get('views') + '/partials']
  }).engine);
  app.set('view engine', 'handlebars');

  app.use(logger('dev'));
  // app.use(bodyParser({
  //   uploadDir: join(import.meta.dirname, '../public/upload/temp')
  // }));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(methodOverride());
  app.use(cookieParser('some-secret-value-here'));
  app.use(router());
  app.use('/public/', join(import.meta.dirname, '../public'));

  if ('development' === app.get('env')) {
    app.use(errorHandler());
  }

  initialize(app);

  return app;
};
