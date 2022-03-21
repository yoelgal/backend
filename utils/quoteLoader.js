const needle = require("needle");
const Quote = require('./models/quoteSchema')
const db = require('./mongo')
const quotes = require('./quotes.json')
const Article = require("./models/newsSchema");

async function uploadQuote(){
    const quoteNum = Math.floor(Math.random() * 87)
    const dailyQuote = new Quote({
        text: quotes.quotes[quoteNum].text
    })
    await db.collection('quote').insertOne(dailyQuote)
    console.log('Quote inserted')
}

const deleteAllData = async () => {
    try {
        await Quote.deleteMany({});
        console.log('Quote successfully deleted');
    } catch (err) {
        console.log(err);
    }
};

const quoteLoad = function (){
    deleteAllData().then(r => 'noice')
    uploadQuote().then(r => 'noice')
}

module.exports = quoteLoad