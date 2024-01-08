const crypto = require('crypto');
require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');
const passport = require('passport');

// Generate a random secure secret key
const generateSecretKey = () => {
    return crypto.randomBytes(64).toString('hex');
};

// Use the generated secret key in your session configuration
const sessionSecret = process.env.COOKIE_SECRET || generateSecretKey();

// Session config
app.use(session({
    secret: sessionSecret,
    resave: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://harshitasoni701:harshitasoni123@cluster0.oyvxbnj.mongodb.net/yourdatabase?retryWrites=true&w=majority',
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }  // 24 hours
}));

// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

// Database Connection
mongoose.connect("mongodb+srv://harshitasoni701:harshitasoni123@cluster0.oyvxbnj.mongodb.net/yourdatabase?retryWrites=true&w=majority");

mongoose.connection.once('open', function () {
    console.log('Database Connected...');
}).on('error', function (error) {
    console.log('Connection error:', error);
});

// Flash middleware should be configured after session middleware
app.use(flash());

// Assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// Set Template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, 'resources', 'views'));
app.set('view engine', 'ejs');

require('./routes/web')(app);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});



