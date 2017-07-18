const express = require('express');
const router  = express.Router();
const Place = require('../models/Place');

/* GET home page. */
router.get('/', (req, res, next) => {
    Place.find()
         .exec()
         .then(places => {
           res.render('place/index', {places: places});
         })
         .catch(e => nect(e));
});

module.exports = router;
