import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import classes from './App.module.css';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className={classes.App__LoginWraper}>
        <Route path="/signup" component={SignUp} />
        <Route path="/" exact component={SignIn} />
      </div>
    </Provider>
  );
}

export default App;
