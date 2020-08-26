import React, { useState, useEffect } from 'react';
import { Button, TextField, Avatar } from '@material-ui/core';
import { ImageOutlined, CloseOutlined } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import StylesProvider from '@material-ui/styles/StylesProvider';
import Spinner from '../shared/Spinner/Spinner';
import { getProfileInfo } from '../actions/profileActions';
import { addPost } from '../actions/postActions';
import classes from './Post.module.css';
import Navbar from '../shared/Navbar/Navbar';
import defaultUserPic from '../assets/default-user-pic.png';

const Post = () => {
  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const token = localStorage.getItem('auth-token');
  const dispatch = useDispatch();

  const [postDescription, setPostDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewFile, setPreviewFile] = useState('');
  const profile = useSelector(state => state.profile);

  const fetchProfileInfo = () => {
    dispatch(getProfileInfo(token));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(addPost(postDescription, selectedImage, token));
  };

  const handleInputChange = e => {
    setPostDescription(e.target.value);
  };

  const handleImageSelect = e => {
    const image = e.target.files[0];
    if (image) {
      const imagePreview = URL.createObjectURL(image);
      setSelectedImage(image);
      setPreviewFile(imagePreview);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setPreviewFile('');
  };

  return (
    <StylesProvider injectFirst>
      <div className={classes.Post}>
        <Navbar />
        {profile.isLoading ? (
          <Spinner />
        ) : (
          <form className={classes.Post__Form} onSubmit={handleFormSubmit}>
            <div className={classes.Post__Header}>
              <Avatar
                className={classes.Post__HeaderAvatar}
                src={profile.user.photo || defaultUserPic}
                alt="profile-pic"
              />
              <h3 className={classes.Post__HeaderTitle}>Create a Post</h3>
            </div>
            <TextField
              className={classes.Post__Description}
              id="description"
              name="description"
              multiline
              placeholder="What's on your mind?"
              variant="outlined"
              maxlength="20"
              InputLabelProps={{
                style: {
                  fontSize: '1.6rem'
                }
              }}
              inputProps={{
                style: { height: '100%' },
                maxlength: '250'
              }}
              InputProps={{
                style: { height: '100%', fontSize: '1.6rem' }
              }}
              required
              onChange={handleInputChange}
            />
            <div
              className={
                previewFile ? classes.Post__PreviewFileWraper : classes.Hidden
              }
            >
              <img
                className={classes.Post__PreviewFile}
                src={previewFile}
                alt="preview-file"
              />
              <CloseOutlined
                className={classes.Post__PreviewFileClose}
                onClick={() => clearSelectedImage()}
              />
            </div>

            <label className={classes.Post__AddImage} htmlFor="img">
              <input
                type="file"
                id="img"
                key={selectedImage}
                onChange={handleImageSelect}
              />
              <ImageOutlined
                className={
                  previewFile ? classes.Hidden : classes.Post__AddImageIcon
                }
              />
            </label>

            <Button
              className={classes.Post__Button}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Add post
            </Button>
          </form>
        )}
      </div>
    </StylesProvider>
  );
};

export default Post;
