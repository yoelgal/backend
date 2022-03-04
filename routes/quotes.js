const express = require('express');
const router = express.Router();
const needle = require('needle')
const csQuotes = require('../utils/csQuotes.json')

router.get('/',
    async (req, res) => {
//         //CHUCK NORRIS
//         const chuckRes = await needle(`https://api.chucknorris.io/jokes/random`)
//         const chuckData = chuckRes.body
//         if (chuckRes.statusCode !== 200) throw new Error(`Current: ${chuckData.message} (${chuckData.status})`);
//
//         //IBRA
//         const ibraRes = await needle(`http://www.zlatanjokes.site/joke`)
//         const ibraData = ibraRes.body
//         if (ibraRes.statusCode !== 200) throw new Error(`Current: ${ibraData.message} (${ibraData.status})`);
// /*
        //INSPIRATIONAL
//         const quoteRes = await needle(`https://zenquotes.io/api/today`)
//         const quoteData = JSON.parse(quoteRes.body)
//         if (quoteRes.statusCode !== 200) throw new Error(`Current: ${quoteData.message} (${quoteData.status})`);
// */
        //CS
        // const csRes = await needle(`http://quotes.stormconsultancy.co.uk/quotes/random.json`)
        // const csData = csRes.body
        // if (csRes.statusCode !== 200) throw new Error(`Current: ${csData.message} (${csData.status})`);
        const quoteNum = Math.floor(Math.random() * 71)
        //
        // //KANYE REST
        // const kanyeRes = await needle(`https://api.kanye.rest`)
        // const kanyeQuote = kanyeRes.body.quote

        // //Useless fact
        // const factRes = await needle(`https://uselessfacts.jsph.pl/random.json?language=en`)
        // const factData = factRes.body.text



        res.json({
           //  chuck: chuckData.value.replace('/"', '"'),
           //  ibra: ibraData.joke,
           // /* quote: {
           //      text: quoteData[0].q.trim(),
           //      author: quoteData[0].a
           //  },
            cs: {
                text: csQuotes.quotes[quoteNum].text,
            },
            // kanye: `${kanyeQuote} - Kanye West`,
            // randFact: factData,


        })

    })

module.exports = router;

