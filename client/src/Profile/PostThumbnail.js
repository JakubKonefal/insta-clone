import React, { useState } from 'react';
import { DeleteOutline } from '@material-ui/icons';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost } from '../actions/postActions';
import classes from './PostThumbnail.module.css';
import defaultPostThumbnail from '../assets/default-post-thumbnail.png';

const PostThumbnail = ({ id, image, date, ownPost }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('auth-token');

  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handlePostDelete = () => {
    dispatch(deletePost(token, id));
  };

  return (
    <>
      {image ? (
        <div
          className={classes.Thumbnail}
          onClick={() => setShowDeleteButton(!showDeleteButton)}
        >
          <img className={classes.Thumbnail__Image} src={image} alt="post" />
          <div
            className={
              showDeleteButton ? classes.Thumbnail__Overlay : classes.Hidden
            }
          >
            <span className={classes.Thumbnail__Date}>
              {moment(date).format('lll')}
            </span>
            {ownPost ? (
              <DeleteOutline
                className={classes.Thumbnail__DeleteBtn}
                onClick={handlePostDelete}
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div
          className={classes.Thumbnail}
          onClick={() => setShowDeleteButton(!showDeleteButton)}
        >
          <img
            className={classes.Thumbnail__Image}
            src={defaultPostThumbnail}
            alt="post"
          />
          <div
            className={
              showDeleteButton ? classes.Thumbnail__Overlay : classes.Hidden
            }
          >
            <span className={classes.Thumbnail__Date}>
              {moment(date).format('lll')}
            </span>
            {ownPost ? (
              <DeleteOutline
                className={classes.Thumbnail__DeleteBtn}
                onClick={handlePostDelete}
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default PostThumbnail;
