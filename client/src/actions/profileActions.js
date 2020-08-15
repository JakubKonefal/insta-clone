import axios from 'axios';
import { GET_PROFILE_INFO } from './types';

export const getProfileInfo = (token, id) => dispatch => {
  console.log(token);
  console.log(id);
  axios
    .get('/profile', {
      headers: {
        token
      }
    })
    .then(res => dispatch({ type: GET_PROFILE_INFO, payload: res.data }))
    .catch(err => {
      console.log(err);
    });
};
