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

const ageMap = new Map()
ageMap.set('1st', 18)
ageMap.set('2nd', 18)
ageMap.set('3rd', 18)
ageMap.set('4th', 18)
ageMap.set('5th', 18)
ageMap.set('6th', 18)


const arrivalCountdown = (data) => {
    const newData = data.journeys.filter(e => e.legs[0].instruction.detailed.slice(0, 3) === '240').map(e => (dayjs().diff(e.startDateTime, 'minute') * -1)).filter(e => e >= 0).map(e => e < 1 ? '1' : e)
    return newData
}

// console.log(arrivalCountdown((dataSample)))

async function findUriKeyword() {
    const data = await needle(`https://tfl.gov.uk/plan-a-journey/results?InputFrom=Mill+Hill+Village+%2F+Hammers+Lane&FromId=1009902&InputTo=Edgware+Underground+Station&ToId=1000070api`)
    const apiUrlName = /tfl\.apiUrl = \"https:\/\/api-(.*)\.tfl\.gov\.uk\/\"/.exec(data.body)[1];
    // console.log(data.body)
    return apiUrlName;

}

// const am = new dayjs('2022-01-28T09:00:00.121Z').format('HHmm')
// const now = new dayjs('2022-01-28T13:23:54.121Z').format('HHmm')

/*
const findPeriod = (time) => {
    if (time >= "0900" && time < "0940") {
        return {period: '1', lower: '09:00', upper: '09:40'}
    } else if (time >= "0940" && time < "1020") {
        return {period: '2', lower: '09:40', upper: '10:20'}
    } else if (time >= "1020" && time < "1050") {
        return {period: 'Break', lower: '10:20', upper: '10:50'}
    } else if (time >= "1050" && time < "1130") {
        return {period: '3', lower: '10:50', upper: '11:30'}
    } else if (time >= "1130" && time < "1210") {
        return {period: '4', lower: '11:30', upper: '12:10'}
    } else if (time >= "1210" && time < "1250") {
        return {period: '5', lower: '12:10', upper: '12:50'}
    } else if (time >= "1250" && time < "1340") {
        return {period: 'Lunch', lower: '12:50', upper: '13:40'}
    }else if (time >= "1340" && time < "1420") {
        return {period: '6', lower: '13:40', upper: '14:20'}
    }else if (time >= "1420" && time < "1500") {
        return {period: '7', lower: '14:20', upper: '15:00'}
    }else if (time >= "1500" && time < "1505") {
        return {period: 'Gap', lower: '15:00', upper: '15:05'}
    }else if (time >= "1505" && time < "1545") {
        return {period: '8', lower: '15:05', upper: '15:45'}
    }else if (time >= "1545" && time < "1550") {
        return {period: 'Gap', lower: '15:45', upper: '15:50'}
    }else if (time >= "1550" && time < "1630") {
        return {period: '9', lower: '15:50', upper: '16:30'}
    } else {
        return {period: 'N/a', lower: '16:30', upper: '09:00'}
    }
}
*/

// const date = 1644580800
// console.log(new Date(date * 1000 ).getDay())

// console.log("Boys-U12A".slice(-3,-1))
// console.log(dayjs().hour())



module.exports = {busDateFormat, arrivalCountdown, findUriKeyword, ageMap}