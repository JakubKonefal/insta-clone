import React, { useState } from 'react';
import axios from 'axios';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import classes from './SignIn.module.css';

const SignIn = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = ({ target }) => {
    const { id, value } = target;
    setState({
      ...state,
      [id]: value
    });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    axios
      .post('/', state)
      .then(res => {
        console.log(res.data);
      })
      .catch(() => {
        setErrorMessage('Incorrect email and/or password!');
      });
  };

  return (
    <StylesProvider injectFirst>
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
              error={!!errorMessage}
              helperText={errorMessage}
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
              error={!!errorMessage}
              helperText={errorMessage}
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
    </StylesProvider>
  );
};

export default SignIn;
