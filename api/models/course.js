var mongoose = require('mongoose');

var Course = mongoose.model('Course', {
  id: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  tutor: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    default: null
  },
  available: {
    type: Boolean,
    default: false
  },
});

module.exports = { Course };
