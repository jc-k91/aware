const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        firstName: { type: String, unique: true, required: true },
        lastName: { type: String, unique: true, required: true },
        defaultPrivacy: { type: String, required: true } // default to full privacy
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User
