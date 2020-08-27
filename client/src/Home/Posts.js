import React from 'react';

const Posts = ({ posts }) => (
  <div>
    {posts
      ? posts.map(({ description, author, image }) => (
          <div>
            <h3>{author}</h3>
            <p>{description}</p>
            <img src={image} alt="post" />
          </div>
        ))
      : null}
  </div>
);

export default Posts;
