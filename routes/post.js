const express = require('express');
const uniqid = require('uniqid');
const PostModel = require('../models/Post');
const UserModel = require('../models/User');

const router = express.Router();

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
  const alreadyLiked = likes.includes(req.user._id);

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
    res.status(200).send(req.user._id);
  } else {
    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { likes: [...likes, req.user._id] },
      {
        new: true,
        useFindAndModify: false
      }
    );
    res.status(200).send(req.user._id);
  }
});

router.post('/home/comment', async (req, res) => {
  const { firstName, lastName } = await UserModel.findById(
    req.body.comment.author
  );

  const comment = {
    ...req.body.comment,
    author: {
      id: req.body.comment.author,
      firstName,
      lastName
    },
    id: uniqid()
  };

  try {
    const updatedPost = await PostModel.findOneAndUpdate(
      {
        _id: comment.postId
      },
      {
        $addToSet: {
          comments: comment
        }
      },
      {
        new: true,
        useFindAndModify: false
      }
    );

    res.status(200).send(updatedPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
