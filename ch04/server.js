import express from 'express';
// import config from './server/configure.js';
var app = express();

app.set('port', process.env.PORT || 3300);
app.set('views', import.meta.dirname + '/views');
// app = config(app);

app.listen(app.get('port'), function () {
  console.log('Server up: http://localhost:' + app.get('port'));
});
