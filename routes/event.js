var express = require('express');
var Event = require('../models/Event');
var router = express.Router();

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
  //console.log(req.params);
  //console.log(req.query);
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
router.post('/edit/:id', function(req, res, next) {
  let {name, price, description, priceUrl} = req.body;
  let updates = {
    name,
    price,
    description,
    priceUrl
  };
  console.log(updates);
  Product.findByIdAndUpdate(req.params.id, updates, (err, p) => {
    if(err){
      console.log(err);
    }
    res.redirect(`/product/${p._id}`);
  });
});

// CRUD => D: Delete a product
router.get('/:id/delete', function(req, res, next) {
  let id = req.params.id;
  Product.findByIdAndRemove(id, (err, obj) => {
    if (err){ return next(err); }
    res.redirect("/product");
  });
});


// CRUD => C: Create
router.post('/', function(req, res, next) {
  console.log(req.body);
  let p = new Product({
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  });
  p.save((err, obj) => {
    res.redirect('/product');
  });
});


module.exports = router;
