const express = require('express');
const router = express.Router();
const needle = require('needle')
const {busDateFormat, arrivalCountdown, findUriKeyword} = require('../utils/utils')



router.get('/', async (req, res) => {
    const now = new Date();
    const {d: uriDate, t: uriTime} = busDateFormat(now);
    const keyWord = await findUriKeyword()
    console.log(keyWord)
    // console.log(uriDate)
    // console.log(uriTime)

    //BUS TO EDGWARE
    const toEdgware = await needle(`https://api-${keyWord}.tfl.gov.uk/Journey/JourneyResults/1009902/to/1000070?AccessibilityPreference=norequirements&CyclePreference=none&Date=${uriDate}&JourneyPreference=leasttime&MaxWalkingMinutes=60&numberOfTrips=3&Mode=bus%2Ctube%2Cnational-rail%2Cdlr%2Coverground%2Ctflrail%2Criver-bus%2Ctram%2Ccable-car%2Ccoach%2Creplacement-bus&NationalSearch=False&Time=${uriTime}&TimeIs=Departing&WalkingOnly=False&IsExternalWidget=False&WalkingSpeed=average&alternativecycle=true&alternativewalking=true&WalkingOptimization=True&useMultiModalCall=true&routeBetweenEntrances=true&app_id=8268063a&app_key=14f7f5ff5d64df2e88701cef2049c804`)
    const edgwareData = toEdgware.body
    if (toEdgware.statusCode !== 200) throw new Error(`Current: ${edgwareData.message} (${edgwareData.status})`);


//    BUS TO MH EAST
    const toGolders = await needle(`https://api-${keyWord}.tfl.gov.uk//Journey/JourneyResults/1000374/to/1000147?AccessibilityPreference=norequirements&CyclePreference=none&Date=${uriDate}&JourneyPreference=leasttime&MaxWalkingMinutes=60&numberOfTrips=3&Mode=bus%2Ctube%2Cnational-rail%2Cdlr%2Coverground%2Ctflrail%2Criver-bus%2Ctram%2Ccable-car%2Ccoach%2Creplacement-bus&NationalSearch=False&Time=${uriTime}&TimeIs=Departing&WalkingOnly=False&IsExternalWidget=False&WalkingSpeed=average&alternativecycle=true&alternativewalking=true&WalkingOptimization=True&useMultiModalCall=true&routeBetweenEntrances=true&app_id=8268063a&app_key=14f7f5ff5d64df2e88701cef2049c804`)
    const goldersData = toGolders.body
    if (toGolders.statusCode !== 200) throw new Error(`Current: ${goldersData.message} (${goldersData.status})`);


    const filteredData = {
        edgware: arrivalCountdown(edgwareData),
        golders: arrivalCountdown(goldersData)
    }

    res.json(filteredData)
    // res.json(mhData)



})



module.exports = router;
