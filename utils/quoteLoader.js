const Quote = require('./models/quoteSchema')
const db = require('./mongo')
const quotes = require('./quotes.json')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function delay(){
    await sleep(2000)
}

async function uploadQuote(){
    const quoteNum = Math.floor(Math.random() * 83)
    const dailyQuote = new Quote({
        text: quotes.quotes[quoteNum].text
    })
    // console.log(dailyQuote)
    await db.collection('quotes').insertOne(dailyQuote)
    console.log('Quote inserted')
}

const deleteAllData = async () => {
    try {
        await Quote.deleteMany({});
        console.log('Quotes successfully deleted');
    } catch (err) {
        console.log(err);
    }
};

const quoteLoad = function (){
    deleteAllData().then(r => 'noice')
    delay().then(r => uploadQuote())
    // uploadQuote().then(r => 'noice')
}

module.exports = quoteLoad