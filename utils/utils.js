const dayjs = require('dayjs');
const needle = require("needle");

const busDateFormat = (dt) => {
    const d = dayjs(dt).format('YYYYMMDD');
    const t = dayjs(dt).format('HHmm');
    return {d, t};
}

//
// const dataSample = require('./data.json');
//
//
// const now = dayjs('2021-12-23T11:20:10.009');

const arrivalCountdown = (data) => {
    const newData = data.journeys.filter(e => e.legs[0].instruction.detailed.slice(0, 3) === '240').map(e => (dayjs().diff(e.startDateTime, 'minute') * -1)).filter(e => e >= 0).map(e => e < 1 ? 'Due' : e)
    return newData

}

// console.log(arrivalCountdown((dataSample)))

async function findUriKeyword() {
    const data = await needle(`https://tfl.gov.uk/plan-a-journey/results?InputFrom=Mill+Hill+Village+%2F+Hammers+Lane&FromId=1009902&InputTo=Edgware+Underground+Station&ToId=1000070api`)
    const apiUrlName = /tfl\.apiUrl = \"https:\/\/api-(.*)\.tfl\.gov\.uk\/\"/.exec(data.body)[1];
    return apiUrlName;
}

// console.log("Two parrots are sitting on a perch. One turns to the other and asks, \"do you smell fish?\"".replaceAll(","))

module.exports = {busDateFormat, arrivalCountdown, findUriKeyword}