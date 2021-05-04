const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        defaultPrivacy: { // Global privacy setting: 0 = share nothing, 1 = share only summary, 2 = share full entries. Defaults to 0.
            type: Number,
            required: true,
            default: 0
        }
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User
