const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tutor', tutorSchema);