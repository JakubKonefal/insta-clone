import React, { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileInfo } from '../actions/profileActions';
import Navbar from '../shared/Navbar/Navbar';
import classes from './Profile.module.css';

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    const { _id } = jwt.decode(token);
    dispatch(getProfileInfo(token, _id));
  }, []);

  const token = localStorage.getItem('auth-token');
  const decodedToken = jwt.decode(token);
  const profile = useSelector(state => state.profile);
  console.log(token);
  console.log(decodedToken);
  console.log(profile);

  return (
    <div className={classes.Profile}>
      <Navbar />
      <div className={classes.Profile__Card}>
        <div className={classes.Profile__UserInfo}>
          <Avatar
            className={classes.Profile__UserAvatar}
            src="/"
            alt="profile pic"
          />
          <h3 className={classes.Username}>
            {`${profile.firstName} ${profile.lastName}`}
          </h3>
          <h4 className={classes.UserEmail}>{`${profile.email}`}</h4>
          <div className={classes.UserStats}>
            <span>posts</span> <span>followers</span> <span>following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
