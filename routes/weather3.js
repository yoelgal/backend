const express = require('express');
const router = express.Router();
const needle = require('needle')
const dayjs = require("dayjs");

const key = 'd9bc3950d0f2b36bfcc5de2fd79d241d'

router.get('/', async (req,res)=>{
    //current
    const resCur = await needle(`api.openweathermap.org/data/2.5/weather?lat=51.61906972255602&lon=-0.23053750094911576&units=metric&appid=${key}`)
    const curData = resCur.body

    //hourly
    const resFore = await needle(`api.openweathermap.org/data/2.5/forecast?lat=51.61906972255602&lon=-0.23053750094911576&units=metric&appid=${key}`)
    const foreData = resFore.body

    const {sunrise,sunset} = curData.sys
    const finalData = {
        hour: `${dayjs().hour()}/24`,
        wind: {
            ms: curData.wind.speed,
            kmh: Math.round(curData.wind.speed * 3.6)
        },
        sunrise: `${new Date(sunrise * 1000).getHours().toString().padStart(2, '0')}:${new Date(sunrise * 1000).getMinutes().toString().padStart(2, '0')}`,
        sunset: `${new Date(sunset * 1000).getHours().toString().padStart(2, '0')}:${new Date(sunset * 1000).getMinutes().toString().padStart(2, '0')}`,
        current: {
            temp: Math.round(curData.main.temp),
            feelsLike: Math.round(curData.main.feels_like),
        },
        forecast: foreData.list.map(d=>({
            time: `${new Date(d.dt * 1000).getHours().toString().padStart(2, '0')}`,
            temp: Math.round(d.main.temp),
            desc: d.weather[0].description,
            icon: `http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`

        }))
    }
    res.json(finalData)


})

module.exports = router