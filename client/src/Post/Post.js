import React, { useState, useEffect } from 'react';
import { Button, TextField, Avatar, Modal } from '@material-ui/core';
import {
  ImageOutlined,
  CloseOutlined,
  CheckOutlined
} from '@material-ui/icons';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import StylesProvider from '@material-ui/styles/StylesProvider';
import Spinner from '../shared/Spinner/Spinner';
import { getUserPhoto } from '../actions/profileActions';
import { addPost } from '../actions/postActions';
import classes from './Post.module.css';
import Navbar from '../shared/Navbar/Navbar';
import defaultUserPic from '../assets/default-user-pic.png';

const Post = () => {
  const fetchProfileInfo = () => {
    dispatch(getUserPhoto(token));
  };

  useEffect(fetchProfileInfo, []);
  const token = localStorage.getItem('auth-token');
  const dispatch = useDispatch();

  const [postDescription, setPostDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewFile, setPreviewFile] = useState('');
  const { user } = useSelector(state => state.auth);
  const { isLoading, photo } = useSelector(state => state.profile);
  const { isSending, success } = useSelector(state => state.posts.createdPost);

  const handleFormSubmit = e => {
    e.preventDefault();
    const post = {
      description: postDescription,
      author: user
    };
    dispatch(addPost(post, selectedImage, token));
    clearSelectedImage();
    setPostDescription('');
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

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <StylesProvider injectFirst>
      <div className={classes.Post}>
        <Navbar />
        {isLoading ? (
          <Spinner />
        ) : (
          <form className={classes.Post__Form} onSubmit={handleFormSubmit}>
            <div className={classes.Post__Header}>
              <Avatar
                className={classes.Post__HeaderAvatar}
                src={photo || defaultUserPic}
                alt="profile-pic"
              />
              <h3 className={classes.Post__HeaderTitle}>Create a Post</h3>
              {success ? (
                <CheckOutlined className={classes.Post__SuccessIcon} />
              ) : null}
            </div>
            <TextField
              className={classes.Post__Description}
              id="description"
              value={postDescription}
              name="description"
              multiline
              placeholder="What's on your mind?"
              variant="outlined"
              InputLabelProps={{
                style: {
                  fontSize: '1.6rem'
                }
              }}
              inputProps={{
                style: { height: '100%' },
                maxLength: '250'
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
              disabled={isSending}
            >
              Add post
            </Button>
          </form>
        )}
        <Modal className={classes.Post__Modal} open={isSending}>
          <div className={classes.Post__ModalContent}>
            <Spinner />
          </div>
        </Modal>
      </div>
    </StylesProvider>
  );
};

export default Post;
