const express = require('express');
const router = express.Router();
const needle = require('needle')
const dayjs = require('dayjs');


router.get('/', async (req, res) => {
    const resD = await needle('https://www.schoolssports.com/school/xml/fixturecalendar.ashx?ID=182&key=26848B8E-91E4-4507-B298-0051450C69ED')
    const data = resD.body
    const today = new Date();
    const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);


    const fixtureList = data.children.map(d => ({
        sport: d.children[1].value,
        date: d.children[2].value,
        team: d.children[6].value.replaceAll("&amp;", "&"),
        opponent: d.children[7].value.replaceAll("&amp;", "&").replaceAll("University College School (UCS)", "UCS"),
        fullDate: new Date(d.children[13].value),
    })).filter(d => d.fullDate > today && d.fullDate < nextWeek && d.team.includes('U14' || 'U15' || 'U16' || 'U17' || 'U18' || '1st' || '2nd' || '3rd' || '4th' || '5th'))


    res.json(fixtureList)
})

module.exports = router