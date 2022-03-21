const express = require('express')
const router = express.Router()
const Articles = require('../utils/models/newsSchema')
const mongoose = require("mongoose");

// Getting all
router.get('/', async (req, res) => {
    try {
        const headlines = await Articles.find()
        res.json(headlines)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})




module.exports = router