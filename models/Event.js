const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const EventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  place_id: String,
  deadline: { type: Date, required: true },
  creator_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  picPath: String,
  goal          : Number,
  totalPledged  : { type: Number, default: 0 }
});

EventSchema.virtual('timeRemaining').get(function () {
  let remaining = moment(this.deadline).fromNow(true).split(' ');
  let [days, unit] = remaining;
  return { days, unit };
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
