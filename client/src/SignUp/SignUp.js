import React, { useState } from 'react';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { TextField, Button } from '@material-ui/core';
import { CheckOutlined } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/authActions';
import classes from './SignUp.module.css';

const SignUp = () => {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const history = useHistory();

  const registerSuccess = useSelector(state => state.auth.registerSuccess);
  const error = useSelector(state => state.errors.error);
  const dispatch = useDispatch();

  const handleInputChange = ({ target }) => {
    const { id, value } = target;
    setNewUser({
      ...newUser,
      [id]: value
    });
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(register(newUser));
  };

  const redirectToLogin = () => {
    setTimeout(() => {
      history.push('/');
    }, 1000);
  };

  if (registerSuccess) {
    redirectToLogin();
  }

  return (
    <StylesProvider injectFirst>
      <div className={classes.SignUp}>
        <div className={classes.SignUp__Card}>
          <h1 className={classes.SignUp__InstaLabel}>Instagram</h1>
          <form
            className={classes.SignUp__Form}
            onSubmit={handleFormSubmit}
            onChange={handleInputChange}
          >
            <TextField
              id="firstName"
              name="firstName"
              className={classes.SignUp__Input}
              placeholder="First name"
              label="First name"
              error={error.path[0] === 'firstName'}
              helperText={error.path[0] === 'firstName' && error.message}
              variant="outlined"
              required
            />
            <TextField
              id="lastName"
              name="lastName"
              className={classes.SignUp__Input}
              placeholder="Last name"
              label="Last name"
              error={error.path[0] === 'lastName'}
              helperText={error.path[0] === 'lastName' && error.message}
              variant="outlined"
              required
            />
            <TextField
              id="email"
              name="email"
              type="email"
              className={classes.SignUp__Input}
              placeholder="Email"
              label="Email"
              error={error.path[0] === 'email'}
              helperText={error.path[0] === 'email' && error.message}
              variant="outlined"
              required
            />
            <TextField
              id="password"
              name="password"
              type="password"
              className={classes.SignUp__Input}
              placeholder="Password"
              label="Password"
              error={error.path[0] === 'password'}
              helperText={error.path[0] === 'password' && error.message}
              variant="outlined"
              required
            />
            <Button
              className={classes.SignUp__Button}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Sign up
            </Button>
          </form>
          {registerSuccess && (
            <CheckOutlined className={classes.SignUp__SuccessIcon} />
          )}
        </div>
        <div className={classes.SignUp__Card_2}>
          <span className={classes.SignUp__Card_2__Content}>
            Already have an account?
            <Link to="/" className={classes.SignUp__Card_2__Link}>
              Log In
            </Link>
          </span>
        </div>
      </div>
    </StylesProvider>
  );
};

export default SignUp;
