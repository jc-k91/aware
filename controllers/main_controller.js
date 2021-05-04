// EXPRESS
const express = require('express')
const router = express.Router()

// MODELS
const Log = require('../models/logs.js')
const Quote = require('../models/quotes.js')

// DATE VARIABLES
const monthNameArr = [ null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
const kronos = (date) => {
    return new Date(date)
}


// ======================================
// =========== RESTFUL ROUTES ===========

// READ PT 1 - INDEX - RESTFUL
router.get('/dash/:year/:month', (req, res) => {
    if (!req.session.currentUser) {
        res.redirect('/forbidden')
    } else {
        const todayArr = kronos(Date.now()).toLocaleDateString('en-US').split('/')
        Log.find(
            {
                username: req.session.currentUser.username,
                monthCreated: ("" + req.params.month),
                yearCreated: ("" + req.params.year)
            },
            (err, allLogs) => {
                console.log(allLogs);
                res.render(
                    'pages/index.ejs',
                    {
                        logs: allLogs,
                        today: todayArr,
                        currentUser: req.session.currentUser,
                        thisYear: req.params.year,
                        thisMonth: req.params.month,
                        months: monthNameArr
                    }
                )
            }
        )
    }
})

// CREATE LOG PT 1 - NEW - RESTFUL
router.get('/entry/new', (req, res) => {
    if (!req.session.currentUser) {
        res.redirect('/forbidden')
    } else {
        const todayArr = kronos(Date.now()).toLocaleDateString('en-US').split('/')
        res.render(
            'pages/new-log.ejs',
            {
                date: () => { return new Date(Date.now()) },
                today: todayArr,
                currentUser: req.session.currentUser
            }
        )
    }
})

// CREATE LOG PT 2 - CREATE - RESTFUL
router.post('/entry', (req, res) => {
    req.body.moodWords = req.body.moodWords.toLowerCase().split(', ')
    Log.create(req.body, (err, createdLog) => {
        if (err) {
            console.log(err)
        } else {
            console.log(createdLog)
            res.redirect('/journal/dash')
        }
    })
})

// READ PT 2 - SHOW - RESTFUL
router.get('/entry/:logId', (req, res) => {
    if (!req.session.currentUser) {
        res.redirect('/forbidden')
    } else {
        const todayArr = kronos(Date.now()).toLocaleDateString('en-US').split('/')
        Log.findById(
            req.params.logId,
            (err, thisLog) => {
                res.render(
                    'pages/show.ejs',
                    {
                        log: thisLog,
                        months: monthNameArr,
                        today: todayArr,
                        currentUser: req.session.currentUser
                    }
                )
            }
        )
    }
})

// UPDATE PT 1 - EDIT - RESTFUL
router.get('/entry/:logId/edit', (req, res) => {
    if (!req.session.currentUser) {
        res.redirect('/forbidden')
    } else {
        const todayArr = kronos(Date.now()).toLocaleDateString('en-US').split('/')
        Log.findById(
            req.params.logId,
            (err, thisLog) => {
                res.render(
                    'pages/edit-log.ejs',
                    {
                        log: thisLog,
                        today: todayArr,
                        currentUser: req.session.currentUser
                    }
                )
            }
        )
    }
})

// UPDATE PT 2 - UPDATE - RESTFUL =================NEED TO CHECK ROUTE; PARSE REQ.BODY?
router.put('/entry/:logId', (req, res) => {
    req.body.moodWords = req.body.moodWords.toLowerCase().split(', ')
    Log.findByIdAndUpdate(
        req.params.logId,
        req.body,
        (err, thisLog) => {
            res.redirect('/journal/entry/' + req.params.logId)
        }
    )
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
        const todayArr = kronos(Date.now()).toLocaleDateString('en-US').split('/')
        const thisMonth = todayArr[0]
        const thisDate = todayArr[1]
        const thisYear = todayArr[2]
        Log.find(
            {
                username: req.session.currentUser.username,
                monthCreated: thisMonth,
                yearCreated: thisYear,
                dateCreated: thisDate
            },
            (err, allLogs) => {
            Quote.find({}, (error, allQuotes) => {
                res.render(
                    'pages/dashboard.ejs',
                    {
                        // RANDOM INSPIRATIONAL QUOTE
                        quote: allQuotes[ Math.floor( Math.random() * allQuotes.length ) ],
                        // THE CURRENT USER SESSION OBJECT
                        currentUser: req.session.currentUser,
                        // ARRAY OF ALL LOGS
                        logs: allLogs,
                        // CURRENT DATE INFO
                        today: todayArr,
                        thisMonth: thisMonth,
                        thisDate: thisDate,
                        thisYear: thisYear,
                        // ARRAY OF MONTH NAMES
                        months: monthNameArr
                    }
                )
            })
        })
    }
})

module.exports = router
