const express = require('express');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: './public/event-uploads/' });
const path = require('path');
const debug = require('debug')('tumblr-lab:'+path.basename(__filename));
var Event = require('../models/Event');

// CRUD => R: Retrieve All
router.get('/', (req, res, next) => {
  Event.find({}, (err, e) => {
    res.render('event/index', {
      title: 'All Events',
      events: e
    });
  });
});

// CRUD => R: Retrieve - Product detail
router.get('/show/:id', (req, res, next) => {
  Event.findById(req.params.id, (err, e) => {
    if(err){
      console.log(err);
    }
    res.render('event/show', {
      title: 'Chosen event',
      event: e
    });
  });
});

// CRUD => U: Update a product
router.post('/edit/:id', ensureLoggedIn('/login'), (req, res, next) => {
  let {name, description, place_id, date, creator_id, picPath} = req.body;
  let updates = {
    name,
    description,
    place_id,
    date,
    creator_id,
    picPath
  };
  Event.findByIdAndUpdate(req.params.id, updates, (err, e) => {
    if(err){
      console.log(err);
    }
    res.redirect(`/show/${e._id}`);
  });
});

// CRUD => D: Delete a product
router.get('/:id/delete', (req, res, next) =>{
  let id = req.params.id;
  Event.findByIdAndRemove(id, (err, obj) => {
    if (err){ return next(err); }
    res.redirect("/");
  });
});

router.get('/new', (req, res, next) => {
  Event.find({}, (err, e) => {
    res.render('event/new', {
      title: 'New Event',
      events: e
    });
  });
});

// CRUD => C: Create
router.post('/new', [ensureLoggedIn('/login'), upload.single('photo')], (req, res, next) => {
  let e = new Event({
    name: req.body.name,
    description: req.body.description,
    place_id: req.body.place_id,
    date: req.body.date,
    // creator_id: req.user.id,
    picPath: req.file.path
  });
  e.save((err, obj) => {
    res.redirect('/');
  });
});

module.exports = router;
