import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('auth-token'),
  isAuthenticated: null,
  registerSuccess: false,
  isLoading: false,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('auth-token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('auth-token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
};
