const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        title: {
            type: String,
            unique: true,
            required: true
        },
        moodScale: {
            type: Number,
            min: 0,
            max: 6
        },
        moodWords: {
            type: [String],
            required: true
        },
        entry: {
            type: String
        },
        privacy: { // 0 = share nothing, 1 = share only summary, 2 = share full entries. Defaults to user's setting.
            type: Number,
            required: true
        },
        createdTime: {
            type: Number
        },
        lastEditTime: {
            type: Number,
            default: 0
        }
    }
)

const Log = mongoose.model('Log', logSchema)

module.exports = Log
