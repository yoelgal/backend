// REDUNDANT ROUTE

const express = require('express');
const router = express.Router();
const needle = require('needle')

router.get('/', async (req, res) => {
    const newsRes = await needle(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=4db889f4ad6242d5832b52a3c5a53f15`)
    const newsBody = newsRes.body
    if (newsRes.statusCode !== 200) throw new Error(`Current: ${newsBody.message} (${newsBody.status})`);
    const newsData = newsBody.articles.map(e => ({
        title: e.title, source: e.source.name
    }))

    res.json(newsData)
})


module.exports = router

