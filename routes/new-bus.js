const express = require('express');
const router = express.Router();
const needle = require('needle')
const dayjs = require('dayjs');
let tfl_gov_uk = require('@datafire/tfl_gov_uk').create({
    apiKey: "14f7f5ff5d64df2e88701cef2049c804",
    appId: "8268063a"
});

router.get('/', async (req,res) =>{
    tfl_gov_uk.Line_Route({}).then(data => {
        res.json(data)
    });

})

module.exports = router