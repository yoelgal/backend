const express = require('express');
const router = express.Router();
const needle = require('needle')
const csQuotes = require('../utils/quotes.json')
const Quote = require("../utils/models/quoteSchema");

router.get('/', async (req, res) => {
    try {
        const quote = await Quote.find()
        res.json(quote)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router;

