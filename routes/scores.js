const express = require('express');
const router = express.Router();
const needle = require('needle')

const {ageMap} = require('../utils/utils')

router.get('/', async (req, res) => {
    const resD = await needle('https://www.schoolssports.com/school/xml/results.ashx?ID=182&key=26848B8E-91E4-4507-B298-0051450C69ED')
    const data = resD.body
    const today = new Date();
    let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    let scoresList = data.children.map(d => ({
        sport: d.children[1].value,
        date: d.children[2].value,
        team: d.children[4].value.replaceAll("&amp;", "&"),
        opponent: d.children[5].value.replaceAll("&amp;", "&").replaceAll("University College School (UCS)", "UCS"),
        score: d.children[8].value,
        fullDate: new Date(`${d.children[2].value.split("/")[1]}/${d.children[2].value.split("/")[0]}/${d.children[2].value.split("/")[2]}`),
        oth: d.children[4].value.slice(0, 3),
        teamNum: null
    })).filter(d => d.fullDate < today && d.fullDate > lastWeek && d.score !== "Cancelled" && d.score !== "Abandoned" && d.score !== "Postponed" && d.score !== "See Report")

    for (let e of scoresList) {
        if (ageMap.get(e.oth)) {
            e.teamNum = ageMap.get(e.oth)
        } else {
            e.teamNum = parseInt(e.team.replace(/\D/g, ''))
        }
    }

    scoresList = scoresList.filter(e => e.teamNum > 13)

    res.json(scoresList)
})

module.exports = router