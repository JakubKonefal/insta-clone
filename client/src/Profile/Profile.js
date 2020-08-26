import React, { useEffect, useState } from 'react';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { Avatar, Button } from '@material-ui/core';
import { Close, CloudUploadOutlined, DeleteOutline } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProfileInfo,
  updateProfileImg,
  deleteProfileImg
} from '../actions/profileActions';
import Navbar from '../shared/Navbar/Navbar';
import Spinner from '../shared/Spinner/Spinner';
import classes from './Profile.module.css';
import defaultUserPic from '../assets/default-user-pic.png';

const Profile = () => {
  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const token = localStorage.getItem('auth-token');
  const dispatch = useDispatch();

  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewFile, setPreviewFile] = useState('');
  const profile = useSelector(state => state.profile);

  const fetchProfileInfo = () => {
    dispatch(getProfileInfo(token));
  };

  const handleImageSelect = e => {
    const image = e.target.files[0];
    if (image) {
      const imagePreview = URL.createObjectURL(image);
      setSelectedImage(image);
      setPreviewFile(imagePreview);
      setAvatarMenuOpen(false);
    }
  };

  const handleImageSubmit = () => {
    dispatch(updateProfileImg(token, selectedImage));
    clearSelectedImage();
  };

  const handleImageDelete = () => {
    dispatch(deleteProfileImg(token));
    clearSelectedImage();
    setAvatarMenuOpen(false);
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
    setPreviewFile('');
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
                {profile.isImgLoading ? (
                  <Spinner />
                ) : (
                  <>
                    <Avatar
                      className={classes.Profile__UserAvatar}
                      src={profile.user.photo || defaultUserPic}
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
                        <CloudUploadOutlined
                          className={classes.Profile__AvatarMenuIcon}
                        />
                        Add / update profile picture
                        <input
                          type="file"
                          id="avatar"
                          key={selectedImage}
                          name="avatar"
                          onChange={handleImageSelect}
                        />
                      </label>
                      <button
                        type="button"
                        className={`${classes.Profile__AvatarAction} ${classes.Profile__AvatarActions_Delete}`}
                        onClick={() => handleImageDelete()}
                      >
                        <DeleteOutline
                          className={classes.Profile__AvatarMenuIcon}
                        />
                        Delete profile picture
                      </button>
                    </div>
                  </>
                )}
              </div>

              <h3 className={classes.Profile__Name}>
                {`${profile.user.firstName}  ${profile.user.lastName}`}
              </h3>
              <h4 className={classes.Profile__UserEmail}>
                {`${profile.user.email}`}
              </h4>
              <div className={classes.Profile__UserStats}>
                <span className={classes.Profile__StatItem}>
                  {`${profile.user.posts.length} posts`}
                </span>
                <span className={classes.Profile__StatItem}>
                  {`${profile.user.followers.length} followers`}
                </span>
                <span className={classes.Profile__StatItem}>
                  {`${profile.user.following.length} following`}
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
