import React from 'react';
import { Collapse } from '@material-ui/core';
import classes from './SingleComment.module.css';

const SingleComment = ({ id, author, content }) => {
  console.log(author);
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
