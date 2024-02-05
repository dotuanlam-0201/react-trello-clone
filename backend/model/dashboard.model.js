const mongoose = require('mongoose')

const ListCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cards: {
        type: [mongoose.Schema.Types.CardSchema],
        required: false
    }
})

const ListCard = mongoose.model('ListCard', ListCardSchema)

const CardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    labels: {
        type: String,
    },
    description: {
        type: String,
    },
    comments: [{
        name: String,
        comment: String,
        avatar: String
    }],
    cover: {
        type: String,
    },
})

module.exports = { ListCard }