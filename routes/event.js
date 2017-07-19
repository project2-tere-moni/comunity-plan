const express = require('express');
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');
const router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: './public/event-uploads/'
});
const {checkCreator} = require('../config/middlewares');
const path = require('path');
const moment = require('moment');
const debug = require('debug')('comunity-plan:' + path.basename(__filename));
let Event = require('../models/Event');
let Vote = require('../models/Vote');


router.get('/', (req, res, next) => {
  Event.find({})
    .exec()
    .then(events => {
      res.render('event/index', {
        title: 'All Events',
        events: events
      });
    })
    .catch(e => next(e));
});

router.get('/show/:id', (req, res, next) => {
  let voted;
  Vote.findOne({event_id : req.params.id, user_id : req.user._id })
  .exec()
  .then(vote => {
    console.log(vote);
    if(vote) {
      voted = true;
    } else {
      voted = false;
    }
  Event.findById(req.params.id)
    .exec()
    .then(events => {
      Vote.find({
          event_id: events._id
        })
        .populate('user_id')
        .exec(function(err, voting) {
          if (err) return handleError(err);
          res.render('event/show', {
            title: 'Event Details',
            events: events,
            voting: voting,
            voted: voted
          });
        });
    })
    .catch(e => next(e));
  });
});

router.get('/edit/:id',[ensureLoggedIn('/login'), checkCreator], (req, res, next) => {
  Event.findById(req.params.id)
    .exec()
    .then(events => {
      res.render('event/edit', {
        title: 'Edit event',
        events: events
      });
    })
    .catch(e => next(e));
});

router.post('/edit/:id', [ensureLoggedIn('/login'), upload.single('photo')], (req, res, next) => {
  let updates = {
    name: req.body.name,
    description: req.body.description,
    place_id: req.body.place_id,
    deadline: req.body.deadline,
    creator_id: req.user._id,
    goal: req.body.goal
  };

  if (req.file) updates.picPath = `/event-uploads/${req.file.filename}`;

  Event.findByIdAndUpdate(req.params.id, updates)
    .exec()
    .then(events => {
      res.redirect(`/event/show/${events._id}`);
    })
    .catch(e => next(e));
});

router.get('/delete/:id', [ensureLoggedIn('/login'), checkCreator], (req, res, next) => {
  Event.findByIdAndRemove(req.params.id)
    .exec()
    .then(events => {
      res.redirect("/");
    })
    .catch(e => next(e));
});

router.get('/new', ensureLoggedIn('/login'), (req, res, next) => {
  Event.find({})
    .exec()
    .then(events => {
      res.render('event/new', {
        title: 'New Event',
        events: events
      });
    })
    .catch(e => next(e));
});

router.post('/new', [ensureLoggedIn('/login'), upload.single('photo')], (req, res, next) => {
  let newEvent = new Event({
    name: req.body.name,
    description: req.body.description,
    place_id: req.body.place_id,
    deadline: req.body.deadline,
    creator_id: req.user._id,
    picPath: (req.file) ? `/event-uploads/${req.file.filename}` : '/images/default.png',
    goal: req.body.goal,
  });
  newEvent.save()
    .then(() => {
      res.redirect(`/event/show/${newEvent._id}`);
    })
    .catch(e => next(e));
});

module.exports = router;
