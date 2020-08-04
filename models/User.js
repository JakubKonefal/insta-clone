const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 30
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 30
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 30
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', userSchema);
