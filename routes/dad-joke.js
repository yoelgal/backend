const express = require('express');
const router = express.Router();
const needle = require('needle')

router.get('/', async (req, res) => {
    const dadJoke = await needle(`https://icanhazdadjoke.com/slack`)

    if (dadJoke.statusCode !== 200) throw new Error(`Current: ${dadJoke.body.message} (${dadJoke.body.status})`);
    res.json({
        newText: dadJoke.body.attachments[0].text.replaceAll("\"", "'").replaceAll('\r', ' ').replaceAll('\n', ' '),
        // oldText: dadJoke.body.attachments[0].text,

    })
})

module.exports = router;

//.replaceAll("\\", '').replaceAll('\r', ' ').replaceAll('\n', ' ')