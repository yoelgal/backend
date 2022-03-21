const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://user1:1qazxcvbnmko0@cluster0.wf9u7.mongodb.net/dashboard-data?retryWrites=true&w=majority", { useNewUrlParser: true })
const db = mongoose.connection



module.exports = db


