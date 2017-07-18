const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  place_id: String,
  deadline: { type: Date, required: true },
  creator_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  picPath: String,
  goal          : { type: Number, required: true },
  totalPledged  : { type: Number, default: 0 }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
