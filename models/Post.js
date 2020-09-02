const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
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
  },
  likes: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('Post', postSchema);
