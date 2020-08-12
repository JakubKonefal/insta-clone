import axios from 'axios';
import { REGISTER_SUCCESS, CLEAR_ERRORS } from './types';
import { sendError } from './errorActions';

export const register = newUser => dispatch => {
  axios
    .post('http://localhost:5000/signup', newUser)
    .then(() => {
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: REGISTER_SUCCESS
      });
    })
    .catch(err => {
      dispatch(sendError(err.response));
    });
};
