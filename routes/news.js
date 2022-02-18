const express = require('express');
const router = express.Router();
const needle = require('needle')

router.get('/', async (req, res) => {
    const newsRes = await needle(`https://newsapi.org/v2/top-headlines?&apiKey=4db889f4ad6242d5832b52a3c5a53f15`)
    const newsData = newsRes.body.articles.map(e => ({
        title: e.title, source: e.source.name
    }))

    res.json(newsData)
})


module.exports = router

