// NEW BUS - WORKING

const express = require('express');
const router = express.Router();
const needle = require('needle')
const dayjs = require('dayjs');

const countDown = (ts) => {
    const now = dayjs()
    const bus = dayjs(parseInt(ts))
    const time = Math.round((bus - now) / 60000)
    return time
}

// const handleBus = (inpArr, stopName) => {
//     return inpArr.filter(e => e.includes(stopName)).map(e => e.split(',')).map(e => countDown(e[3].slice(0, -3))).sort(function (a, b) {
//         return a - b
//     }).map(e => e > 0 ? `${e}` : 'Due')
// }

const filterBus = (arr) => {
    let times = {
        edgware: [],
        golders: [],
    }

    let edgArr = []
    let golArr = []

    arr.filter(e => e.includes("Mill Hill Village / Hammers Lane") || e.includes("Mill Hill Village / The Ridgeway")).map(e => e.split(',')).map(e => ({
        stop: e[1].slice(1, -1),
        time: countDown(e[3].slice(0, -3))
    })).sort(function (a, b) {
        return a.time - b.time
    }).forEach(e => {
        e.time > 0 ? e.time = `${e.time}` : e.time = 'Due';
        e.stop === "Mill Hill Village / Hammers Lane" ? edgArr.push(e) : golArr.push(e)
    })

    times.edgware = edgArr.map(e => (e.time))
    times.golders = golArr.map(e => (e.time))


    return times
}


router.get('/', async (req, res) => {
    const busRes = await needle('http://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1')
    const busArr = busRes.body.split('[')
    if (busRes.statusCode !== 200) throw new Error(`${busArr.message} (${busArr.statusCode})`)

    res.json(filterBus(busArr))
})

module.exports = router

