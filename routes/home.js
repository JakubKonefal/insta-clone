const express = require('express');

const router = express.Router();

router.get('/home', (req, res) => {
  console.log(req.body);
});

module.exports = router;
