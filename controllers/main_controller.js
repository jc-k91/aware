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
    Log.find({}, (err, allProducts) => {
        res.render(
            'pages/index.ejs',
            {
                products: allProducts,
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
    Log.create(req.body, (err, newProduct) => {
        res.redirect('/store/' + newProduct._id)
    })
})

// R2 - SHOW
router.get('/:productId', (req, res) => {
    Log.findById(
        req.params.productId,
        (err, thisProduct) => {
            res.render(
                'pages/show.ejs',
                {
                    product: thisProduct,
                    currentUser: req.session.currentUser
                }
            )
        }
    )
})

// U1 - EDIT
router.get('/:productId/edit', (req, res) => {
    Log.findById(
        req.params.productId,
        (err, foundProduct) => {
            res.render(
                'pages/edit.ejs',
                {
                    product: foundProduct,
                    currentUser: req.session.currentUser
                }
            )
        }
    )
})

// U2 - UPDATE
router.put('/:productId', (req, res) => {
    Log.findByIdAndUpdate(req.params.productId, req.body, (err, thisProduct) => {
        res.redirect('/store')
    })
})

// DESTROY
router.delete('/:productId', (req, res) => {
    Log.findByIdAndRemove(
        req.params.productId,
        (err, removedProduct) => {
            if (err) {
                console.log(err)
            } else {
                console.log(removedProduct + " successfully removed! ==========")
                res.redirect('/store')
            }
        }
    )
})


// ======================================
// ========== EXTENSION ROUTES ==========

// SEED
router.get('/seed', (req, res) => {
    Log.create(seed, (err, seededData) => {
        console.log(seededData)
        res.redirect('store')
    })
})

// BUY
router.put('/:productId/buy', (req, res) => {
    Log.findById(req.params.productId, (err, thisProduct) => {
        thisProduct.qty--
        thisProduct.save()
        res.redirect('/store/' + req.params.productId)
    })
})

module.exports = router
