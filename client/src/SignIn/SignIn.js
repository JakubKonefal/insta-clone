import React, { useState } from 'react';
import axios from 'axios';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { TextField, Card, CardContent, Button } from '@material-ui/core';
import classes from './SignIn.module.css';

const SignIn = () => {
  const [state, setState] = useState({
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
    const path = 'http://localhost:5000/signin';
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
          className={classes.SignIn__Inputs}
          onSubmit={handleFormSubmit}
          onChange={handleInputChange}
        >
          <TextField
            id="email"
            name="email"
            className={classes.SignIn__Input}
            placeholder="Email"
          />
          <TextField
            id="password"
            name="password"
            className={classes.SignIn__Input}
            placeholder="Password"
          />
          {/* <div className={classes.SignIn__Buttons}> */}
          <Button type="submit" variant="contained" size="large">
            Sign in
          </Button>
          {/* </div> */}
        </form>
      </Card>
    </StylesProvider>
  );
};

export default SignIn;
