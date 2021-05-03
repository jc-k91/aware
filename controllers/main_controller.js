// EXPRESS
const express = require('express')
const router = express.Router()

// MODELS
const Log = require('../models/logs.js')
const Quote = require('../models/quotes.js')
// const seed = require('../models/seed.js')

// VARIABLES AND FUNCTIONS
const kronos = () => {
    return new Date(Date.now())
}
const months = [ null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

// ======================================
// =========== RESTFUL ROUTES ===========

// READ PT 1 - INDEX - RESTFUL
router.get('/dash/index', (req, res) => {
    if (!req.session.currentUser) {
        res.redirect('/forbidden')
    } else {
        Log.find({}, (err, allLogs) => {
            res.render(
                'pages/index.ejs',
                {
                    logs: allLogs,
                    currentUser: req.session.currentUser
                }
            )
        })
    }
})

// CREATE LOG PT 1 - NEW - RESTFUL
router.get('/entry/new', (req, res) => {
    if (!req.session.currentUser) {
        res.redirect('/forbidden')
    } else {
        res.render(
            'pages/new-log.ejs',
            {
                currentUser: req.session.currentUser
            }
        )
    }
})

// CREATE LOG PT 2 - CREATE - RESTFUL
router.post('/entry', (req, res) => {
    req.body.moodWords = req.body.moodWords.split(', ')
    Log.create(req.body, (err, newLog) => {
        res.redirect('/journal/' + newLog._id)
    })
})

// READ PT 2 - SHOW - RESTFUL
router.get('/entry/:logId', (req, res) => {
    if (!req.session.currentUser) {
        res.redirect('/forbidden')
    } else {
        Log.findById(
            req.params.logId,
            (err, thisLog) => {
                res.render(
                    'pages/show.ejs',
                    {
                        log: thisLog,
                        currentUser: req.session.currentUser
                    }
                )
            }
        )
    }
})

// UPDATE PT 1 - EDIT - RESTFUL
router.get('/entry/:logId/edit', (req, res) => {
    Log.findById(
        req.params.logId,
        (err, thisLog) => {
            res.render(
                'pages/edit-log.ejs',
                {
                    log: thisLog,
                    currentUser: req.session.currentUser
                }
            )
        }
    )
})

// UPDATE PT 2 - UPDATE - RESTFUL =================NEED TO CHECK ROUTE; PARSE REQ.BODY?
router.put('/entry/:logId', (req, res) => {
    req.body.moodWords = req.body.moodWords.split(', ')
    Log.findByIdAndUpdate(req.params.logId, req.body, (err, thisLog) => {
        res.redirect('/journal/' + req.params.logId)
    })
})

// DESTROY - RESTFUL
router.delete('/entry/:logId', (req, res) => {
    console.log(req.params.logId)
    Log.findByIdAndRemove(
        req.params.logId,
        (err, removedLog) => {
            if (err) {
                console.log(err)
            } else {
                console.log(removedLog + " successfully removed! ==========")
                res.redirect('/journal/dash')
            }
        }
    )
})

// ======================================
// ============ OTHER ROUTES ============

// HOME DASH
router.get('/dash', (req, res) => {
    if (!req.session.currentUser) {
        res.redirect('/forbidden')
    } else {
        Log.find({}, (err, allLogs) => {
            Quote.find({}, (error, allQuotes) => {
                res.render(
                    'pages/dashboard.ejs',
                    {
                        logs: allLogs,
                        date: kronos().toLocaleDateString("en-US").split('/'),
                        months: months,
                        quote: allQuotes[ Math.floor( Math.random() * allQuotes.length ) ],
                        currentUser: req.session.currentUser
                    }
                )
            })
        })
    }
})

module.exports = router
