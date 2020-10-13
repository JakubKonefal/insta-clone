import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { getAllPosts, getFollowedUsersPosts } from '../actions/postActions';
import Navbar from '../shared/Navbar/Navbar';
import Spinner from '../shared/Spinner/Spinner';
import PostsList from './PostsList';
import classes from './Home.module.css';

const Home = () => {
  const fetchInitialPosts = () => {
    dispatch(getAllPosts(token));
  };
  useEffect(fetchInitialPosts, []);

  const token = localStorage.getItem('auth-token');
  const dispatch = useDispatch();
  const { allPosts } = useSelector(state => state.posts);
  const { user } = useSelector(state => state.auth);
  const [sortingType, setSortingType] = useState('all');

  const handlePostsSort = ({ target: { value } }) => {
    setSortingType(value);
    value === 'all'
      ? dispatch(getAllPosts(token))
      : dispatch(getFollowedUsersPosts(token));
  };

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.Home}>
      <Navbar />
      <div className={classes.Home__SelectWraper}>
        <StylesProvider injectFirst>
          <Select
            className={classes.Home__Select}
            value={sortingType}
            onChange={handlePostsSort}
            variant="outlined"
          >
            <option className={classes.Home__SelectOption} value="all">
              All posts
            </option>
            <option className={classes.Home__SelectOption} value="followed">
              Followed users posts
            </option>
          </Select>
        </StylesProvider>
      </div>
      {!allPosts ? <Spinner /> : <PostsList posts={allPosts} />}
    </div>
  );
};

export default Home;
