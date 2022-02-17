const express = require('express');
const router = express.Router();
const needle = require('needle')
const dayjs = require('dayjs')

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
router.get('/', async (req, res) => {
    const today = new dayjs()
    const end = new dayjs().add(3, 'month')

    const startDate = `${today.format('D')} ${months[today.format('M') - 1]} ${today.format('YYYY')}`
    const endDate = `${end.format('D')} ${months[end.format('M') - 1]} ${end.format('YYYY')}`

    const resD = await needle(`https://www.socscms.com/socs/xml/SOCScalendar.ashx?ID=182&Sport=0&CoCurricular=0&startdate=${startDate}&enddate=${endDate}&key=26848B8E-91E4-4507-B298-0051450C69ED`)
    const data = resD.body

    const filteredData = data.children.map(d=>({
        title: d.children[7].value,
        date: d.children[2].value,
        category: d.children[10].value
    })).filter(d=> d.category.includes('Yr 9') || d.category.includes('Yr 10')||d.category.includes('Yr 11')||d.category.includes('Yr 12')||d.category.includes('Yr 13'))

    res.json(filteredData)
})

module.exports = router