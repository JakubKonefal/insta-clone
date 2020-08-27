import uniqid from 'uniqid';
import {
  ADD_POST,
  ADD_POST_SUCCESS,
  GET_ERRORS,
  CLEAR_ERRORS,
  ALL_POSTS_LOADING,
  GET_ALL_POSTS
} from './types';
import { axiosLocal } from '../config/axios';
import { storage } from '../config/firebase';

export const addPost = (description, image, token) => async dispatch => {
  dispatch({ type: ADD_POST });

  const {
    data: { _id }
  } = await axiosLocal.post(
    '/post',
    { verifyToken: true },
    {
      headers: {
        token
      }
    }
  );

  let imageUrl = '';
  const postId = uniqid();

  if (image) {
    const { ref } = await storage.ref(`/posts/${_id}`).child(postId).put(image);
    imageUrl = await ref.getDownloadURL();
  }

  axiosLocal
    .post(
      '/post',
      {
        description,
        image: imageUrl,
        _id: postId
      },
      {
        headers: {
          token
        }
      }
    )
    .then(() => {
      dispatch({ type: ADD_POST_SUCCESS });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response });
    });
};

export const getAllPosts = token => async dispatch => {
  dispatch({ type: ALL_POSTS_LOADING });
  axiosLocal
    .get('/home', {
      headers: {
        token
      }
    })
    .then(res => {
      dispatch({ type: GET_ALL_POSTS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response });
    });
};
