import axios from 'axios';
import { storage } from '../config/firebase';
import {
  GET_PROFILE_INFO,
  GET_USER_PHOTO,
  UPDATE_PROFILE_IMG,
  GET_ERRORS,
  PROFILE_IMG_LOADING,
  DELETE_PROFILE_IMG,
  TOGGLE_USER_FOLLOW,
  PROFILE_LOADING
} from './types';

export const getProfileInfo = (token, id) => dispatch => {
  dispatch({ type: PROFILE_LOADING });
  axios
    .get('/profile', {
      headers: {
        token,
        id
      }
    })
    .then(res => {
      dispatch({ type: GET_PROFILE_INFO, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getUserPhoto = token => dispatch => {
  axios
    .get('/profile/photo', { headers: { token } })
    .then(res => {
      dispatch({ type: GET_USER_PHOTO, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response });
    });
};

export const updateProfileImg = (token, image) => async dispatch => {
  dispatch({
    type: PROFILE_IMG_LOADING
  });
  const {
    data: { _id }
  } = await axios.post(
    '/profile/photo',
    { verifyToken: true },
    {
      headers: {
        token
      }
    }
  );
  const { ref } = await storage.ref('/profile-pics').child(_id).put(image);
  const imageUrl = await ref.getDownloadURL();
  const { data } = await axios.post(
    '/profile/photo',
    {
      imageUrl
    },
    {
      headers: {
        token
      }
    }
  );
  dispatch({
    type: UPDATE_PROFILE_IMG,
    payload: data
  });
};

export const deleteProfileImg = token => async dispatch => {
  dispatch({
    type: PROFILE_IMG_LOADING
  });
  const { data } = await axios.delete('/profile/photo', {
    headers: {
      token
    }
  });

  storage
    .ref('/profile-pics')
    .child(data._id)
    .delete()
    .then(() => {
      dispatch({
        type: DELETE_PROFILE_IMG,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const toggleUserFollow = (token, data) => dispatch => {
  axios
    .post('/profile/follow', data, {
      headers: {
        token
      }
    })
    .then(res => {
      dispatch({ type: TOGGLE_USER_FOLLOW, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response });
    });
};
