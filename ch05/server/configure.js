// import pkg from 'connect';
// const { logger, bodyParser, json, urlencoded, methodOverride, cookieParser, errorHandler } = pkg;
// import { join } from 'path';
import { initialize } from './routes.js';
import { create } from 'express-handlebars';
import moment from 'moment';

export default function (app) {
  app.engine('handlebars', create({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: [app.get('views') + '/partials'],
    helpers: {
      timeago: function (timestamp) {
        console.log(timestamp);
        return moment(timestamp).startOf('minute').fromNow();
      }
    }
  }).engine);

  app.set('view engine', 'handlebars');

  // app.use(logger('dev'));
  // app.use(bodyParser({
  //   uploadDir: join(import.meta.dirname, '../public/upload/temp')
  // }));

  // app.use(json());
  // app.use(urlencoded());
  // app.use(methodOverride());
  // app.use(cookieParser('some-secret-value-here'));
  // app.use(app.router);
  // app.use('/public/', (join(import.meta.dirname, '../public')));

  // if ('development' === app.get('env')) {
  //   app.use(errorHandler());
  // }

  initialize(app);

  return app;
};
