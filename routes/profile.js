const express = require('express');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const PostModel = require('../models/Post');

const router = express.Router();

router.get('/profile/photo', async (req, res) => {
  const token = req.header('token');
  const { _id } = jwt.decode(token);

  try {
    const { photo } = await UserModel.findById(_id);
    res.status(200).send(photo);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/profile', async (req, res) => {
  const id = req.header('id');
  try {
    const userInfo = await UserModel.findById(id);
    const isFollowed = userInfo.followers.includes(req.user._id);

    const userPosts = await PostModel.find({
      author: userInfo._id
    });

    res.status(200).send({ user: userInfo, userPosts, isFollowed });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/profile/photo', async (req, res) => {
  if (req.body.verifyToken) {
    return res.status(200).send(req.user);
  }

  const { _id } = req.user;
  const { imageUrl } = req.body;
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id },
      { photo: imageUrl },
      { new: true, useFindAndModify: true }
    );
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/profile/photo', async (req, res) => {
  const { _id } = req.user;

  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id },
      { photo: '' },
      { new: true, useFindAndModify: true }
    );
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/profile/follow', async (req, res) => {
  const { followingId, followedId, isFollowed } = req.body;

  if (isFollowed) {
    try {
      const followedUpdated = await UserModel.findOneAndUpdate(
        { _id: followedId },
        {
          $pull: {
            followers: followingId
          }
        },
        { new: true, useFindAndModify: false }
      );

      await UserModel.findOneAndUpdate(
        { _id: followingId },
        {
          $pull: {
            following: followedId
          }
        },
        { new: true, useFindAndModify: false }
      );

      res.status(200).send({
        followed: followedUpdated
      });
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    try {
      const followedUpdated = await UserModel.findOneAndUpdate(
        { _id: followedId },
        {
          $addToSet: {
            followers: followingId
          }
        },
        { new: true, useFindAndModify: false }
      );

      await UserModel.findOneAndUpdate(
        { _id: followingId },
        {
          $addToSet: {
            following: followedId
          }
        },
        { new: true, useFindAndModify: false }
      );

      res.status(200).send({
        followed: followedUpdated
      });
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

module.exports = router;
