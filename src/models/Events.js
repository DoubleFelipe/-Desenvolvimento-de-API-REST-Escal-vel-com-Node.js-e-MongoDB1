const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  participants: [String]
});

module.exports = mongoose.model('Event', EventSchema);