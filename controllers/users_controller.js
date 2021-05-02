// BCRYPT
const bcrypt = require('bcrypt')

// EXPRESS
const express = require('express')
const users = express.Router()

// MODELS
const User = require('../models/users.js')

// ======================================
// =============== ROUTES ===============
// CREATE PT 1 - NEW
users.get('/new', (req, res) => {
    if (!req.session.currentUser) {
        res.render('users/create.ejs')
    } else {
        res.redirect('/journal/dash')
    }
})

// CREATE PT 2 - CREATE =================NEED TO CHECK ROUTE; PARSE REQ.BODY?
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

// UPDATE PT 1 - EDIT
users.get('/edit', (req, res) => {
    if (!req.session.currentUser) {
        res.render('/')
    } else {
        User.findById(req.session.currentUser._id, (err, thisUser) => {
            res.render(
                'users/user-settings.ejs',
                {
                    user: thisUser,
                    currentUser: req.session.currentUser
                }
            )
        })
    }
})

// UPDATE PT 2 - UPDATE


module.exports = users
