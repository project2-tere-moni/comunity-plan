const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  event_id: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
});

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;
