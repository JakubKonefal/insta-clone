import React from 'react';
import moment from 'moment';
import classes from './PostThumbnail.module.css';

const PostThumbnail = ({ image, date }) => (
  <div className={classes.Thumbnail} data-content={moment(date).format('lll')}>
    <img className={classes.Thumbnail__Image} src={image} alt="post" />
  </div>
);
export default PostThumbnail;
