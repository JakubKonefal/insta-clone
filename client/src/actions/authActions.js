import axios from 'axios';
import { REGISTER_SUCCESS, CLEAR_ERRORS, LOGIN_SUCCESS } from './types';
import { getError } from './errorActions';

export const register = newUser => dispatch => {
  axios
    .post('/signup', newUser)
    .then(() => {
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: REGISTER_SUCCESS
      });
    })
    .catch(err => {
      dispatch(getError(err.response));
    });
};

export const login = credentials => dispatch => {
  axios
    .post('/', credentials)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getError(err.response));
    });
};
