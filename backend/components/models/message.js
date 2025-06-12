const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message
