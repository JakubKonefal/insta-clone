import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS
} from '../actions/types';

const initialState = {
  loginSuccess: false,
  registerSuccess: false,
  logoutSuccess: false
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
        loginSuccess: true
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem('auth-token');
      return {
        loginSuccess: false,
        registerSuccess: false,
        logoutSuccess: true
      };
    default:
      return state;
  }
};
