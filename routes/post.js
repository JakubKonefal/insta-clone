const express = require('express');

const router = express.Router();
const PostModel = require('../models/Post');

router.post('/post', async (req, res) => {
  if (req.body.verifyToken) {
    return res.status(200).send(req.user);
  }
  const newPost = new PostModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.send(savedPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/home/like', async (req, res) => {
  const { postId } = req.body;

  const { likes } = await PostModel.findById(postId);

  console.log(likes);
  console.log(postId, req.user._id);
  const alreadyLiked = likes.includes(req.user._id);
  console.log(alreadyLiked, 'ALREADY LIKED');

  if (alreadyLiked) {
    const updatedLikes = likes.filter(id => id !== req.user._id);
    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { likes: updatedLikes },
      {
        new: true,
        useFindAndModify: false
      }
    );
    res.status(200).send(post.likes);
  } else {
    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { likes: [...likes, req.user._id] },
      {
        new: true,
        useFindAndModify: false
      }
    );
    res.status(200).send(post.likes);
  }
});

module.exports = router;
