const express = require('express');
const post = require('../models/Post');

const router = express.Router();

router.get('/home', async (req, res) => {
  post
    .find()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

module.exports = router;
