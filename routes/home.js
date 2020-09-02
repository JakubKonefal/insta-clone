const express = require('express');
const PostModel = require('../models/Post');
const UserModel = require('../models/User');

const router = express.Router();

router.get('/home', async (req, res) => {
  const allPosts = await PostModel.find();

  const authors = allPosts.map(post => post.author);
  const authorsIds = authors.filter(
    (id, index) => authors.indexOf(id) === index
  );

  const authorsInfo = await UserModel.find({ _id: authorsIds });

  const authorsNecessaryInfo = authorsInfo.map(author => ({
    _id: author._id,
    photo: author.photo,
    firstName: author.firstName,
    lastName: author.lastName
  }));
  const allPostsWithAuthorsInfo = allPosts.map(post => {
    const author = authorsNecessaryInfo.find(
      auth => auth._id.toString() === post.author.toString()
    );
    return {
      ...post._doc,
      author
    };
  });

  res.status(200).send(allPostsWithAuthorsInfo);
});

module.exports = router;
