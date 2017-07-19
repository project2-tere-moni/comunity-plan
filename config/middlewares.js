var Event = require('../models/Event');

module.exports = {
  checkCreator: function (req,res,next){
    Event.findById(req.params.id).exec()
    .then( ev => {
      if(req.user._id.equals(ev.creator_id)){
        next();
      } else{
         console.log("User is not the creator");
         res.redirect("/");
       }
    })
    .catch( e => next(e));
  }
};
