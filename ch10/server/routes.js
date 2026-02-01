var home = require('../controllers/home'),
    image = require('../controllers/image'),
    RateLimit = require('express-rate-limit');

// Rate limiter for destructive image operations (e.g., delete)
var deleteLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50                    // limit each IP to 50 delete requests per windowMs
});

module.exports.initialize = function(app) {
    app.get('/', home.index);
    app.get('/images/:image_id', image.index);
    app.post('/images', image.create);
    app.post('/images/:image_id/like', image.like);
    app.post('/images/:image_id/comment', image.comment);
    app.delete('/images/:image_id', deleteLimiter, image.remove);
};
