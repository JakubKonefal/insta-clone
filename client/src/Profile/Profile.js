import React, { useEffect, useState } from 'react';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { Avatar, Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileInfo, submitProfileImage } from '../actions/profileActions';
import Navbar from '../shared/Navbar/Navbar';
import Spinner from '../shared/Spinner/Spinner';
import classes from './Profile.module.css';
import defaultUserPic from '../assets/default-user-pic.png';

const Profile = () => {
  const dispatch = useDispatch();
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewFile, setPreviewFile] = useState('');

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const profile = useSelector(state => state.profile);

  const fetchProfileInfo = () => {
    const token = localStorage.getItem('auth-token');
    dispatch(getProfileInfo(token));
  };

  const handleImageSelect = e => {
    const image = e.target.files[0];
    const imagePreview = URL.createObjectURL(image);
    setSelectedImage(image);
    setPreviewFile(imagePreview);
    setAvatarMenuOpen(false);
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setPreviewFile('');
  };

  const handleImageSubmit = () => {
    const token = localStorage.getItem('auth-token');
    dispatch(submitProfileImage(token, selectedImage));
  };

  return (
    <StylesProvider injectFirst>
      <section className={classes.Profile}>
        <Navbar />
        {profile.isLoading ? (
          <Spinner />
        ) : (
          <div className={classes.Profile__Card}>
            <div className={classes.Profile__UserInfo}>
              <div className={classes.Profile__Avatar}>
                <Avatar
                  className={classes.Profile__UserAvatar}
                  src={profile.photo || defaultUserPic}
                  alt="profile pic"
                  onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                />
                <Avatar
                  className={
                    previewFile
                      ? classes.Profile__AvatarPreview
                      : classes.Hidden
                  }
                  src={previewFile}
                  alt="preview"
                />
                <Close
                  className={
                    previewFile
                      ? classes.Profile__AvatarPreviewClose
                      : classes.Hidden
                  }
                  onClick={() => clearSelectedImage()}
                />
                <Button
                  className={
                    previewFile
                      ? classes.Profile__AvatarAcceptBtn
                      : classes.Hidden
                  }
                  onClick={() => handleImageSubmit()}
                  variant="contained"
                  color="primary"
                >
                  add/update
                </Button>
                <div
                  className={
                    avatarMenuOpen
                      ? classes.Profile__AvatarMenu
                      : classes.Hidden
                  }
                >
                  <label
                    className={`${classes.Profile__AvatarAction} ${classes.Profile__AvatarActions_Add}`}
                    htmlFor="avatar"
                  >
                    add/update
                    <input
                      type="file"
                      id="avatar"
                      onChange={handleImageSelect}
                    />
                  </label>
                  <span
                    className={`${classes.Profile__AvatarAction} ${classes.Profile__AvatarActions_Delete}`}
                    variant="contained"
                    color="secondary"
                  >
                    delete
                  </span>
                </div>
              </div>

              <h3 className={classes.Profile__Name}>
                {`${profile.firstName}  ${profile.lastName}`}
              </h3>
              <h4 className={classes.Profile__UserEmail}>
                {`${profile.email}`}
              </h4>
              <div className={classes.Profile__UserStats}>
                <span className={classes.Profile__StatItem}>
                  {`${profile.posts.length} posts`}
                </span>
                <span className={classes.Profile__StatItem}>
                  {`${profile.followers.length} followers`}
                </span>
                <span className={classes.Profile__StatItem}>
                  {`${profile.following.length} following`}
                </span>
              </div>
            </div>
          </div>
        )}
      </section>
    </StylesProvider>
  );
};

export default Profile;
