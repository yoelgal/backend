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
const busRouter = require('./routes/bus')
const quotesRouter = require('./routes/quotes')
const lunchMenuRouter = require('./routes/lunch-menu')
const dadJokeRouter = require('./routes/dad-joke')
const newsRouter = require('./routes/news')
const newWeatherRouter = require('./routes/weather2')
const fixtureRouter = require('./routes/fixtures')
const scoresRouter = require('./routes/scores')
const datesRouter = require('./routes/key-dates')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bus', busRouter)
app.use('/quotes', quotesRouter)
app.use('/lunch-menu', lunchMenuRouter)
app.use('/dad-joke', dadJokeRouter)
app.use('/news', newsRouter)
app.use('/weather2', newWeatherRouter)
app.use('/fixtures', fixtureRouter)
app.use('/scores', scoresRouter)
app.use('/dates', datesRouter)


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
