const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema(
    {
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        firstName: { type: String, unique: true, required: true },
        lastName: { type: String, unique: true, required: true },
        friends: { type: [String] },
        defaultFriendsPrivacy: { type: String, required: true }, // Friends share setting: 0 = share nothing, 1 = share only summary, 2 = share full entries. Defaults to 0.
        defaultGlobalPrivacy: { type: Number, required: true } // Global privacy setting: 0 = share nothing, 1 = share only summary, 2 = share full entries. Defaults to 0.
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User
