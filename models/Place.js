const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = Schema({
  place_id: String,
  description: String,
  location: { type: { type: String }, coordinates: [Number] },
  picPath: String
});

const Place = mongoose.model('Place', PlaceSchema);

PlaceSchema.index({ location: '2dsphere' });
module.exports = Place;
