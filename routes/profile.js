const express = require('express');
const jwt = require('jsonwebtoken');
const FormData = require('form-data');
const axios = require('../config/axios');
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
  const token = req.header('token');
  // const image = req.header('image');
  const { _id } = jwt.decode(token);
  console.log(req.body);

  console.log('before fd');
  const data = new FormData();
  // data.append('file', req.body);
  data.append('upload_preset', 'insta-clone');
  data.append('cloud_name', 'cloud0');
  console.log('after fd');

  // const { image } = req.body;
  // const data = new FormData();
  // data.append('file', image);
  // data.append('upload_preset', 'insta-clone');
  // data.append('cloud_name', 'cloud0');
  // console.log(image);
  // axios
  //   .post('/image/upload', data)
  //   .then(response => {
  //     console.log(response.data);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
});

module.exports = router;
