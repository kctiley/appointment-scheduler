var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/appointment-scheduler');
var users = db.get('users')

// var router = require('../app.js')

router.get('/', function(req, res, next) {
  res.send('see calenders.js');
});


router.get('/new', function(req, res, next) {
  res.send('see calenders.js and create new jade');
});

module.exports = router;
