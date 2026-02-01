import { index } from '../controllers/home.js';
import { index as _index, create, like, comment } from '../controllers/image.js';

export function initialize (app) {
  app.get('/', index);
  app.get('/images/:image_id', _index);
  app.post('/images', create);
  app.post('/images/:image_id/like', like);
  app.post('/images/:image_id/comment', comment);
}
