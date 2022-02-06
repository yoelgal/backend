const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const lunchMenu = require('../utils/lunch-menu.json')

router.get('/', async (req,res)=>{
    res.json(lunchMenu)
})

module.exports = router