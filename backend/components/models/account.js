const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

const Account = mongoose.model("Account", AccountSchema)

module.exports = Account
