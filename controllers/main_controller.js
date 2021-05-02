// EXPRESS
const express = require('express')
const router = express.Router()

// MODELS
const Log = require('../models/logs.js')
// const seed = require('../models/seed.js')

// VARIABLES AND FUNCTIONS
const kronos = () => {
    return new Date(Date.now())
}

// ======================================
// =============== ROUTES ===============

// READ PT 1 - INDEX - RESTFUL
router.get('/index', (req, res) => {
    Log.find({}, (err, allLogs) => {
        res.render(
            'pages/index.ejs',
            {
                logs: allLogs,
                currentUser: req.session.currentUser
            }
        )
    })
})

// CREATE LOG PT 1 - NEW - RESTFUL
router.get('/entry/new', (req, res) => {
    res.render(
        'pages/new-log.ejs',
        {
            currentUser: req.session.currentUser
        }
    )
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

// HOME DASH
router.get('/dash', (req, res) => {
    Log.find({}, (err, allLogs) => {
        res.render(
            'pages/dashboard.ejs',
            {
                logs: allLogs,
                date: kronos().toLocaleDateString("en-US").split('/'),
                currentUser: req.session.currentUser
            }
        )
    })
})

module.exports = router

// // SEED
// router.get('/seed', (req, res) => {
//     Log.create(seed, (err, seededData) => {
//         console.log(seededData)
//         res.redirect('store')
//     })
// })

// // BUY
// router.put('/:productId/buy', (req, res) => {
//     Log.findById(req.params.productId, (err, thisProduct) => {
//         thisProduct.qty--
//         thisProduct.save()
//         res.redirect('/store/' + req.params.productId)
//     })
// })
