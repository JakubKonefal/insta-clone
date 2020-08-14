import React from 'react';
import Navbar from '../shared/Navbar/Navbar';
import classes from './Home.module.css';

const Home = () => (
  <div className={classes.Home}>
    <Navbar />
    <h1>HOME</h1>
  </div>
);

export default Home;
