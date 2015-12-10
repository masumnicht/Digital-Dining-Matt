var express = require('express');
//var session = require('express-session');
var router = require('./router.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('./middleware/logger');
var expressJwt = require('express-jwt');

var app = express();
var expressRouter = express.Router();
app.use(express.static(__dirname + '/../client-mobile'));

//cookie parser
app.use(cookieParser());

// parse application/x-www-form-urlencoded and application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger);
app.use(expressJwt({secret: 'feline'}).unless({path: /\/.*/})); //TODO: make secret private
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  } else {
    next();
  }
});


//set up router
app.use('/', expressRouter);
router(expressRouter);

app.listen(8000);

module.exports = app;

