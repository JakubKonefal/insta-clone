import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import StylesProvider from '@material-ui/styles/StylesProvider';
import classes from './Post.module.css';
import Navbar from '../shared/Navbar/Navbar';

const Post = () => {
  const [postContent, setPostContent] = useState({
    title: '',
    description: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewFile, setPreviewFile] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();
    console.log(postContent);
  };

  const handleInputChange = e => {
    const { id, value } = e.target;
    setPostContent({
      ...postContent,
      [id]: value
    });
  };

  const handleImageSelect = e => {
    const image = e.target.files[0];
    setSelectedImage(image);
    const imagePreview = URL.createObjectURL(image);
    setPreviewFile(imagePreview);
  };

  return (
    <StylesProvider injectFirst>
      <div className={classes.Post}>
        <Navbar />
        <form
          className={classes.Post__Form}
          onSubmit={handleFormSubmit}
          onChange={handleInputChange}
        >
          <TextField
            type="text"
            id="title"
            name="title"
            label="Title"
            variant="outlined"
          />
          <TextField
            id="description"
            name="description"
            multiline
            label="Description"
            variant="outlined"
          />
          <input type="file" id="img" onChange={handleImageSelect} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Add post
          </Button>
        </form>
      </div>
    </StylesProvider>
  );
};

export default Post;
