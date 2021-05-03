const mongoose = require('mongoose')
const Schema = mongoose.Schema

const quoteSchema = Schema(
    {
        q: { type: String, unique: true },
        a: String
    }
)

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote
