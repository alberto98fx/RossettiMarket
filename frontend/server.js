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


//Security and Speed//
app.use(helmet())
var csrfProtection = csrf({ cookie: true })
app.use(cookieParser())
app.use(compression())
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'Ro55e77i', resave: false, saveUninitialized: false }));
//       End		//


app.use(expressWinston.logger({
      transports: [
        new winston.transports.File({
          json: true,
          colorize: true,
          filename: process.cwd() + '\\frontend\\logs\\info.log',
          timestamp: true
        })
      ],
      meta: true, 
      msg: "HTTP {{req.method}} {{req.url}}",
      expressFormat: true, 
      colorize: true, 
      ignoreRoute: function (req, res) { return false; } 
}));

app.use('/', router)
app.use('/', express.static('./frontend/www'), serve('./frontend/www', {'icons': true}))

  
app.use("*",function(req,res){
  res.send("404");
});

app.listen(PORT, function () {
  console.log('Frontend listening on port : '+PORT)  
  //QW5kIHRoaXMgd2lsbCBuZXZlciBzdG9wIGp1c3QgbGlrZSBtZSBmYWxsaW5nIGluIGxvdmUgd2l0aCB5b3UgZXZlcnlkYXkgb2YgbXkgbGlmZS4gIFNvZmlhIDwz
  //base64
})