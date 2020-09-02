import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../actions/postActions';
import Navbar from '../shared/Navbar/Navbar';
import Spinner from '../shared/Spinner/Spinner';
import PostsList from './PostsList';
import classes from './Home.module.css';

const Home = () => {
  useEffect(() => {
    fetchInitialPosts();
  }, []);

  const dispatch = useDispatch();
  const { allPosts, allPostsLoading } = useSelector(state => state.posts);

  const fetchInitialPosts = () => {
    const token = localStorage.getItem('auth-token');
    dispatch(getAllPosts(token));
  };

  return (
    <div className={classes.Home}>
      <Navbar />
      {allPostsLoading ? <Spinner /> : <PostsList posts={allPosts} />}
    </div>
  );
};

export default Home;
