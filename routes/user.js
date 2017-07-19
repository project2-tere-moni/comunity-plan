const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');
var multer  = require('multer');
var upload = multer({ dest: './public/profile-uploads/' });

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .exec()
        .then(user => {
          Event.find({creator_id: user._id})
               .exec()
               .then(events => {
                 res.render('user/profile', {
                   user: user,
                   events: events
                 });
               });
        })
        .catch(e => next(e));
});

router.get('/:id/edit', (req, res, next) => {
    User.findById(req.params.id)
        .exec()
        .then( user => {
          res.render('user/edit', {user: user});
        })
        .catch(e => next(e));
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

      User.findByIdAndUpdate(req.params.id, edits)
          .exec()
          .then(user => {
            res.redirect(`/user/${user._id}`);
          })
          .catch(e => next(e));
});

module.exports = router;
