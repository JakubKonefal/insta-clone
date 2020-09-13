const express = require('express');
const uniqid = require('uniqid');
const PostModel = require('../models/Post');
const UserModel = require('../models/User');

const router = express.Router();

router.post('/post', async (req, res) => {
  if (req.body.verifyToken) {
    return res.status(200).send(req.user);
  }
  const newPost = new PostModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.send(savedPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/posts', async (req, res) => {
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

router.get('/posts/followed', async (req, res) => {
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

router.post('/post/like', async (req, res) => {
  const { postId } = req.body;

  const { likes } = await PostModel.findById(postId);
  const alreadyLiked = likes.includes(req.user._id);

  if (alreadyLiked) {
    const updatedLikes = likes.filter(id => id !== req.user._id);
    await PostModel.findOneAndUpdate(
      { _id: postId },
      { likes: updatedLikes },
      {
        new: true,
        useFindAndModify: false
      }
    );
    res.status(200).send(req.user._id);
  } else {
    await PostModel.findOneAndUpdate(
      { _id: postId },
      { likes: [...likes, req.user._id] },
      {
        new: true,
        useFindAndModify: false
      }
    );
    res.status(200).send(req.user._id);
  }
});

router.post('/post/comment', async (req, res) => {
  const { firstName, lastName } = await UserModel.findById(
    req.body.comment.author
  );

  const comment = {
    ...req.body.comment,
    author: {
      id: req.body.comment.author,
      firstName,
      lastName
    },
    id: uniqid()
  };

  try {
    const updatedPost = await PostModel.findOneAndUpdate(
      {
        _id: comment.postId
      },
      {
        $addToSet: {
          comments: comment
        }
      },
      {
        new: true,
        useFindAndModify: false
      }
    );

    res.status(200).send(updatedPost);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/post/comment', async (req, res) => {
  const commentId = req.header('commentId');
  const postId = req.header('postId');

  try {
    const x = await PostModel.findOneAndUpdate(
      { _id: postId },
      {
        $pull: {
          comments: {
            id: commentId
          }
        }
      },
      { new: true, useFindAndModify: false }
    );

    res.status(200).send({ msg: 'Post deleted!' });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/post', async (req, res) => {
  const postId = req.header('postId');

  try {
    await PostModel.findOneAndDelete({ _id: postId });
    res.status(200).send(postId);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
