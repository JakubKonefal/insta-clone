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

module.exports = router;
