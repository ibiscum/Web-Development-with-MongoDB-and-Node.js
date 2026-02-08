var home = require('../controllers/home'),
    image = require('../controllers/image');

var RateLimit = require('express-rate-limit');

var likeLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100                  // limit each IP to 100 like requests per windowMs
});

var homeLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100                  // limit each IP to 100 home requests per windowMs
});

var imageViewLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100                  // limit each IP to 100 image view requests per windowMs
});

module.exports.initialize = function(app) {
    app.get('/', homeLimiter, home.index);
    app.get('/images/:image_id', imageViewLimiter, image.index);
    app.post('/images', image.create);
    app.post('/images/:image_id/like', likeLimiter, image.like);
    app.post('/images/:image_id/comment', image.comment);
    app.delete('/images/:image_id', image.remove);
};
