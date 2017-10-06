const express = require('express')
var router = express.Router()

router.use(function timeLog (req, res, next) {
  next()
})

router.get('/API', function (req, res) {
  res.send('API')
})

router.get('/connection', function (req, res) {
  res.send('connection')
})

router.get('/db',function(req,res){
	res.send('[ Database not connected ]')
})

router.get('/admin',function(req,res){
	res.send("Admin page is not available")
})

module.exports = router