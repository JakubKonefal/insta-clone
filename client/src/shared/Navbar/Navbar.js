import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink, Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import classes from './Navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const clientId = useSelector(state => state.auth.user);

  const onLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <nav className={classes.Navbar}>
      <h3>
        <Link className={classes.Navbar__Title} to="/home">
          IG
        </Link>
      </h3>
      <NavLink className={classes.Navbar__Item} to={`/profile/${clientId}`}>
        Profile
      </NavLink>
      <NavLink className={classes.Navbar__Item} to="/post">
        Add post
      </NavLink>
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
