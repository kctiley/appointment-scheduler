var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/appointment-scheduler');
var users = db.get('users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SKedule Navigator' });
});

module.exports = router;
