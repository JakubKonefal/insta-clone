import React from 'react';
import classes from './PostsList.module.css';
import SinglePost from './SinglePost';

const Posts = ({ posts }) => (
  <>
    {!posts || posts.length < 1 ? (
      <h3 className={classes.PostsList_Empty}>Posts board empty</h3>
    ) : (
      posts.map(
        ({ description, author, image, _id, likes, comments, date }) => (
          <SinglePost
            key={_id}
            description={description}
            author={author}
            image={image}
            likes={likes}
            comments={comments}
            date={date}
            id={_id}
          />
        )
      )
    )}
  </>
);

export default Posts;
