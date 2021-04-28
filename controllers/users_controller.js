// BCRYPT
const bcrypt = require('bcrypt')

// EXPRESS
const express = require('express')
const users = express.Router()

// MODELS
const User = require('../models/users.js')

// ======================================
// =============== ROUTES ===============
// NEW USER - NEW
users.get('/create', (req, res) => {
    res.render('users/register.ejs')
})

// NEW USER - CREATE =================NEED TO CHECK ROUTE; PARSE REQ.BODY?
users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(
        req.body,
        (err, createdUser) => {
            if (err) {
                console.log(err);
            }
            console.log('New user created', createdUser)
            res.redirect('/')
        }
    )
})

module.exports = users
