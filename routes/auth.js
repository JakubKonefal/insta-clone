const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const { validateSignUp, validateSignIn } = require('../validation/validation');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const { error } = validateSignIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await UserModel.findOne({ email });
  if (!user) return res.status(400).send('Incorrect email or password!');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send('Incorrect email or password!');
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
  res.header('auth-token', token).send(token);
});

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  console.log(req.body);

  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error.details[0]);

  const emailExist = await UserModel.findOne({ email });
  if (emailExist) {
    return res.status(400).send({
      path: 'email',
      message: 'Email already exists!'
    });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new UserModel({
    firstName,
    lastName,
    email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser._id);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
