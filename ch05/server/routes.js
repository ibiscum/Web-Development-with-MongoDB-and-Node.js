import { indexHome } from '../controllers/home.js';
import { indexImage, create, like, comment } from '../controllers/image.js';

export function initialize (app) {
  app.get('/', indexHome);
  app.get('/images/:image_id', indexImage);
  app.post('/images', create);
  app.post('/images/:image_id/like', like);
  app.post('/images/:image_id/comment', comment);
}
