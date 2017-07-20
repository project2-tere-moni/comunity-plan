const express = require('express');
const router = express.Router();
const passport = require("passport");
const path = require('path');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const debug = require('debug')(`community-plan:${path.basename(__filename).split('.')[0]}`);
const multer  = require('multer');
const upload = multer({ dest: './public/profile-uploads/' });
const User = require("../models/User");


router.get('/login', ensureLoggedOut(), (req, res) => {
  res.render('auth/login', {
    message: req.flash('error'),
    title: 'Login'
  });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('auth/signup', {
       message: req.flash('error'),
       title: 'Signup'
     });
});

router.post('/signup', [ensureLoggedOut(), upload.single('photo')],passport.authenticate('local-signup', {
  successRedirect : '/',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
