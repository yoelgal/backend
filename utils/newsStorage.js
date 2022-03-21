const needle = require("needle");
const { MongoClient } = require('mongodb');

async function insertArticle(client, newArticle){
    const result = await client.db("news").collection("headlines").insertOne(newArticle)
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    const uri = 'mongodb+srv://user1:1qazxcvbnmko0@cluster0.wf9u7.mongodb.net/news?retryWrites=true&w=majority'


    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        const newsRes = await needle(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=4db889f4ad6242d5832b52a3c5a53f15`)
        const newsBody = newsRes.body
        if (newsRes.statusCode !== 200) throw new Error(`Current: ${newsBody.message} (${newsBody.status})`);
        newsBody.forEach(e=>{
            insertArticle(client, {
                title: e.title,
                source: e.source.name
            })
        })

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

function storeNews(){
    main().then(r => console.log('Noice'))
}

module.exports = storeNews()