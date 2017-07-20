const express = require('express');
const {ensureLoggedIn,ensureLoggedOut} = require('connect-ensure-login');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: './public/event-uploads/'});
const {checkCreator} = require('../config/middlewares');
const path = require('path');
const moment = require('moment');
const debug = require('debug')('comunity-plan:' + path.basename(__filename));
let Event = require('../models/Event');
let Vote = require('../models/Vote');


router.get('/', (req, res, next) => {
  Event.find()
        .exec()
        .then(events => {
          res.render('event/index', {
            title: 'Events',
            events: events
          });
        })
        .catch(e => next(e));
});

router.get('/show/:id', ensureLoggedIn('/login'), (req, res, next) => {
  let voted;
  Vote.findOne({event_id : req.params.id, user_id : req.user._id })
      .exec()
      .then(vote => {
        voted = vote ? true : false;
        Event.findById(req.params.id)
              .exec()
              .then(events => {
                Vote.find({
                    event_id: events._id
                  })
                    .populate('user_id')
                    .exec()
                    .then(voting => {
                      Event.find()
                            .exec()
                            .then(allEvents => {
                              res.render('event/show', {
                                title: 'Event Details',
                                events: events,
                                allEvents: allEvents,
                                voting: voting,
                                voted: voted
                              });
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
        title: 'Edit Event',
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
    goal: 50
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
          Vote.remove({event_id: events._id})
              .exec()
              .then(vote =>{
                res.redirect("/");
              });
        })
        .catch(e => next(e));
});

router.get('/new', ensureLoggedIn('/login'), (req, res, next) => {
  Event.find()
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
    goal: 50,
  });
  newEvent.save()
          .then(() => {
            res.redirect(`/event/show/${newEvent._id}`);
          })
          .catch(e => next(e));
});

module.exports = router;
