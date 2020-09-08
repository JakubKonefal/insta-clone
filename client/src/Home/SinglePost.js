import React, { useState } from 'react';
import { Card, CardContent, Avatar, Collapse, Button } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import StylesProvider from '@material-ui/styles/StylesProvider';
import moment from 'moment';
import { likePost, addComment } from '../actions/postActions';
import classes from './SinglePost.module.css';
import defaultUserPic from '../assets/default-user-pic.png';
import CommentsList from './CommentsList';

const SinglePost = ({
  description,
  author,
  likes,
  comments,
  image,
  date,
  id
}) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState({
    author: '',
    content: '',
    postId: ''
  });
  const [showInput, setShowInput] = useState(false);
  const token = localStorage.getItem('auth-token');
  const clientId = useSelector(state => state.auth.user);

  const alreadyLiked = likes.includes(clientId);

  const handleInputChange = e => {
    setComment({
      author: clientId,
      content: e.target.innerText,
      postId: id
    });
  };

  const handleCommentSubmit = e => {
    e.preventDefault();
    dispatch(addComment(token, comment));
  };

  return (
    <StylesProvider injectFirst>
      <Card className={classes.Post}>
        <CardContent className={classes.Post__Content}>
          <div className={classes.Post__Header}>
            <Avatar
              className={classes.Post__Avatar}
              src={author.photo || defaultUserPic}
              alt="profile"
            />
            <Link
              className={`${classes.Post__Author_Link} ${classes.Post__Author_Header}`}
              to={`/profile/${author._id}`}
            >
              {`${author.firstName} ${author.lastName}`}
            </Link>
          </div>
          {image ? (
            <img className={classes.Post__Image} src={image} alt="post" />
          ) : null}
          <div className={classes.Post__Likes}>
            <Favorite
              className={
                alreadyLiked
                  ? classes.Post__HeartBtn_Liked
                  : classes.Post__HeartBtn_Unliked
              }
              onClick={() => dispatch(likePost(token, id))}
            />
            <span>{likes.length}</span>
            <span className={classes.Post__Date}>
              {moment(date).startOf('minute').fromNow()}
            </span>
          </div>
          <div className={classes.Post__Description}>
            <Link
              className={`${classes.Post__Author_Link} ${classes.Post__Author_Description}`}
              to={`/profile/${author._id}`}
            >
              {`${author.firstName} ${author.lastName}`}
            </Link>
            <p>{description}</p>
          </div>
          <Button
            className={classes.Post__CommentsButton}
            onClick={() => setShowInput(!showInput)}
          >
            {showInput ? 'Hide comments' : 'View all comments...'}
          </Button>

          <Collapse className={classes.Post__Comments} in={showInput}>
            <form
              className={classes.Post__CommentForm}
              onSubmit={handleCommentSubmit}
            >
              <span
                className={classes.Post__CommentInput}
                contentEditable
                onInput={handleInputChange}
                data-placeholder={comment.content ? '' : 'Write a comment...'}
              />
              <Button
                className={classes.Post__Button}
                type="submit"
                variant="contained"
                color="primary"
                disabled={!comment.content}
              >
                Post
              </Button>
            </form>
            <CommentsList comments={comments} />
          </Collapse>
        </CardContent>
      </Card>
    </StylesProvider>
  );
};
export default SinglePost;
