const router = require('express').Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
let Vote = require('../models/Vote');
let Event = require('../models/Event');

router.post('/', ensureLoggedIn('/login'), (req, res, next) => {
  Vote.findOne({event_id : req.body.eventId, user_id : req.body.userId })
  .exec()
  .then(vote => {
    console.log(vote);
    if(vote) {

    } else {
      let voteInfo = new Vote({
        user_id: req.body.userId,
        event_id: req.body.eventId
      });
      voteInfo.save( (err, obj) => {
        console.log("vote saved");
      });
      let update = {
        totalPledged: req.totalPledged
      };
      Event.update({_id: req.body.eventId}, {$inc: {totalPledged: 1}}, (err, event) => {
        res.redirect(`/event/show/${req.body.eventId}`);
      });
    }
  })
  .catch(e => next(e));
});

module.exports = router;
