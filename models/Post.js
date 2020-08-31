const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

const postSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  author: authorSchema,
  description: {
    type: String,
    maxlength: 250,
    minlength: 1,
    required: true
  },
  image: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
