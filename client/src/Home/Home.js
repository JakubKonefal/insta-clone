import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../actions/postActions';
import Navbar from '../shared/Navbar/Navbar';
import Posts from './Posts';
import classes from './Home.module.css';

const Home = () => {
  useEffect(() => {
    fetchInitialPosts();
  }, []);

  const token = localStorage.getItem('auth-token');
  const dispatch = useDispatch();

  const { allPosts } = useSelector(state => state.posts);

  const fetchInitialPosts = () => {
    dispatch(getAllPosts(token));
  };

  return (
    <div className={classes.Home}>
      <Navbar />
      <h1>HOME</h1>
      <Posts posts={allPosts} />
    </div>
  );
};

export default Home;
