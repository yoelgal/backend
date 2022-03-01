const express = require('express');
const router = express.Router();
const needle = require('needle')
const dayjs = require('dayjs');

const {ageMap, sportMap} = require('../utils/utils')

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

router.get('/', async (req, res) => {
    const resD = await needle('https://www.schoolssports.com/school/xml/fixturecalendar.ashx?ID=182&key=26848B8E-91E4-4507-B298-0051450C69ED')
    const data = resD.body
    const today = new Date();
    const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);


    let fixtureList = data.children.map(d => ({
        sport: d.children[1].value,
        emoji: sportMap.get(d.children[1].value),
        date: d.children[2].value,
        team: d.children[6].value.replaceAll("&amp;", "&"),
        opponent: d.children[7].value.replaceAll("&amp;", "&").replaceAll("University College School (UCS)", "UCS"),
        fullDate: new Date(d.children[13].value),
        dateFormat: `${days[new Date(d.children[13].value).getDay()]} ${new Date(d.children[13].value).getDate()} ${months[new Date(d.children[13].value).getMonth()]}`,
        oth: d.children[6].value.slice(0, 3),
        teamNum: null
    })).filter(d => d.fullDate > today && d.fullDate < nextWeek)

    for (let e of fixtureList) {
        if (ageMap.get(e.oth)) {
            e.teamNum = ageMap.get(e.oth)
        } else {
            e.teamNum = parseInt(e.team.replace(/\D/g, ''))
        }
    }

    fixtureList = fixtureList.filter(e => e.teamNum > 13)


    res.json(fixtureList)
})

module.exports = router