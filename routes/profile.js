const express = require('express');
const UserModel = require('../models/User');

const router = express.Router();

router.get('/profile', async (req, res) => {
  const id = req.header('id');
  try {
    const userInfo = await UserModel.findById(id);
    console.log(userInfo);
    console.log(userInfo.followers.includes(req.user._id));
    const isFollowed = userInfo.followers.includes(req.user._id);
    res.status(200).send({ user: userInfo, isFollowed });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/profile', async (req, res) => {
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

router.delete('/profile', async (req, res) => {
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

  console.log(followingId);

  try {
    const updatedProfile = isFollowed
      ? await UserModel.findOneAndUpdate(
          { _id: followedId },
          {
            $pull: {
              followers: followingId
            }
          },
          { new: true, useFindAndModify: false }
        )
      : await UserModel.findOneAndUpdate(
          { _id: followedId },
          {
            $addToSet: {
              followers: followingId
            }
          },
          {
            new: true,
            useFindAndModify: false
          }
        );

    console.log(updatedProfile);

    res.status(200).send(updatedProfile);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
