var home = require('../controllers/home'),
    image = require('../controllers/image');

var RateLimit = require('express-rate-limit');

var commentLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100                   // limit each IP to 100 comment requests per windowMs
});

var deleteLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20                    // limit each IP to 20 delete requests per windowMs
});

var viewLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200                   // limit each IP to 200 image view requests per windowMs
});

var homeLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200                   // limit each IP to 200 home page requests per windowMs
});

module.exports.initialize = function(app) {
    app.get('/', homeLimiter, home.index);
    app.get('/images/:image_id', viewLimiter, image.index);
    app.post('/images', image.create);
    app.post('/images/:image_id/like', commentLimiter, image.like);
    app.post('/images/:image_id/comment', commentLimiter, image.comment);
    app.delete('/images/:image_id', deleteLimiter, image.remove);
};
