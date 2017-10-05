const express = require('express')
const app = express()
var router = require('./router')
var helmet = require('helmet')
var csrf = require('csurf')
const PORT = 80;
var serve = require('serve-index')
var cookieParser = require('cookie-parser')
var compression = require('compression')
var expressWinston = require('express-winston');
var winston = require('winston')
var fs = require('fs');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;


//Security and Speed//
var csrfProtection = csrf({ cookie: true })
app.use(cookieParser())
app.use(compression())
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'Ro55e77i', resave: false, saveUninitialized: false }));
//       End		//


// AUTH //
passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// END AUTH //

app.use(expressWinston.logger({
      transports: [
        new winston.transports.File({
          json: true,
          colorize: true,
          filename: process.cwd() + '\\logs\\info.log',
          timestamp: true
        })
      ],
      meta: true, 
      msg: "HTTP {{req.method}} {{req.url}}",
      expressFormat: true, 
      colorize: true, 
      ignoreRoute: function (req, res) { return false; } 
}));


app.use(passport.initialize());
app.use(passport.session());
app.use('/', router)
app.use('/', express.static('www'), serve('www', {'icons': true}))


app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/' }), function(req, res) {
    res.redirect('/');
  });
  
app.use("*",function(req,res){
  res.send("404");
});

app.listen(PORT, function () {
  console.log('Listening on port '+PORT)  
  //QW5kIHRoaXMgd2lsbCBuZXZlciBzdG9wIGp1c3QgbGlrZSBtZSBmYWxsaW5nIGluIGxvdmUgd2l0aCB5b3UgZXZlcnlkYXkgb2YgbXkgbGlmZS4gIFNvZmlhIDwz
  //base64
})