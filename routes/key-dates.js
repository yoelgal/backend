const express = require('express');
const router = express.Router();
const needle = require('needle')
const dayjs = require('dayjs')

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

router.get('/', async (req, res) => {
    const today = new dayjs()
    const end = new dayjs().add(2, 'month')

    const startDate = `${today.format('D')} ${months[today.format('M') - 1]} ${today.format('YYYY')}`
    const endDate = `${end.format('D')} ${months[end.format('M') - 1]} ${end.format('YYYY')}`

    const resD = await needle(`https://www.socscms.com/socs/xml/SOCScalendar.ashx?ID=182&Sport=0&CoCurricular=0&startdate=${startDate}&enddate=${endDate}&key=26848B8E-91E4-4507-B298-0051450C69ED`)
    const data = resD.body
    if (resD.statusCode !== 200) throw new Error(`Current: ${data.message} (${data.status})`);


    const filteredData = data.children.map(d=>({
        title: d.children[7].value,
        date: d.children[2].value,
        category: d.children[10].value,
        dateArr: new Date(`${d.children[2].value.split('/')[1]}/${d.children[2].value.split('/')[0]}/${d.children[2].value.split('/')[2]}`).toDateString().split(' ')
    })).filter(d=> !d.title.includes('Postponed') && !d.title.includes('Week A') && !d.title.includes('Week B')&& !d.category.includes('Nursery')&& !d.category.includes('Reception')&& !d.category.includes('Yr 1')&& !d.category.includes('Year 1')&& !d.category.includes('Yr 2') && !d.category.includes('Year 2') && !d.category.includes('Yr 3')&& !d.category.includes('Year 3')&& !d.category.includes('Yr 4')&& !d.category.includes('Year 4')&& !d.category.includes('Yr 5')&& !d.category.includes('Year 5')&& !d.category.includes('Yr 6')&& !d.category.includes('Year 6')&& !d.category.includes('Yr 7')&& !d.category.includes('Year 7')&& !d.category.includes('Yr 8')&& !d.category.includes('Year 8'))

        // .filter(d=> (d.category.includes('Yr 9') || d.category.includes('Yr 10')||d.category.includes('Yr 11')||d.category.includes('Yr 12')||d.category.includes('Yr 13')) && (!d.title.includes('Week A') || !d.title.includes('Week B')))

    res.json(filteredData)
})

module.exports = router