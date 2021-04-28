// EXPRESS
const express = require('express')
const router = express.Router()

// MODELS
const Log = require('../models/logs.js')
// const seed = require('../models/seed.js')

// ======================================
// =========== RESTFUL ROUTES ===========

// R1 - INDEX
router.get('/', (req, res) => {
    Log.find({}, (err, allLogs) => {
        res.render(
            'pages/home.ejs',
            {
                products: allLogs,
                currentUser: req.session.currentUser
            }
        )
    })
})

// C1 - NEW
router.get('/new', (req, res) => {
    res.render(
        'pages/new.ejs',
        {
            currentUser: req.session.currentUser
        }
    )
})

//C2 - CREATE
router.post('/', (req, res) => {
    Log.create(req.body, (err, newLog) => {
        res.redirect('/journal/' + newLog._id)
    })
})

// R2 - SHOW
router.get('/:logId', (req, res) => {
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

// U1 - EDIT
router.get('/:logId/edit', (req, res) => {
    Log.findById(
        req.params.logId,
        (err, thisLog) => {
            res.render(
                'pages/edit.ejs',
                {
                    log: thisLog,
                    currentUser: req.session.currentUser
                }
            )
        }
    )
})

// U2 - UPDATE =================NEED TO CHECK ROUTE; PARSE REQ.BODY?
router.put('/:logId', (req, res) => {
    Log.findByIdAndUpdate(req.params.logId, req.body, (err, thisLog) => {
        res.redirect('/journal/' + req.params.logId)
    })
})

// DESTROY
router.delete('/:logId', (req, res) => {
    Log.findByIdAndRemove(
        req.params.logId,
        (err, removedLog) => {
            if (err) {
                console.log(err)
            } else {
                console.log(removedLog + " successfully removed! ==========")
                res.redirect('/store')
            }
        }
    )
})


// ======================================
// ========== EXTENSION ROUTES ==========

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

module.exports = router
