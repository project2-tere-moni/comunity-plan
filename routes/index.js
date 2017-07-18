const express = require('express');
const router  = express.Router();
var Event = require('../models/Event');
var Place = require('../models/Place');

router.get('/', (req, res, next) => {
  Event.find({}, (err, events) => {
    Place.find({}, (err, places) => {
      res.render('index', {
        title: "index",
        user: req.user,
        events: events,
        places: places
      });
    });
    });
});

module.exports = router;
