import React from 'react';
import classes from './SingleComment.module.css';

const SingleComment = ({ author, content }) => {
  return (
    <div className={classes.Comment}>
      <span
        className={classes.Comment__AuthorName}
      >{`${author.firstName} ${author.lastName}`}</span>
      <p className={classes.Comment__Content}>{content}</p>
    </div>
  );
};

export default SingleComment;
