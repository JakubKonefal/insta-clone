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

  const authorsInfoArr = authorsInfo.map(author => ({
    _id: author._id,
    photo: author.photo,
    firstName: author.firstName,
    lastName: author.lastName
  }));
  const allPostsWithAuthorsInfo = allPosts.map(post => {
    const author = authorsInfoArr.find(
      auth => auth._id.toString() === post.author.toString()
    );
    return {
      ...post._doc,
      author
    };
  });

  res.status(200).send(allPostsWithAuthorsInfo);
});

router.get('/home/followed', async (req, res) => {
  try {
    const { _id } = req.user;
    const { following } = await UserModel.findById(_id);

    const followedUsersPosts = await PostModel.find({ author: following });
    const authorsInfo = await UserModel.find({ _id: following });

    const authorsInfoArr = authorsInfo.map(author => ({
      _id: author._id,
      photo: author.photo,
      firstName: author.firstName,
      lastName: author.lastName
    }));

    const allPostsWithAuthorsInfo = followedUsersPosts.map(post => {
      const author = authorsInfoArr.find(
        auth => auth._id.toString() === post.author.toString()
      );
      return {
        ...post._doc,
        author
      };
    });

    res.status(200).send(allPostsWithAuthorsInfo);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
