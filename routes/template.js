const express = require('express');
const router = express.Router();
const needle = require('needle')

router.get('/', async (req,res)=>{
    res.json()
})

module.exports = router