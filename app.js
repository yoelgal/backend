const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const db = require('./utils/mongo')
const CronJob = require('cron').CronJob;
const needle = require('needle')

const app = express();

//mongo
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//news loading
const newsLoad = require('./utils/newsLoader')
newsLoad()
setInterval(newsLoad, 3600000)

//pinger
setInterval(async function (req, res) {
    const hour = (new Date()).getHours()
    if (hour >= 1 && hour <= 7) {
        const pingRes = await needle('https://fathomless-crag-41517.herokuapp.com/ping')
        const pingBody = pingRes.body
        if (pingRes.statusCode !== 200) throw new Error(`Current: ${pingBody.message} (${pingBody.status})`);
    }
}, 300000)

//quote cron-job
const quoteLoad = require('./utils/quoteLoader')
let quoteJob = new CronJob('0 0 23 * * *', function () {
    quoteLoad()
}, null, true, 'Europe/London');
quoteJob.start()
// TESTING setInterval(quoteLoad,10000)

// middle ware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

const indexRouter = require('./routes/index');
const busRouter = require('./routes/bus')
const newBus = require('./routes/new-bus')
const quotesRouter = require('./routes/quotes')
const lunchMenuRouter = require('./routes/lunch-menu')
const dadJokeRouter = require('./routes/dad-joke')
const newsRouter = require('./routes/news')
const newWeatherRouter = require('./routes/weather2')
const weather3 = require('./routes/weather3')
const fixtureRouter = require('./routes/fixtures')
const scoresRouter = require('./routes/scores')
const datesRouter = require('./routes/key-dates')
const newsDB = require('./routes/newsDB')
const pingRouter = require('./routes/ping')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/bus', busRouter)
app.use('/new-bus', newBus);
app.use('/quotes', quotesRouter)
app.use('/lunch-menu', lunchMenuRouter)
app.use('/dad-joke', dadJokeRouter)
app.use('/news', newsRouter)
app.use('/weather2', newWeatherRouter)
app.use('/weather3', weather3)
app.use('/fixtures', fixtureRouter)
app.use('/scores', scoresRouter)
app.use('/dates', datesRouter)
app.use('/news-db', newsDB)
app.use('/ping', pingRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
