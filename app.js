var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');

// Libraries
var responseMessages = require('./lib/response-messages');
var authentication = require('./middlewares/authentication');

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var veventRouter = require('./routes/vevent');
var deviceRouter = require('./routes/device');

var app = express();

// Enable CORS
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Authenticate all requests
/*
app.use(function(req, res, next) {
	authentication.authRequest(req, res, next);
});*/

// API Calls
app.use('/', indexRouter);
app.use('/v1/users', usersRouter);
app.use('/v1/vevent', veventRouter);
app.use('/v1/device', deviceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    response = responseMessages.commonResponse(responseMessages.NOT_FOUND);
    res.status(404).json(response);
});

// error handler
app.use(function(err, req, res, next) {

  /*// set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');*/
  response = responseMessages.commonResponse(responseMessages.UNKNOWN_ERROR, "", "", err.message);
  res.status(500).json(response);
});

module.exports = app;
