const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logSchema = new Schema(
    {
        username: { type: String, required: true },
        title: { type: String, required: true },
        moodScale: { type: Number, min: 0, max: 10 },
        moodWords: { type: [] },
        entry: { type: String },
        privacy: { type: Number, required: true }

    }
)

const Log = mongoose.model('Log', logSchema)

module.exports = Log
