const express = require('express');
const {connect, mongoDb} = require('../../utils/mongo');


const router = express.Router();


async function loadTimetable() {
    await connect();
    const timetableData = await mongoDb.collection('timetable').find({}).toArray();
    return timetableData;
}

router.get('/', async (req, res) => {
    const timetable = await loadTimetable()
    res.json(timetable);
})

module.exports = router