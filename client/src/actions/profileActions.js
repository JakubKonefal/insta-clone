import axios from 'axios';
import FormData from 'form-data';
import { GET_PROFILE_INFO, GET_ERRORS } from './types';

export const getProfileInfo = token => dispatch => {
  axios
    .get('/profile', {
      headers: {
        token
      }
    })
    .then(res => dispatch({ type: GET_PROFILE_INFO, payload: res.data }))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const submitProfileImage = (token, image) => dispatch => {
  // const data = new FormData();
  // data.append('file', image);
  // data.append('upload_preset', 'insta-clone');
  // data.append('cloud_name', 'cloud0');
  axios({
    url: '/profile',
    method: 'post',
    data: image,
    headers: {
      token
    }
  });
};
