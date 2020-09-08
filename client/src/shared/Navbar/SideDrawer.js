import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, NavLink, Link } from 'react-router-dom';
import { CloseOutlined } from '@material-ui/icons';
import { logout } from '../../actions/authActions';
import classes from './SideDrawer.module.css';

const SideDrawer = ({ open, toggleMenu, clientId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <div className={open ? classes.SideDrawer : classes.SideDrawer__Hidden}>
      <h3>
        <Link className={classes.SideDrawer__Title} to="/home">
          Home
        </Link>
      </h3>
      <NavLink className={classes.SideDrawer__Item} to={`/profile/${clientId}`}>
        Profile
      </NavLink>
      <NavLink className={classes.SideDrawer__Item} to="/post">
        Add post
      </NavLink>
      <button
        className={classes.SideDrawer__Button}
        type="button"
        onClick={onLogout}
      >
        Logout
      </button>
      <CloseOutlined
        className={classes.SideDrawer__CloseIcon}
        onClick={() => toggleMenu()}
      />
    </div>
  );
};

export default SideDrawer;
