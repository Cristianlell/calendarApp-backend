var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
var authRouter = require('./routes/authRoutes');
var eventRouter = require('./routes/eventRoutes');
const dbConnection = require('./database/config');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'..', 'public')));

dbConnection();
app.use(cors())
app.use('/api/auth', authRouter);
app.use('/api/event', eventRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  console.log("error: ",err)
  res.status(err.status || 500).json({
    message: err.message || "INTERNAL SERVER ERROR",
    status: err.status || 500,
    body: err.body || err
  });
});
module.exports = app;
