// BCRYPT
const bcrypt = require('bcrypt')

// EXPRESS
const express = require('express')
const sessions = express.Router()

// MODELS
const User = require('../models/users.js')

// ======================================
// =============== ROUTES ===============
// NEW SESSION - NEW
sessions.get('/sign-in', (req, res) => {
    if (!req.session.currentUser) {
        res.render('session/sign-in.ejs')
    } else {
        res.redirect('/journal/dash')
    }
})

// NEW SESSION - CREATE
sessions.post('/', (req, res) => {
    User.findOne(
        { username: req.body.username.toLowerCase() },
        (err, foundUser) => {
            if (err) {
                console.log(err)
                res.send('Oops, the db had a problem!')
            } else if (!foundUser) {
                res.render('session/invalid.ejs')
            } else {
                if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                    console.log('USER SESSION CREATED FOR ' + req.body.username + " =============================")
                    req.session.currentUser = foundUser
                    res.redirect('/journal/dash')
                } else {
                    res.render('session/invalid.ejs')
                }
            }
        }
    )
})

// DELETE SESSION
sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = sessions
