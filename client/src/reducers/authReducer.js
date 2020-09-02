import jwt from 'jsonwebtoken';
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS
} from '../actions/types';

const token = localStorage.getItem('auth-token');
const { _id } = jwt.decode(token);

const initialState = {
  loginSuccess: false,
  registerSuccess: false,
  logoutSuccess: false,
  user: _id
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('auth-token', action.payload);
      return {
        ...state,
        loginSuccess: true,
        user: action.payload
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem('auth-token');
      return {
        loginSuccess: false,
        registerSuccess: false,
        logoutSuccess: true,
        user: null
      };
    default:
      return state;
  }
};
