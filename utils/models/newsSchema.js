const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('headlines', newsSchema)