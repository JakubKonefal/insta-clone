const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/User');

const router = express.Router();

router.get('/profile', async (req, res) => {
  const token = req.header('token');
  const { _id } = jwt.decode(token);
  try {
    const userInfo = await userModel.findById(_id);
    res.status(200).send(userInfo);
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
    const updatedUser = await userModel.findOneAndUpdate(
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
    const updatedUser = await userModel.findOneAndUpdate(
      { _id },
      { photo: '' },
      { new: true, useFindAndModify: true }
    );
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
