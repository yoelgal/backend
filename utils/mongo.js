const mongoPass = 'rSlOGZYMuF1GdNmu';

const {MongoClient} = require('mongodb');
const uri = `mongodb+srv://yoelGal:${mongoPass}@vueexpress.fjuo4.mongodb.net/vueExpress?retryWrites=true&w=majority`;
// const uri = `mongodb://localhost:27017`;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = client.db('vueExpress');
let connection;

const connect = async () => {
    if (connection) return connection;
    connection = await client.connect();
    return connection;
}

module.exports = {connect, mongoDb: db}


