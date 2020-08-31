import React from 'react';

import classes from './PostsList.module.css';
import SinglePost from './SinglePost';

const Posts = ({ posts }) => (
  <>
    {posts
      ? posts.map(({ description, author, image, _id }) => (
          <SinglePost
            key={_id}
            description={description}
            author={author}
            image={image}
          />
        ))
      : null}
  </>
);

export default Posts;
