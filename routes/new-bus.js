const express = require('express');
const router = express.Router();
const needle = require('needle')
const dayjs = require('dayjs');

router.get('/', async (req,res) =>{
    const busRes = await needle('https://tfl.gov.uk/bus/stop/490009902S/mill-hill-village-hammers-lane/?lineId=240')
    console.log(busRes.body)
    const busTime1 = /tfl\.apiUrl = \"https:\/\/api-(.*)\.tfl\.gov\.uk\/\"/.exec(busRes.body)

    res.json(busTime1)
})

module.exports = router