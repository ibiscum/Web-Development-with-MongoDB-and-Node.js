var home = require('../controllers/home'),
    image = require('../controllers/image'),
    RateLimit = require('express-rate-limit');

// Rate limiter for destructive image operations (e.g., delete)
var deleteLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50                    // limit each IP to 50 delete requests per windowMs
});

// Rate limiter for comment creation to prevent abuse/DoS on database writes
var commentLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200                  // limit each IP to 200 comment requests per windowMs
});

// Rate limiter for like operations to prevent abuse/DoS on database updates
var likeLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500                  // limit each IP to 500 like requests per windowMs
});

// Rate limiter for home page to prevent abuse/DoS on database reads
var homeLimiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000                 // limit each IP to 1000 home requests per windowMs
});

module.exports.initialize = function(app) {
    app.get('/', homeLimiter, home.index);
    app.get('/images/:image_id', image.index);
    app.post('/images', image.create);
    app.post('/images/:image_id/like', likeLimiter, image.like);
    app.post('/images/:image_id/comment', commentLimiter, image.comment);
    app.delete('/images/:image_id', deleteLimiter, image.remove);
};
