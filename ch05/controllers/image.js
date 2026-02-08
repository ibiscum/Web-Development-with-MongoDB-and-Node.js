export function indexImage(req, res) {
  res.render('image');
};

export function create(req, res) {
  res.send('The image:create POST controller');
  res.redirect('/images/1');
};

export function like(req, res) {
  res.send('The image:like POST controller');
};

export function comment(req, res) {
  res.send('The image:comment POST controller');
};

