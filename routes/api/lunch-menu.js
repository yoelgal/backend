const express = require('express');
const {connect, mongoDb} = require('../../utils/mongo');


const router = express.Router();


async function loadLunchMenu() {
    await connect();
    const lunchData = await mongoDb.collection('lunch').find({}).toArray();
    return lunchData;
}

router.get('/', async (req, res) => {
    const menu = await loadLunchMenu()
    res.json(menu);
})

module.exports = router