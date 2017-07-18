const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');
var multer  = require('multer');
var upload = multer({ dest: './public/profile-uploads/' });

/* GET home page. */
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
      if (err) {
          next();
          return err;
        } else {
        Event.find({creator_id: user._id}, (err, events) => {
          console.log(user);
          res.render('user/profile', {
            user: user,
            events: events
          });
        });
        }
    });
});

router.get('/:id/edit', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
      console.log(user);
      if (err) {
          next();
          return err;
        } else {
          res.render('user/edit', {user: user});
        }
    });
});

router.post('/:id/edit', upload.single('photo'), (req, res, next) => {
  let {username, name, password, email} = req.body;
  let picPath = `profile-uploads/${req.file.filename}`;
      let edits = {
        username,
        name,
        email,
        password,
        picPath
      };
      User.findByIdAndUpdate(req.params.id, edits, (err, user) => {
        console.log(user);
        if(err){
          next();
          return err;
        }
        res.redirect(`/user/${user._id}`);
      });
});

module.exports = router;
