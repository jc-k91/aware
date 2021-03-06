// =============DEPENDENCIES=============
// =================AND==================
// ==============VARIABLES===============

// DOTENV ---
require('dotenv').config()

// EXPRESS ---
const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 3003

// SESSION ---
const session = require('express-session')
app.use(
    session(
        {
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: false
        }
    )
)

// METHOD OVERRIDE ---
const methodOverride = require('method-override')

// CONTROLLERS ---
const mainController = require('./controllers/main_controller.js')
const usersController = require('./controllers/users_controller.js')
const sessionController = require('./controllers/session_controller.js')

// DATABASE ---
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI
const db = mongoose.connection

// MISC ---
const Log = require('./models/logs.js')
const seedPost = require('./models/seed-posts.js')

// ======================================
// ============= MIDDLEWARE =============
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use('/journal', mainController) // MUST BE LOGGED IN TO ACCESS
app.use('/users', usersController)
app.use('/session', sessionController)

// ======================================
// =========== MISC ROUTES ==============

// LANDING REDIRECT ---
app.get('/', (req, res) => {
    if (!req.session.currentUser) {
        res.render('pages/landing.ejs')
    } else {
        res.redirect('/journal/dash')
    }
})

// FORBIDDEN PAGE ---
app.get('/forbidden', (req, res) => {
    res.render('users/forbidden.ejs')
})

// SEED POSTS
app.get('/seed/:user/:month/:date/:reps', (req, res) => {
    const seedArr = []
    for (let i = 0; i < req.params.reps; i++) {
        seedArr.push(seedPost(req.params.user, i, req.params.month, req.params.date))
    }
    Log.create(
        seedArr,
        (err, seededPosts) => {
            if (err) {
                console.log(err)
            } else {
                console.log(seededPosts)
                res.redirect('/')
            }
        }
    )
})

// ======================================
// ============ CONNECTIONS =============

// EXPRESS ---
app.listen(PORT, () => {
    console.log("Unit 2 Project app is listening at port " + PORT);
})

// DATABASE ---
mongoose.connect(
    mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    () => {
        console.log("Connection with mongod established. ============================");
    }
)

// =========== ERROR/SUCCESS ============
// ============== MESSAGES ==============
db.on('error', (err) => console.log(err.message + '. Is Mongod running?'))
db.on('connected', () => console.log('Connected to MongoDB at ' + mongoURI))
db.on('disconnected', () => console.log('Disconnected from MongoDB'))
