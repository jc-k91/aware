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
            required: true
        },
        moodScale: {
            type: Number,
            min: 0,
            max: 6,
            required: true
        },
        moodWords: {
            type: [String]
        },
        entry: {
            type: String
        },
        privacy: { // 0 = share nothing, 1 = share only summary, 2 = share full entries. Defaults to user's setting.
            type: Number,
            required: true
        },
        monthCreated: {
            type: String,
        },
        dateCreated: {
            type: String,
        },
        yearCreated: {
            type: String,
        },
    }
)

const Log = mongoose.model('Log', logSchema)

module.exports = Log
