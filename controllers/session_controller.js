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
    res.render(
        'session/sign-in.ejs',
        {
            currentUser: req.session.currentUser
        }
    )
})

// NEW SESSION - CREATE
sessions.post('/', (req, res) => {
    User.findOne(
        { username: req.body.username },
        (err, foundUser) => {
            if (err) {
                console.log(err)
                res.send('Oops, the db had a problem!')
            } else if (!foundUser) {
                res.send('Sorry, username not found. <a href="/">Go back</a>')
            } else {
                if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                    console.log(req.session);
                    req.session.currentUser = foundUser
                    res.redirect('/')
                } else {
                    res.send('Sorry, username and password do not match. <a href="/">Go back</a>')
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
