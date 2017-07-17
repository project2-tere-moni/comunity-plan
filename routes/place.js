const express = require('express');
const router  = express.Router();
const Place = require('../models/Place');

/* GET home page. */
router.get('/', (req, res, next) => {
  Place.find({}, (err, places) => {
      console.log(places);
      if (err) {
          next();
          return err;
        } else {
          res.render('place/index', {places: places});
        }
    });
});

module.exports = router;
