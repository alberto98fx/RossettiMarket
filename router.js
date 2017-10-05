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

router.get('/login',function(req,res){
	res.send("login page");
})

router.get('/logout',function(req, res){
    req.logout();
    res.redirect('/');
})

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(), function(req, res){
    res.send({ user: req.user });
})
module.exports = router