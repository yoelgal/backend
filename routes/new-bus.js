// NEW BUS - EXPERIMENTAL

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

const handleBus = (inpArr,stopName) =>{
    return inpArr.filter(e => e.includes(stopName)).map(e => e.split(',')).map(e => countDown(e[3].slice(0, -3))).sort(function (a, b) {
        return a - b
    }).map(e => e > 0 ? `${e}` : 'Due')
}

router.get('/', async (req, res) => {
    const busRes = await needle('http://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1')
    const busArr = busRes.body.split('[')
    if (busRes.statusCode !== 200) throw new Error(`${busArr.message} (${busArr.statusCode})`)


    // const times = {
    //     edg: busArr.filter(e => e.includes("Mill Hill Village / Hammers Lane")).map(e => e.split(',')).map(e => countDown(e[3].slice(0, -3))).sort(function (a, b) {
    //         return a - b
    //     }).map(e => e > 0 ? `${e}` : 'Due'),
    //     gol: busArr.filter(e => e.includes("Mill Hill Village / The Ridgeway")).map(e => e.split(',')).map(e => countDown(e[3].slice(0, -3))).sort(function (a, b) {
    //         return a - b
    //     }).map(e => e > 0 ? `${e}` : 'Due')
    // }

    const times = {
        edgware: handleBus(busArr,"Mill Hill Village / Hammers Lane"),
        golders: handleBus(busArr,"Mill Hill Village / The Ridgeway")
    }


    res.json(times)


})

module.exports = router

