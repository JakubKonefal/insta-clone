import React, { useState, useEffect } from 'react';
import { Button, TextField, Avatar } from '@material-ui/core';
import { ImageOutlined } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import StylesProvider from '@material-ui/styles/StylesProvider';
import Spinner from '../shared/Spinner/Spinner';
import { getProfileInfo } from '../actions/profileActions';
import classes from './Post.module.css';
import Navbar from '../shared/Navbar/Navbar';
import defaultUserPic from '../assets/default-user-pic.png';

const Post = () => {
  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const dispatch = useDispatch();

  const [postDescription, setPostDescription] = useState({
    description: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewFile, setPreviewFile] = useState('');
  const profile = useSelector(state => state.profile);

  const fetchProfileInfo = () => {
    const token = localStorage.getItem('auth-token');
    dispatch(getProfileInfo(token));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
  };

  const handleInputChange = e => {
    const { id, value } = e.target;
    setPostDescription({
      ...postDescription,
      [id]: value
    });
  };

  const handleImageSelect = e => {
    const image = e.target.files[0];
    if (image) {
      const imagePreview = URL.createObjectURL(image);
      setSelectedImage(image);
      setPreviewFile(imagePreview);
    }
  };

  return (
    <StylesProvider injectFirst>
      <div className={classes.Post}>
        <Navbar />
        {profile.isLoading ? (
          <Spinner />
        ) : (
          <form
            className={classes.Post__Form}
            onSubmit={handleFormSubmit}
            onChange={handleInputChange}
          >
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
              label="Description"
              variant="outlined"
              InputLabelProps={{
                style: {
                  fontSize: '2rem'
                }
              }}
              inputProps={{
                style: { height: '100%' }
              }}
              InputProps={{
                style: { height: '100%', fontSize: '2rem' }
              }}
            />
            <label htmlFor="img">
              <input type="file" id="img" onChange={handleImageSelect} />
              <ImageOutlined />
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
