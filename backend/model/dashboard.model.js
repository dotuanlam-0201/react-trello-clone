const mongoose = require('mongoose')

const ListCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    cards: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Card'
    },
}, {
    timestamps: true
})

const ListCard = mongoose.model('ListCard', ListCardSchema)

const CardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    labels: {
        type: [String],
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
    deadLine: {
        type: String,
    }
}, {
    timestamps: true
})

const Card = mongoose.model('Card', CardSchema)

module.exports = { ListCard, Card }