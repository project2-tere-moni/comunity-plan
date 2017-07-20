const router = require('express').Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
let Vote = require('../models/Vote');
let Event = require('../models/Event');

router.post('/', ensureLoggedIn('/login'), (req, res, next) => {
  Vote.findOne({event_id : req.body.eventId, user_id : req.body.userId })
      .exec()
      .then(vote => {
          let voteInfo = new Vote({
            user_id: req.body.userId,
            event_id: req.body.eventId
          });
          let update = {
            totalPledged: req.totalPledged
          };
          voteInfo.save( (err, obj) => {
            Event.update({_id: req.body.eventId}, {$inc: {totalPledged: 1}}, (err, event) => {
              res.redirect(`/event/show/${req.body.eventId}`);
            });
          });
      })
      .catch(e => next(e));
});

module.exports = router;
