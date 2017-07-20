const express = require('express');
const router = express.Router();
var Event = require('../models/Event');
var Place = require('../models/Place');

router.get('/', (req, res, next) => {
  Event.find()
        .exec()
        .then(events => {
          Place.find()
            .exec()
            .then(places => {
              res.render('index', {
                title: "index",
                events: events,
                places: places
              });
            });
        })
        .catch(e => next(e));
});

module.exports = router;
