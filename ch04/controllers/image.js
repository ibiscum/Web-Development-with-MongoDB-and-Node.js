export function index(req, res) {
  res.send('The image:index controller ' + req.params.image_id);
}
export function create(req, res) {
  res.send('The image:create POST controller');
}
export function like(req, res) {
  res.send('The image:like POST controller');
}
export function comment(req, res) {
  res.send('The image:comment POST controller');
}
