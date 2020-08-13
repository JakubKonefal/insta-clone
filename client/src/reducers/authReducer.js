import { LOGIN_SUCCESS, REGISTER_SUCCESS } from '../actions/types';

const initialState = {
  loginSuccess: false,
  registerSuccess: false
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
    default:
      return state;
  }
};
