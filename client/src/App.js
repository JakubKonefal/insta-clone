import React from 'react';
import { Route } from 'react-router-dom';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import classes from './App.module.css';

function App() {
  return (
    <>
      <div className={classes.App__LoginWraper}>
        <Route path="/signup" component={SignUp} />
        <Route path="/" exact component={SignIn} />
      </div>
    </>
  );
}

export default App;
