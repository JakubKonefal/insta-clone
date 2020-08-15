import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ProtectedRoute from './shared/ProtectedRoute/ProtectedRoute';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Post from './Post/Post';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Route path="/signup" component={SignUp} />
      <Route path="/" exact component={SignIn} />
      <ProtectedRoute path="/home" component={Home} />
      <ProtectedRoute path="/profile" component={Profile} />
      <ProtectedRoute path="/post" component={Post} />
    </Provider>
  );
}

export default App;
