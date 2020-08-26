const express = require('express');

const router = express.Router();
const PostModel = require('../models/Post');

router.post('/post', async (req, res) => {
  if (req.body.verifyToken) {
    return res.status(200).send(req.user);
  }

  const { _id, description, image } = req.body;
  const newPost = new PostModel({
    _id,
    author: req.user._id,
    description,
    image
  });

  try {
    const savedPost = await newPost.save();
    res.send(savedPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
