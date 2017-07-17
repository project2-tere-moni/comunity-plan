const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = Schema({
  user_id: String,
  event_id: String
});

const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;
