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
users.get('/new', (req, res) => {
    res.render(
        'users/new-user.ejs',
        {
            currentUser: req.session.currentUser
        }
    )
})

// NEW USER - CREATE
users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(
        req.body,
        (err, createdUser) => {
            if (err) {
                console.log(err);
            }
            console.log('user is created', createdUser)
            res.redirect('/')
        }
    )
})

module.exports = users
