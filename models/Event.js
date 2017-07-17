const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = Schema({
  name: String,
  description: String,
  place_id: String,
  date: Date,
  creator_id,
  picPath: String
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
