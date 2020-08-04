const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authToken = req.header('auth-token');
  if (!authToken) return res.status(401).send('You are not logged in!');
  try {
    const verifiedToken = jwt.verify(authToken, process.env.SECRET_TOKEN);
    req.user = verifiedToken;
    next();
  } catch (err) {
    res.status(400).send(err);
  }
};
