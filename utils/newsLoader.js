const needle = require("needle");
const Article = require('./models/newsSchema')
const db = require('./mongo')

async function uploadNews() {
    const newsRes = await needle(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=4db889f4ad6242d5832b52a3c5a53f15`)
    const newsBody = newsRes.body
    if (newsRes.statusCode !== 200) throw new Error(`Current: ${newsBody.message} (${newsBody.status})`);
    const newsData = newsBody.articles.map(e => ({
            title: e.title, source: e.source.name
        })
    )
    newsData.forEach(e=>{
        const article = new Article({
            title: e.title,
            source: e.source
        })
        db.collection('headlines').insertOne(article)
        console.log('Article inserted')
    })


}

const deleteAllData = async () => {
    try {
        await Article.deleteMany({});
        console.log('All Data successfully deleted');
    } catch (err) {
        console.log(err);
    }
};

const newsLoad = function (){
    deleteAllData().then(r => 'noice')
    uploadNews().then(r => 'noice')
}

module.exports = newsLoad


