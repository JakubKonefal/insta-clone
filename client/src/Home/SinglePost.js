import React, { useState } from 'react';
import { Card, CardContent, Avatar, Collapse, Button } from '@material-ui/core';
import { Favorite, ArrowDownward } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { likePost } from '../actions/postActions';
import classes from './SinglePost.module.css';
import defaultUserPic from '../assets/default-user-pic.png';

const SinglePost = ({ description, author, likes, image, id }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');
  const [showInput, setShowInput] = useState(false);
  const token = localStorage.getItem('auth-token');
  const clientId = useSelector(state => state.auth.user);

  const alreadyLiked = likes.includes(clientId);

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
            className={
              showInput
                ? classes.Post__CommentsButton_Close
                : classes.Post__CommentsButton
            }
            onClick={() => setShowInput(!showInput)}
          >
            {showInput ? <ArrowDownward /> : 'View all comments...'}
          </Button>
          <Collapse in={showInput}>
            <div>COMMENTS</div>
            <div>COMMENTS</div>
            <div>COMMENTS</div>
            <div>COMMENTS</div>
            <div>COMMENTS</div>
          </Collapse>
        </CardContent>
      </Card>
    </StylesProvider>
  );
};
export default SinglePost;
