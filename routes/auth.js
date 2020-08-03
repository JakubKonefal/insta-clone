const express = require('express');
const { validateSignUp, validateSignIn } = require('../validation/validation');

const router = express.Router();
router.post('/signup', (req, res) => {
  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error.details[0].message);
});

router.post('/signin', (req, res) => {
  const { error } = validateSignIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);
});

module.exports = router;
