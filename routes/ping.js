const express = require('express');
const router = express.Router();
const needle = require('needle')

router.get('/', async (req,res)=>{
    console.log('Pinged')
    res.json('ping main')
})

module.exports = router