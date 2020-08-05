import React, { useState } from 'react';
import axios from 'axios';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { TextField, Card, CardContent, Button } from '@material-ui/core';
import classes from './SignUp.module.css';

const SignUp = () => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

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
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <StylesProvider>
      <Card>
        <form
          className={classes.SignUp__Inputs}
          onSubmit={handleFormSubmit}
          onChange={handleInputChange}
        >
          <TextField
            id="firstName"
            name="firstName"
            className={classes.SignUp__Input}
            placeholder="First name"
          />
          <TextField
            id="lastName"
            name="lastName"
            className={classes.SignUp__Input}
            placeholder="Last name"
          />
          <TextField
            id="email"
            name="email"
            className={classes.SignUp__Input}
            placeholder="Email"
          />
          <TextField
            id="password"
            name="password"
            className={classes.SignUp__Input}
            placeholder="Password"
          />
          {/* <div className={classes.SignUp__Buttons}> */}
          <Button type="submit" variant="contained" size="large">
            Sign up
          </Button>
          {/* </div> */}
        </form>
      </Card>
    </StylesProvider>
  );
};

export default SignUp;
