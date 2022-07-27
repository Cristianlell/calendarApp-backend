var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
var authRouter = require('./routes/authRoutes');
var eventRouter = require('./routes/eventRoutes');
const dbConnection = require('./database/config');
const { errorHandler } = require('./helpers/errorHandler');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

dbConnection();
app.use(cors())
app.use('/api/auth', authRouter);
app.use('/api/event', eventRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  errorHandler(err, req, res)

});
module.exports = app;
