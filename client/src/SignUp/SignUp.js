import React, { useState } from 'react';
import axios from 'axios';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { TextField, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import classes from './SignUp.module.css';

const SignUp = () => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const history = useHistory();

  const handleInputChange = ({ target }) => {
    const { id, value } = target;
    setState({
      ...state,
      [id]: value
    });
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    const path = 'http://localhost:5000/signup';
    axios
      .post(path, state)
      .then(res => {
        console.log(res);
        history.push('/');
      })
      .catch(err => {
        setErrorMessages({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          [err.response.data.path]: err.response.data.message
        });
      });
  };

  return (
    <StylesProvider>
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
              error={!!errorMessages.firstName}
              helperText={errorMessages.firstName}
              variant="outlined"
              required
            />
            <TextField
              id="lastName"
              name="lastName"
              className={classes.SignUp__Input}
              placeholder="Last name"
              label="Last name"
              error={!!errorMessages.lastName}
              helperText={errorMessages.lastName}
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
              error={!!errorMessages.email}
              helperText={errorMessages.email}
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
              error={!!errorMessages.password}
              helperText={errorMessages.password}
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
