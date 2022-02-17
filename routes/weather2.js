const express = require('express');
const router = express.Router();
const needle = require('needle')


const key = 'd9bc3950d0f2b36bfcc5de2fd79d241d'
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


router.get('/', async (req, res) => {
    const resD = await needle(`https://api.openweathermap.org/data/2.5/onecall?lat=51.61906972255602&lon=-0.23053750094911576&units=metric&exclude=minutely,alerts&appid=${key}`)
    const data = resD.body

    const {sunrise, sunset} = data.current
    const finalData = {
        sunrise: `${new Date(sunrise * 1000).getHours().toString().padStart(2, '0')}:${new Date(sunrise * 1000).getMinutes().toString().padStart(2, '0')}`,
        sunset: `${new Date(sunset * 1000).getHours().toString().padStart(2, '0')}:${new Date(sunset * 1000).getMinutes().toString().padStart(2, '0')}`,
        dayLengthMins: Math.round((new Date(sunset * 1000).getTime() - new Date(sunrise * 1000).getTime()) / 1000 / 60),
        forecast: {
            hourly: [{
                time: 'Now',
                temp: Math.round(data.current.temp),
                desc: data.current.weather[0].description,
                icon: `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
            }, ...data.hourly.map(d => ({
                time: `${new Date(d.dt * 1000).getHours().toString().padStart(2, '0')}`,
                temp: Math.round(d.temp),
                desc: d.weather[0].description,
                icon: `http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`
            }))], daily: [...data.daily.map((d, i) => ({
                day: `${i > 0 ? days[new Date(d.dt * 1000).getDay()] : 'Today'}`,
                temp: Math.round(d.temp.day),
                high: Math.round(d.temp.max),
                low: Math.round(d.temp.min),
                desc: d.weather[0].description,
                icon: `http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`
            }))],
        }
    }

    res.json(finalData)
})

module.exports = router;