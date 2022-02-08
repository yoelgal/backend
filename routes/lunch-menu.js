const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const lunchMenu = require('../utils/lunch-menu.json')

router.get('/', async (req,res)=>{
    const calcWeek = ()=>{
        const curWeek = new dayjs().week()
    }
    res.json({
        week:1,
        lunchMenu
    })
})

module.exports = router