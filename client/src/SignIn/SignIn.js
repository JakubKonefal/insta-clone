import React, { useState } from 'react';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { TextField, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { login } from '../actions/authActions';
import classes from './SignIn.module.css';

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const token = localStorage.getItem('auth-token');
  const error = useSelector(state => state.errors.error);
  const loginSuccess = useSelector(state => state.auth.loginSuccess);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleInputChange = ({ target }) => {
    const { id, value } = target;
    setCredentials({
      ...credentials,
      [id]: value
    });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  if (token) {
    return <Redirect to="/home" />;
  }

  return (
    <StylesProvider injectFirst>
      <div className={classes.SignIn__Wraper}>
        <div className={classes.SignIn}>
          <div className={classes.SignIn__Card}>
            <h1 className={classes.SignIn__InstaLabel}>Instagram</h1>
            <form
              className={classes.SignIn__Form}
              onSubmit={handleFormSubmit}
              onChange={handleInputChange}
            >
              <TextField
                id="email"
                name="email"
                className={classes.SignIn__Input}
                placeholder="Email"
                label="Email"
                variant="outlined"
                error={error.path[0] === 'auth'}
                helperText={error.message}
                required
              />
              <TextField
                id="password"
                type="password"
                name="password"
                className={classes.SignIn__Input}
                placeholder="Password"
                label="Password"
                variant="outlined"
                error={error.path[0] === 'auth'}
                helperText={error.message}
                required
              />
              <Button
                className={classes.SignIn__Button}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Sign in
              </Button>
            </form>
          </div>
          <div className={classes.SignIn__Card_2}>
            <span className={classes.SignIn__Card_2__Content}>
              Don't have an account?
              <Link to="/signup" className={classes.SignIn__Card_2__Link}>
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </StylesProvider>
  );
};

export default SignIn;
