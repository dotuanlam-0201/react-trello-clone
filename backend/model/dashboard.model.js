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

const BoardSchema = new mongoose.Schema({
    listId: {
        type: String,
        required: true
    },
    listCard: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'ListCard'
    },
    members: {
        type: [String]
    }
})

const Card = mongoose.model('Card', CardSchema)
const Board = mongoose.model('Board', BoardSchema)
module.exports = { ListCard, Card, Board }