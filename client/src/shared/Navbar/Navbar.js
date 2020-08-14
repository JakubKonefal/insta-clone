import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import classes from './Navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <nav className={classes.Navbar}>
      <h3 className={classes.Navbar__Title}>IG</h3>
      <span className={classes.Navbar__Item}>Profile</span>
      <span className={classes.Navbar__Item}>Add post</span>
      <button
        className={classes.Navbar__Button}
        type="button"
        onClick={onLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
