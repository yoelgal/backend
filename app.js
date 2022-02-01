const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();


// middle ware
app.use(bodyParser.json());
app.use(cors());

const indexRouter = require('./routes/index');
const weatherRouter = require('./routes/weather');
const busRouter = require('./routes/bus')
const quotesRouter = require('./routes/quotes')
const lunchMenuRouter = require('./routes/api/lunch-menu')
const timetableRouter = require('./routes/api/timetable')
const dadJokeRouter = require('./routes/dad-joke')
const newsRouter = require('./routes/news')
// const newBusRouter = require('./routes/new-bus')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/weather', weatherRouter);
app.use('/bus', busRouter)
app.use('/quotes', quotesRouter)
app.use('/api/lunch-menu', lunchMenuRouter)
app.use('/api/timetable', timetableRouter)
app.use('/dad-joke', dadJokeRouter)
app.use('/news', newsRouter)
// app.use('/new-bus', newBusRouter)


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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
