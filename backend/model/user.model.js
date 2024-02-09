const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    imgURL: {
        type: String,
    },
    userId: {
        type: String,
    }
}, {
    timestamps: true,
})

const User = mongoose.model('User', UserSchema)

module.exports = { User }
