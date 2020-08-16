import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileInfo } from '../actions/profileActions';
import Navbar from '../shared/Navbar/Navbar';
import Spinner from '../shared/Spinner/Spinner';
import classes from './Profile.module.css';

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const { _id } = jwt.decode(token);
    dispatch(getProfileInfo(token, _id));
  }, []);

  const profile = useSelector(state => state.profile);
  const isLoading = useSelector(state => state.profile.isLoading);

  return (
    <StylesProvider injectFirst>
      <div className={classes.Profile}>
        <Navbar />
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={classes.Profile__Card}>
            <div className={classes.Profile__UserInfo}>
              <Avatar
                className={classes.Profile__UserAvatar}
                src="/"
                alt="profile pic"
              />
              <h3 className={classes.Profile__Name}>
                {`${profile.firstName}  ${profile.lastName}`}
              </h3>
              <h4 className={classes.Profile__UserEmail}>
                {`${profile.email}`}
              </h4>
              <div className={classes.Profile__UserStats}>
                <span className={classes.Profile__StatItem}>posts</span>
                <span className={classes.Profile__StatItem}>followers</span>
                <span className={classes.Profile__StatItem}>following</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </StylesProvider>
  );
};

export default Profile;
