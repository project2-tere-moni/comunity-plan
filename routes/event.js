const express = require('express');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: './public/event-uploads/' });
const path = require('path');
const moment = require('moment');
const debug = require('debug')('comunity-plan:'+path.basename(__filename));
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
      title: 'Event Details',
      events: e
    });
  });
});

// CRUD => U: Update a product
router.get('/edit/:id', (req, res, next) => {
  Event.findById(req.params.id, (err, e) => {
    if(err){
      console.log(err);
    }
    res.render('event/edit', {
      title: 'Edit event',
      events: e
    });
  });
});

router.post('/edit/:id', [ensureLoggedIn('/login'),upload.single('photo')], (req, res, next) => {
  let updates = {
    name: req.body.name,
    description: req.body.description,
    place_id: req.body.place_id,
    deadline: req.body.deadline,
    creator_id: req.user._id,
    goal: req.body.goal,
  };
  if (req.file) updates.picPath = `event-uploads/${req.file.filename}`;
  Event.findByIdAndUpdate(req.params.id, updates, (err, e) => {
    if(err) console.log(err);
    res.redirect(`/event/show/${e._id}`);
  });
});

// CRUD => D: Delete a product
router.get('/:id/delete', ensureLoggedIn('/login'), (req, res, next) =>{
  let id = req.params.id;
  Event.findByIdAndRemove(id, (err, obj) => {
    if (err){ return next(err); }
    res.redirect("/");
  });
});

router.get('/new', ensureLoggedIn('/login'), (req, res, next) => {
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
    deadline: req.body.deadline,
    creator_id: req.user._id,
    picPath: `event-uploads/${req.file.filename}`,
    goal: req.body.goal,
  });
  e.save((err, obj) => {
    res.redirect(`/event/show/${e._id}`);
  });
});

module.exports = router;
