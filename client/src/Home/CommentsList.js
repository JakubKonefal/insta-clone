import React from 'react';
import SingleComment from './SingleComment';

const CommentsList = ({ comments }) => (
  <>
    {comments.map(comment => (
      <SingleComment
        key={comment.id}
        id={comment.id}
        author={comment.author}
        content={comment.content}
      />
    ))}
  </>
);

export default CommentsList;
