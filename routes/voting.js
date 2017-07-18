const router = require('express').Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
let Vote = require('../models/Vote');

router.post('/', (req, res, next) => {
  let voteInfo = new Vote({
    user_id: req.body.userId,
    event_id: req.body.eventId
  });
  voteInfo.save( (err, obj) => {
    console.log(obj);
  });
  console.log('he llegado', req.body.userId, req.body.eventId);
});

module.exports = router;
