import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from '@material-ui/core';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { getAllPosts, getFollowedUsersPosts } from '../actions/postActions';
import Navbar from '../shared/Navbar/Navbar';
import Spinner from '../shared/Spinner/Spinner';
import PostsList from './PostsList';
import classes from './Home.module.css';

const Home = () => {
  useEffect(() => {
    fetchInitialPosts();
  }, []);

  const token = localStorage.getItem('auth-token');
  const dispatch = useDispatch();
  const { allPosts } = useSelector(state => state.posts);
  const [sortingType, setSortingType] = useState('all');

  const fetchInitialPosts = () => {
    dispatch(getAllPosts(token));
  };

  const handlePostsSort = ({ target: { value } }) => {
    setSortingType(value);
    value === 'all'
      ? dispatch(getAllPosts(token))
      : dispatch(getFollowedUsersPosts(token));
  };
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
