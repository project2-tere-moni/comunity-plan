const express = require('express');
const router  = express.Router();
const User = require('../models/User');
var multer  = require('multer');
var upload = multer({ dest: './public/event-uploads/' });

/* GET home page. */
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
      console.log(user);
      if (err) {
          next();
          return err;
        } else {
          res.render('user/profile', {user: user});
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
  let {username, name, password, email, picPath} = req.body;
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
