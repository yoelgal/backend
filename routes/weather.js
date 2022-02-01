const express = require('express');
const router = express.Router();
const needle = require('needle')
const dayjs = require('dayjs');


const key = 'd9bc3950d0f2b36bfcc5de2fd79d241d'

/* GET users listing. */
router.get('/', async (req, res) => {
    //CURRENT
    const resCur = await needle(`https://api.openweathermap.org/data/2.5/weather?lat=51.61906972255602&lon=-0.23053750094911576&units=metric&cnt=5&appid=${key}`);
    const dataCur = resCur.body;
    if (resCur.statusCode !== 200) throw new Error(`Current: ${dataCur.message} (${resCur.status})`);

    //  FORECAST
    const resFore = await needle(`https://api.openweathermap.org/data/2.5/forecast?lat=51.61906972255602&lon=-0.23053750094911576&units=metric&cnt=7&appid=${key}`);
    const dataFore = resFore.body;
    if (resFore.statusCode !== 200) throw new Error(`Forecast: ${dataFore.message} (${resFore.status})`);

    const {sunrise, sunset} = dataCur.sys;
    const weatherData = {
        sunrise: `${new Date(sunrise * 1000).getHours().toString().padStart(2,'0')}:${new Date(sunrise * 1000).getMinutes().toString().padStart(2,'0')}`,
        sunset: `${new Date(sunset * 1000).getHours().toString().padStart(2,'0')}:${new Date(sunset * 1000).getMinutes().toString().padStart(2,'0')}`,
        dayLengthMins: Math.round((new Date(sunset * 1000).getTime() - new Date(sunrise * 1000).getTime()) / 1000 / 60),
        forecast: [{
            time: 'Now',
            temp: Math.round(dataCur.main.temp),
            desc: dataCur.weather[0].description,
            conditions: dataCur.weather[0].main,
            icon: `http://openweathermap.org/img/wn/${dataCur.weather[0].icon}@2x.png`
        }, ...dataFore.list.map(d => ({
            time: d.dt_txt.slice(11, -6),
            temp: Math.round(d.main.temp),
            desc: d.weather[0].description,
            conditions: d.weather[0].main,
            icon: `http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`
        }))]
    }

    res.json(weatherData)
});

module.exports = router;
