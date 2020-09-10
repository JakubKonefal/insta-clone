import React from 'react';
import SingleComment from './SingleComment';

const CommentsList = ({ comments, postId }) => (
  <>
    {comments.map(comment => (
      <SingleComment
        key={comment.id}
        id={comment.id}
        postId={postId}
        author={comment.author}
        content={comment.content}
      />
    ))}
  </>
);

export default CommentsList;
