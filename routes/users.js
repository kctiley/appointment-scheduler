var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/appointment-scheduler');
var users = db.get('users')
var bcrypt = require('bcrypt');
var session = require('cookie-session')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('see users.js');
});

router.get('/sign_up', function(req, res, next) {
  res.render('sign_up', {title: 'Sign Up'});
});

router.post('/sign_up', function(req, res, next) {
  var errors = [];
  if (!req.body.email){
    errors.push("No email entered")
  }
  if (!req.body.password){
    errors.push("No password entered")
  }
  if (!req.body.passConfirm){
    errors.push("No password confirmation entered")
  }
  if (errors.length){
    res.render('sign_up', {errors: errors}) 
  }
  else{
    users.find({email: req.body.email}, function(err, record){
      if (record.length){
        errors.push('Useremail not available');
      }
      if (errors.length){
        res.render('sign_up', { errors: errors})
      }
      else{
        req.session.email = req.body.email;
        var passwordHash = bcrypt.hashSync(req.body.password, 8)
 
        users.insert({email: req.body.email, passwordHash: passwordHash}, function(err, record){
          req.session.user = record;
          res.render('users_homepage', {user: req.session.user})
        })
      };
    })
  }
});

router.get('/sign_in', function(req, res, next) {
  res.render('sign_in', {title: 'Sign In'});
});

router.post('/sign_in', function(req, res, next){
  var errors = [];
  if (!req.body.email){
    errors.push("No email entered")
  }
  if (!req.body.password){
    errors.push("No password entered")
  }
  if (errors.length){
    res.render('sign_in', {errors: errors}) 
  }
  else{
    users.findOne({email: req.body.email}, function(err, record){ 
      if(!record){
         errors.push('Cannot find user email')
        res.render('sign_in', {errors: errors}) 
      }
      var password = req.body.password;
      if(bcrypt.compareSync(password, record.passwordHash)){
        req.session.user = record;
        res.render('users_homepage', {user: req.session.user})
      }
      else{
        errors.push('Password incorrect')
        res.render('sign_in', {errors: errors})              
      }
    })
  }
})  



module.exports = router;
